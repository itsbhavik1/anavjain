/*import { ChatWindow } from "@/components/ChatWindow"

export default function Home() {
	const InfoCard = (
		<div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
			<h1 className="text-3xl md:text-4xl mb-4">MoveAgentKit + LangChain.js 🦜🔗 + Next.js</h1>
			<ul>
				<li className="text-l">
					🤝
					<span className="ml-2">
						This template showcases a simple agent chatbot using{" "}
						<a href="https://https://www.moveagentkit.xyz/">MoveAgentKit</a>
						{", "}
						<a href="https://js.langchain.com/" target="_blank">
							LangChain.js
						</a>{" "}
						and the Vercel{" "}
						<a href="https://sdk.vercel.ai/docs" target="_blank">
							AI SDK
						</a>{" "}
						in a{" "}
						<a href="https://nextjs.org/" target="_blank">
							Next.js
						</a>{" "}
						project.
					</span>
				</li>
				<li className="hidden text-l md:block">
					💻
					<span className="ml-2">
						You can find the prompt and model logic for this use-case in <code>app/api/chat/route.ts</code>.
					</span>
				</li>
				<li className="hidden text-l md:block">
					🎨
					<span className="ml-2">
						The main frontend logic is found in <code>app/page.tsx</code>.
					</span>
				</li>
				<li className="text-l">
					🐙
					<span className="ml-2">
						This template is open source - you can see the source code and deploy your own version{" "}
						<a href="#" target="_blank">
							from the GitHub repo (coming soon)
						</a>
						!
					</span>
				</li>
				<li className="text-l">
					👇
					<span className="ml-2">
						Try asking e.g. <code>What is my wallet address?</code> below!
					</span>
				</li>
			</ul>
		</div>
	)
	return (
		<ChatWindow
			endpoint="api/hello"
			emoji="🤖"
			titleText="Aptos agent"
			placeholder="I'm your friendly Aptos agent! Ask me anything..."
			emptyStateComponent={InfoCard}
		></ChatWindow>
	)
}*/
'use client'
import { ChatWindow } from "@/components/ChatWindow";
import { Sparkles, Code2, MessageSquare, Github, ExternalLink, Zap } from 'lucide-react';
import {useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const InfoCard = (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a24] to-[#25252d] p-8 shadow-2xl transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 opacity-30 animate-gradient"></div>
      
      {/* Interactive glowing orbs */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl animate-pulse delay-1000"></div>

      <div className="relative">
        {/* Enhanced Header */}
        <div className="mb-8 border-b border-white/10 pb-8 group">
          <div className="flex items-center gap-3 transform transition-transform duration-300 group-hover:translate-x-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-purple-400 animate-glow" />
              <div className="absolute inset-0 bg-purple-400/20 blur-xl animate-pulse"></div>
            </div>
            <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent animate-gradient">
              MoveAgentKit + LangChain.js + Next.js
            </h1>
          </div>
        </div>

        {/* Enhanced Feature list */}
        <ul className="space-y-6">
          <FeatureItem
            icon={<Zap className="h-5 w-5 text-purple-400" />}
            title="Powerful Integration"
            highlight
          >
            This template showcases a simple agent chatbot using{" "}
            <Link href="https://www.moveagentkit.xyz/">MoveAgentKit</Link>,{" "}
            <Link href="https://js.langchain.com/">LangChain.js</Link> and the Vercel{" "}
            <Link href="https://sdk.vercel.ai/docs">AI SDK</Link> in a{" "}
            <Link href="https://nextjs.org/">Next.js</Link> project.
          </FeatureItem>

          <FeatureItem
            icon={<Code2 className="h-5 w-5 text-purple-400" />}
            title="Developer Friendly"
            className="hidden md:flex"
          >
            You can find the prompt and model logic for this use-case in{" "}
            <CodeSnippet>app/api/chat/route.ts</CodeSnippet>
          </FeatureItem>

          <FeatureItem
            icon={<Code2 className="h-5 w-5 text-purple-400" />}
            title="Easy to Customize"
            className="hidden md:flex"
          >
            The main frontend logic is found in{" "}
            <CodeSnippet>app/page.tsx</CodeSnippet>
          </FeatureItem>

          <FeatureItem
            icon={<Github className="h-5 w-5 text-purple-400" />}
            title="Open Source"
            highlight
          >
            This template is open source - you can see the source code and deploy your own version{" "}
            <Link href="#">from the GitHub repo (coming soon)</Link>!
          </FeatureItem>

          <FeatureItem
            icon={<MessageSquare className="h-5 w-5 text-purple-400" />}
            title="Try It Out"
            highlight
          >
            Try asking e.g.{" "}
            <CodeSnippet>What is my wallet address?</CodeSnippet>{" "}
            below!
          </FeatureItem>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-gradient-to-b from-[#0f0f17] to-[#1a1a24]">
      <div className="flex w-full max-w-5xl flex-1 flex-col items-center gap-8">
        {InfoCard}
        <div className={`w-full transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, children, className = "", highlight = false }) {
  return (
    <li className={`group flex items-start gap-3 text-white/80 transform transition-all duration-300 hover:translate-x-2 ${className}`}>
      <div className="mt-1 flex-shrink-0 transform transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div className={`transition-colors duration-300 ${highlight ? 'bg-white/5' : ''} rounded-lg p-3 w-full`}>
        <h3 className="mb-1 font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="leading-relaxed">{children}</p>
      </div>
    </li>
  );
}

function Link({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 hover:underline transition-colors duration-300 group"
    >
      {children}
      <ExternalLink className="h-3 w-3 transform transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function CodeSnippet({ children }) {
  return (
    <code className="rounded bg-white/10 px-2 py-1 font-mono text-sm transition-colors duration-300 hover:bg-white/15">
      {children}
    </code>
  );
}
