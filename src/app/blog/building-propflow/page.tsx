
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Building PropFlow: The Journey from Idea to MVP | Joel Torres",
    description: "The challenges, breakthroughs, and lessons learned while building an AI-powered property management platform.",
};

export default function BuildingPropFlowPost() {
    return (
        <article className="py-24 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-foreground/60 mb-6">
                        <span>Jan 20, 2026</span>
                        <span>•</span>
                        <span>10 min read</span>
                        <span>•</span>
                        <span className="bg-white/10 px-2 py-1 rounded text-foreground/80">Build Log</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                        Building PropFlow: The Journey from Idea to MVP
                    </h1>
                    <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                        How we moved from endless failures to 10x efficiency by building our own AI workflow agents.
                    </p>
                </div>

                {/* Video Embed */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 mb-16 shadow-2xl">
                    <iframe
                        src="https://www.youtube.com/embed/er0cNmZW19Q"
                        title="PropFlow MVP Demo"
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="lead text-xl text-foreground/90">
                        Bringing <strong>PropFlow</strong> to life has been a challenge. A challenge that I put hours of work into as my co-founder Alex Taylor and I failed constantly—and tried again.
                    </p>

                    <p>
                        Creating software seems easy at first until it's time to get into the little details. Details like connecting databases, making real API calls to third-party services, and visualizing that data in a user-friendly way. Not to mention the difficulty of building secure authentication systems that protect user data while remaining valid across sessions.
                    </p>

                    <h2>The Pivot: Taking Control</h2>
                    <p>
                        Through this process, I learned so much about our tech stack. We started small with GitHub and Netlify deployments. But at one point, we knew we had to step up. We wanted more control.
                    </p>
                    <p>
                        That's when we made the change to <strong>Google Cloud and Firebase</strong>.
                    </p>
                    <p>
                        The challenge of tearing everything down and building it back up was immense. It was a major pivot; the system before "worked," but not well enough for the scale and reliability we needed.
                    </p>

                    <h2>The Deployment Struggle</h2>
                    <p>
                        During that transition, we lost our automatic deployment pipelines. Everything became much more hands-on. The amount of time our deployments failed was unfathomable.
                    </p>
                    <p>
                        To fix these issues, I had to create workflows and <strong>AI agents</strong> to sync our entire tech stack together. When you finally get past days of debugging and issues, it’s the most rewarding feeling in the world.
                    </p>

                    <h2>The Breakthrough: Custom AI Agents</h2>
                    <p>
                        Building with AI seems easy until you hit roadblocks. That’s why I felt it was so important to build specific workflows and sub-agents.
                    </p>
                    <p>
                        One breakthrough I had was taking a step back and realizing the real problem: <strong>My IDE did not have enough context.</strong>
                    </p>
                    <p>
                        Being new to this level of software engineering, I didn't always have the knowledge to even understand the issues I was running into. So, I turned to <strong>NoteLM</strong> (Google's research tool). I dove deep into:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Best prompting practices</li>
                        <li>Google Cloud and Firebase ecosystem details</li>
                        <li>Best practices for scalable software architecture</li>
                    </ul>

                    <p>
                        NoteLM gave me precise instructions and clear insights like an expert. But I went a step further.
                    </p>

                    <div className="bg-white/5 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
                        <h3 className="text-lg font-bold mt-0 text-blue-400">The "Expert Developer" Agent</h3>
                        <p className="mb-0">
                            I trained my own AI model on all of this gathered knowledge. I created a custom prompting agent that was an expert developer tailored specifically to <em>my</em> tech stack.
                        </p>
                    </div>

                    <p>
                        Now, simple descriptions of issues turned into 10-fold efficiency gains. Instead of guessing why authentication wasn't working, I had an agent telling me exactly <em>"Google Cloud API database isn't synced with passkeys"</em> (hypothetically).
                    </p>
                    <p>
                        The point is: I now had control. Instead of guesswork, I was learning best practices from an expert I built myself.
                    </p>

                    <hr className="border-white/10 my-12" />

                    <h2>What is PropFlow?</h2>
                    <p>
                        <strong>Project Title:</strong> PropFlow - AI-Powered Market Intelligence for Property Management
                    </p>
                    <p>
                        <strong>MVP Title:</strong> Financial and Communication Optimization & Tenant Churn Prevention System
                    </p>

                    <h3>The Problem</h3>
                    <p>Independent landlords and small property management companies face three critical challenges:</p>
                    <ol className="list-decimal pl-6 space-y-4">
                        <li>
                            <strong>Manual Market Research is Time-Consuming</strong>
                            <br />
                            Landlords spend 15-20 hours per month researching rent prices. Pricing based on "gut feeling" leaves $100-300/month on the table per property.
                        </li>
                        <li>
                            <strong>Tenant Turnover is Costly</strong>
                            <br />
                            Each turnover costs $4,000-6,000 in vacancy, cleaning, and advertising. There is currently no early warning system for tenant dissatisfaction.
                        </li>
                        <li>
                            <strong>Lack of Actionable Intelligence</strong>
                            <br />
                            Existing platforms focus on operations, not analytics. Investment decisions are made without comprehensive data.
                        </li>
                    </ol>

                    <h3>The PropFlow Solution</h3>
                    <p>
                        PropFlow is the first AI-native platform that makes landlords money through intelligent automation, offering proactive AI automation, predictive analytics, and real-time market intelligence.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <div className="text-sm text-foreground/60 mb-1">Time Saved</div>
                            <div className="text-2xl font-bold text-white">150+ hours/yr</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <div className="text-sm text-foreground/60 mb-1">Revenue Captured</div>
                            <div className="text-2xl font-bold text-green-400">$18,000+/yr</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <div className="text-sm text-foreground/60 mb-1">Cost Avoided</div>
                            <div className="text-2xl font-bold text-blue-400">$40,000+/yr</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <div className="text-sm text-foreground/60 mb-1">ROI</div>
                            <div className="text-2xl font-bold text-purple-400">30-40x</div>
                        </div>
                    </div>

                    <h3>Team</h3>
                    <ul className="list-none pl-0 space-y-4">
                        <li className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">AT</div>
                            <div>
                                <div className="font-semibold">Alexander Taylor</div>
                                <div className="text-sm text-foreground/60">Primary Contact • ajt6597@psu.edu</div>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">JT</div>
                            <div>
                                <div className="font-semibold">Joel Torres</div>
                                <div className="text-sm text-foreground/60">Co-Founder</div>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Navigation Footer */}
                <div className="mt-16 pt-8 border-t border-white/10 flex justify-between">
                    <Link href="/" className="text-sm font-medium hover:text-white/80 transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </article>
    );
}
