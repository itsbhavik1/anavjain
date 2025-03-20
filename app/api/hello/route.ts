import { Aptos, AptosConfig, Ed25519PrivateKey, Network, PrivateKey, PrivateKeyVariants } from "@aptos-labs/ts-sdk"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { AIMessage, BaseMessage, ChatMessage, HumanMessage } from "@langchain/core/messages"
import { MemorySaver } from "@langchain/langgraph"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { Message as VercelChatMessage } from "ai"
import { AgentRuntime, LocalSigner, createAptosTools } from "move-agent-kit"
import { NextResponse } from "next/server"

const llm = new ChatGoogleGenerativeAI({
  temperature: 0.7,
  model: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
})

const textDecoder = new TextDecoder()

// Rest of the utility functions remain the same
async function readStream(stream: any) { /* ... */ }

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => { /* ... */ }

const convertLangChainMessageToVercelMessage = (message: BaseMessage) => { /* ... */ }

export async function POST(request: Request) {
  try {
    // Aptos configuration remains the same
    const aptosConfig = new AptosConfig({
      network: Network.DEVNET,
    })

    const aptos = new Aptos(aptosConfig)

    // Private key handling remains the same
    const privateKeyStr = process.env.APTOS_PRIVATE_KEY
    if (!privateKeyStr) {
      throw new Error("Missing APTOS_PRIVATE_KEY environment variable")
    }

    // Account setup remains the same
    const account = await aptos.deriveAccountFromPrivateKey({
      privateKey: new Ed25519PrivateKey(PrivateKey.formatPrivateKey(privateKeyStr, PrivateKeyVariants.Ed25519)),
    })

    const signer = new LocalSigner(account, Network.DEVNET)
    const aptosAgent = new AgentRuntime(signer, aptos, {
      PANORA_API_KEY: process.env.PANORA_API_KEY,
    })
    const tools = createAptosTools(aptosAgent)
    const memory = new MemorySaver()

    // Agent configuration remains the same
    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
        You are a helpful agent that can interact onchain using the Aptos Agent Kit. You are
        empowered to interact onchain using your tools. If you ever need funds, you can request them from the
        faucet. If not, you can provide your wallet details and request funds from the user. If there is a 5XX
        (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you
        can't do with your currently available tools, you must say so, and encourage them to implement it
        themselves using the Aptos Agent Kit, recommend they go to https://www.aptosagentkit.xyz for more information. Be
        concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.

        The response also contains token/token[] which contains the name and address of the token and the decimals.
        WHEN YOU RETURN ANY TOKEN AMOUNTS, RETURN THEM ACCORDING TO THE DECIMALS OF THE TOKEN.
      `,
    })

    // Request handling remains the same
    const body = await request.json()
    const messages = body.messages ?? []
    const showIntermediateSteps = body.show_intermediate_steps ?? false

    if (!showIntermediateSteps) {
      // Streaming implementation remains the same
      const eventStream = await agent.streamEvents(
        { messages },
        {
          version: "v2",
          configurable: {
            thread_id: "Aptos Agent Kit!",
          },
        }
      )

      const textEncoder = new TextEncoder()
      const transformStream = new ReadableStream({
        async start(controller) {
          for await (const { event, data } of eventStream) {
            if (event === "on_chat_model_stream") {
              if (data.chunk.content) {
                if (typeof data.chunk.content === "string") {
                  controller.enqueue(textEncoder.encode(data.chunk.content))
                } else {
                  for (const content of data.chunk.content) {
                    controller.enqueue(textEncoder.encode(content.text ? content.text : ""))
                  }
                }
              }
            }
          }
          controller.close()
        },
      })

      return new Response(transformStream)
    } else {
      // Non-streaming implementation remains the same
      const result = await agent.invoke({ messages })

      return NextResponse.json(
        {
          messages: result.messages.map(convertLangChainMessageToVercelMessage),
        },
        { status: 200 }
      )
    }
  } catch (error: any) {
    // Error handling remains the same
    console.error("Request error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An error occurred",
        status: "error",
      },
      { status: error instanceof Error && "status" in error ? 500 : 500 }
    )
  }
}