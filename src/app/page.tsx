import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ScrollCue } from "@/components/ScrollCue";

export default function Home() {
  return (
    <>
    <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-8">
      <div className="grid gap-10 lg:grid-cols-2 items-center w-full">
        <div className="flex justify-center lg:justify-start">
          <div className="rounded-full overflow-hidden" style={{ width: 440, height: 440 }}>
        <Image
              src="/images/profile-headshot.webp"
              alt="Joel Torres headshot"
              width={880}
              height={880}
              className="h-full w-full object-cover"
          priority
        />
          </div>
        </div>
        <div>
          <p className="text-foreground/70">Hi, I’m Joel,</p>
          <h1 className="text-6xl font-extrabold tracking-tight">BA&IS Student</h1>
          <p className="mt-6 text-foreground/80 text-base lg:text-lg max-w-prose">
            I’m exploring how AI, automation, and backend systems can streamline the way organizations work. Right now, I’m focused on learning, building projects, and documenting the journey.
          </p>
          <div className="mt-10 flex gap-3">
            <a
              href="mailto:joelatorres1305@gmail.com"
              className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium hover:bg-white/5 dark:hover:bg-white/10 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 12 4 6.01V6h16ZM4 18V8.14l8 5.85 8-5.85V18H4Z"/>
              </svg>
              Email
        </a>
        <a
              href="https://www.linkedin.com/in/joel-torres-psu/"
              className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium hover:bg-white/5 dark:hover:bg.white/10 transition"
              aria-label="Connect on LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.65H9.35V9h3.41v1.56h.05c.47-.9 1.62-1.85 3.33-1.85 3.56 0 4.22 2.35 4.22 5.41v6.33ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"/>
              </svg>
              Connect
            </a>
          </div>
        </div>
      </div>
      <ScrollCue />
    </section>

      <section id="about" className="py-28">
        <Reveal>
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-6xl font-extrabold tracking-tight leading-[0.95] mb-6">About me</h2>
              <p className="text-foreground/80 text-lg max-w-3xl mx-auto">
                Hi, I&apos;m Joel Torres — an entrepreneurial Business Analytics & Information Systems student at Penn State with a growing interest in AI, automation, and backend systems.
              </p>
            </div>
            
            <div className="space-y-20">
              {/* Experience Section */}
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <h3 className="text-2xl font-bold">Experience</h3>
                  </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold mb-2">Powerwashing & Door-to-Door Sales</h4>
                    <p className="text-foreground/80 text-sm">
                      Started with powerwashing services and moved into door-to-door sales internships. This experience taught me resilience, communication skills, and how to handle rejection while building persistence.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold mb-2">COD Sharpened Sales Skills</h4>
                    <p className="text-foreground/80 text-sm">
                      The challenging environment of door-to-door sales sharpened and retaught me the fundamentals of sales. It was one of the hardest things I&apos;ve ever done, but it built discipline and the ability to perform under pressure.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center order-2 lg:order-2">
                <div className="relative group">
                  {/* Glow effect background */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  
                  {/* Main image container */}
                  <div className="relative w-80 h-80 rounded-2xl overflow-hidden bg-white/10 border border-white/20 shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-105">
                    <Image
                      src="/images/experience.webp"
                      alt="Joel Torres powerwashing experience"
                      width={320}
                      height={320}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={{ objectPosition: 'center 20%' }}
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Floating label */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-xs font-medium text-white/90 whitespace-nowrap">
                    💪 Building Resilience
                  </div>
                </div>
              </div>
            </div>

            {/* Ventures Section */}
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <div className="relative group">
                  {/* Glow effect background */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  
                  {/* Main image container */}
                  <div className="relative w-80 h-80 rounded-2xl overflow-hidden bg-white/10 border border-white/20 shadow-2xl group-hover:shadow-green-500/25 transition-all duration-500 group-hover:scale-105">
                    <Image
                      src="/images/ventures.webp"
                      alt="Ventures and current projects"
                      width={320}
                      height={320}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Floating label */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-xs font-medium text-white/90 whitespace-nowrap">
                    🦁 Penn State
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <h3 className="text-2xl font-bold">Ventures</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold mb-2">Studying BA&IS at Penn State</h4>
                    <p className="text-foreground/80 text-sm">
                      Currently pursuing Business Analytics & Information Systems at the Smeal College of Business, focusing on how data and technology can drive business decisions and create efficient systems.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold mb-2">AI Co-op Experience</h4>
                    <p className="text-foreground/80 text-sm">
                      Working on AI-powered solutions and automation systems, applying classroom knowledge to real-world problems and building practical experience in the field.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals Section */}
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <h3 className="text-2xl font-bold">Goals</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold mb-2">Future Goals</h4>
                    <p className="text-foreground/80 text-sm">
                      I plan to complete my BA&IS degree and continue building hands-on experience with AI and automation tools. My long-term vision is to help organizations implement systems that remove friction and deliver measurable results.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold mb-2">Personal Goals</h4>
                    <p className="text-foreground/80 text-sm">
                      Staying physically fit and disciplined is an important goal for me. With 17 years of gymnastics experience, I&apos;ve built consistency, hard work, and balance into my daily life.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center order-1 lg:order-2">
                <div className="relative group">
                  {/* Glow effect background */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  
                  {/* Main image container */}
                  <div className="relative w-80 h-80 rounded-2xl overflow-hidden bg-white/10 border border-white/20 shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 group-hover:scale-105">
                    <Image
                      src="/images/goals.webp"
                      alt="Future goals and vision"
                      width={320}
                      height={320}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Floating label */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-xs font-medium text-white/90 whitespace-nowrap">
                    🚀 Future Impact
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>

    <section id="projects" className="py-24">
      <div className="mb-8">
        <p className="text-sm text-foreground/60 mb-2">My Work</p>
        <h2 className="text-4xl font-bold tracking-tight mb-4">Featured Projects</h2>
        <p className="text-foreground/80 max-w-2xl">A collection of automation systems and backend solutions I&apos;ve built to streamline workflows and drive results.</p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Project 1 - FFC AI Onboarding */}
        <div className="group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 aspect-video mb-4">
            <Image
              src="/images/project-1.webp"
              alt="Dan and Robin Ives A.I. Innovation Day Competition Winner"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-yellow-500/90 text-black text-xs px-2 py-1 rounded-full font-semibold">🏆 Competition Winner</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-white/90 transition">FFC AI Onboarding System</h3>
          <p className="text-sm text-foreground/70 mb-2">Dan and Robin Ives A.I. Innovation Day - Competition Winner (March 2025)</p>
          <p className="text-sm text-foreground/70">Developed a solo project addressing Free For Charity&apos;s 45+ client onboarding backlog using AI agents, APIs, and automation tools.</p>
        </div>

        {/* Project 2 - FFC Technical Volunteer */}
        <div className="group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-green-500/20 via-teal-500/20 to-cyan-500/20 border border-white/10 aspect-video mb-4">
            <Image
              src="/images/project-2.webp"
              alt="JAT Digital Automations"
              fill
              className="object-cover object-[center_top] group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-blue-500/90 text-white text-xs px-2 py-1 rounded-full font-semibold">🤖 AI Systems Consulting</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-white/90 transition">FFC – Technical Volunteer (2025)</h3>
          <p className="text-sm text-foreground/70 mb-2">Served as a technical volunteer for Free For Charity, focusing on learning the landscape of AI tools.</p>
          <p className="text-sm text-foreground/70">Implemented prototypes using LLMs, vibe coding, n8n, and Microsoft 365 that supported the foundation for the FFC onboarding automation system.</p>
        </div>

        {/* Project 3 - Brand Monetization */}
        <div className="group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 border border-white/10 aspect-video mb-4">
            <Image
              src="/images/project-3.webp"
              alt="Brand Monetization - Professional Website & Sales Funnel"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-purple-500/90 text-white text-xs px-2 py-1 rounded-full font-semibold">📈 Growth Operator</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-white/90 transition">Brand Monetization</h3>
          <p className="text-sm text-foreground/70 mb-2">Brand project launched in 2025 to turn a 400K+ follower gymnastics creator into a business.</p>
          <p className="text-sm text-foreground/70">Built a custom website, Stripe-powered booking system, and automated funnel that enabled fans to book 1-on-1 coaching calls.</p>
        </div>
      </div>
    </section>

    <section id="blog" className="py-24">
      <div className="mb-8">
        <p className="text-sm text-foreground/60 mb-2">Latest Writing</p>
        <h2 className="text-4xl font-bold tracking-tight mb-4">Blog & Notes</h2>
        <p className="text-foreground/80 max-w-2xl">Documenting my journey, sharing learnings, and exploring ideas around AI, automation, and backend systems.</p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 aspect-[16/9] mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <p className="text-sm text-white/60">Featured Post</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Build Log</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-white/90 transition">Building My First AI Automation System</h3>
              <p className="text-foreground/70 mb-4 text-lg">A deep dive into the challenges and breakthroughs of creating an end-to-end automation workflow for nonprofit onboarding.</p>
              <div className="flex items-center gap-4 text-sm text-foreground/60">
                <span>Dec 15, 2024</span>
                <span>•</span>
                <span>8 min read</span>
                <span>•</span>
                <span>AI, Automation</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Recent Posts */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  <div className="group cursor-pointer">
                    <div className="flex gap-3">
                      <div className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 w-16 h-12 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1 group-hover:text-white/90 transition text-sm">Microsoft 365 Automation Deep Dive</h4>
                        <p className="text-xs text-foreground/70 mb-2">Exploring Power Automate and SharePoint integration patterns.</p>
                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                          <span>Dec 10, 2024</span>
                          <span>•</span>
                          <span>5 min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="flex gap-3">
                      <div className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 w-16 h-12 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1 group-hover:text-white/90 transition text-sm">From Sales to Systems Thinking</h4>
                        <p className="text-xs text-foreground/70 mb-2">How door-to-door sales shaped my approach to building user-centered automation.</p>
                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                          <span>Dec 5, 2024</span>
                          <span>•</span>
                          <span>6 min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="flex gap-3">
                      <div className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 w-16 h-12 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H4.5C3.67 2 3 2.67 3 3.5v15c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1 group-hover:text-white/90 transition text-sm">n8n Workflow Architecture</h4>
                        <p className="text-xs text-foreground/70 mb-2">Designing scalable automation workflows with self-hosted n8n.</p>
                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                          <span>Nov 28, 2024</span>
                          <span>•</span>
                          <span>7 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm">Build Logs</span>
                    </div>
                    <span className="text-xs text-foreground/60">3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm">Learning Notes</span>
                    </div>
                    <span className="text-xs text-foreground/60">2</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm">Ideas & Reflections</span>
                    </div>
                    <span className="text-xs text-foreground/60">1</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20 transition">AI</span>
                  <span className="text-xs bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20 transition">Automation</span>
                  <span className="text-xs bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20 transition">Microsoft 365</span>
                  <span className="text-xs bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20 transition">n8n</span>
                  <span className="text-xs bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20 transition">Backend</span>
                  <span className="text-xs bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20 transition">Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="resume" className="py-24">
      <div className="mb-8">
        <p className="text-sm text-foreground/60 mb-2">Professional Profile</p>
        <h2 className="text-4xl font-bold tracking-tight mb-4">Resume</h2>
        <p className="text-foreground/80 max-w-2xl">Download my resume to learn more about my experience, skills, and certifications.</p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        {/* Resume Preview */}
        <div className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 aspect-[3/4] shadow-2xl">
            <Image
              src="/images/resume-preview.webp"
              alt="Joel Torres Resume Preview"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            </div>
            <div className="absolute top-4 left-8">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
            <div className="absolute top-4 left-12">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="order-1 lg:order-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-3">Get My Resume</h3>
              <p className="text-foreground/80 mb-6">
                Download my latest resume to see my full experience, technical skills, and certifications including JT Powerwashing, Door-to-Door Sales, and Microsoft certifications.
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href="/Joel-Torres-resume.pdf" 
                download
                className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium group-hover:text-white/90 transition">Download PDF</h4>
                  <p className="text-sm text-foreground/70">Joel-Torres-resume.pdf</p>
                </div>
                <svg className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://learn.microsoft.com/api/credentials/share/en-us/JoelTorres-4643/1D05871E0F5FA109?sharingId=3B9A6A1523B61FA6" 
            target="_blank"
            rel="noopener noreferrer"
                  className="group p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium group-hover:text-white/90 transition">MS-900</span>
                    <svg className="w-3 h-3 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-xs text-foreground/70 group-hover:text-foreground/80 transition">Microsoft 365 Fundamentals</p>
                </a>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">MS-700</span>
                    <span className="text-xs text-yellow-400 font-medium">(In Progress)</span>
                  </div>
                  <p className="text-xs text-foreground/70">Managing Microsoft Teams</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" className="py-24">
      <div className="mb-8">
        <p className="text-sm text-foreground/60 mb-2">Let&apos;s Connect</p>
        <h2 className="text-4xl font-bold tracking-tight mb-4">Get In Touch</h2>
        <p className="text-foreground/80 max-w-2xl">If you&apos;d like to work with me or see a business audit of how I can implement my skillset, let&apos;s book a call.</p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        {/* Contact Options */}
        <div className="space-y-6">
          <div className="group cursor-pointer">
            <a 
              href="https://calendly.com/joelatorres1305/lets-chat" 
          target="_blank"
          rel="noopener noreferrer"
              className="block"
            >
              <div className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:border-white/20">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-white/90 transition">Book a Call</h3>
                  <p className="text-sm text-foreground/70">Schedule a consultation to discuss your automation needs</p>
                </div>
                <svg className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>

          <div className="group cursor-pointer">
            <a 
              href="mailto:joelatorres1305@gmail.com"
              className="block"
            >
              <div className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:border-white/20">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-white/90 transition">Send Email</h3>
                  <p className="text-sm text-foreground/70">joelatorres1305@gmail.com</p>
                </div>
                <svg className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>

          <div className="group cursor-pointer">
            <a 
              href="https://www.linkedin.com/in/joel-torres-psu/" 
          target="_blank"
          rel="noopener noreferrer"
              className="block"
            >
              <div className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:border-white/20">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.65H9.35V9h3.41v1.56h.05c.47-.9 1.62-1.85 3.33-1.85 3.56 0 4.22 2.35 4.22 5.41v6.33ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-white/90 transition">Connect on LinkedIn</h3>
                  <p className="text-sm text-foreground/70">Follow my professional journey and updates</p>
                </div>
                <svg className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* What I Can Help With */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">What I Can Help With</h3>
            <p className="text-foreground/80 mb-6">
              Whether you&apos;re looking to streamline operations, automate workflows, or implement AI solutions, I can provide a comprehensive audit and implementation plan.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium mb-1">Business Process Audit</h4>
                <p className="text-sm text-foreground/70">Identify automation opportunities and workflow inefficiencies</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium mb-1">Microsoft 365 Integration</h4>
                <p className="text-sm text-foreground/70">Optimize your existing Microsoft ecosystem with automation</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium mb-1">AI-Powered Solutions</h4>
                <p className="text-sm text-foreground/70">Implement intelligent automation to reduce manual work</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    </section>
    </>
  );
}
