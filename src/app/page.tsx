"use client";

"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { MediumArticles } from "@/components/medium-articles";
import { KeyboardKey } from "@/components/keyboard-key";
import { TimeBasedBackground } from "@/components/time-based-background";
import { SubtleBackground } from "@/components/subtle-background";
import { GlassyButton } from "@/components/glassy-button";
import Link from "next/link";
import Markdown from "react-markdown";
import { Code2, Sparkles, Terminal, Zap, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Page() {
  const [showTimeBackground, setShowTimeBackground] = useState(false);

  return (
    <main className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background - Time-based or Subtle */}
      {showTimeBackground ? <TimeBasedBackground /> : <SubtleBackground />}
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">

        <motion.div
          className="max-w-4xl mx-auto space-y-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BlurFade delay={BLUR_FADE_DELAY}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/40 dark:bg-black/30 backdrop-blur-xl text-sm font-medium mb-4 shadow-lg"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(168, 85, 247, 0.3)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Open to opportunities</span>
            </motion.div>
          </BlurFade>

          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
            text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
          />

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <motion.div
              className="flex items-center justify-center gap-2 text-2xl md:text-4xl font-semibold text-primary"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Terminal className="h-8 w-8" />
              <span>{DATA.description.split(",")[0]}</span>
            </motion.div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {DATA.description}
            </p>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <GlassyButton href="#contact" variant="primary">
                <Zap className="h-5 w-5" />
                Get in Touch
              </GlassyButton>
              <GlassyButton href="#projects" variant="secondary">
                <Code2 className="h-5 w-5" />
                View Work
              </GlassyButton>
              <GlassyButton href={DATA.resumeUrl} variant="secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
                Download Resume
              </GlassyButton>
            </div>
          </BlurFade>

          {/* Toggle Time-Based Background */}
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="pt-8 flex justify-center">
              <button
                onClick={() => setShowTimeBackground(!showTimeBackground)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-xl border transition-all duration-300 group relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "hsl(var(--foreground))"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                {showTimeBackground ? <EyeOff className="h-4 w-4 relative z-10" /> : <Eye className="h-4 w-4 relative z-10" />}
                <span className="relative z-10">
                  {showTimeBackground ? "Hide" : "Show"} Time-Based Sky
                </span>
              </button>
            </div>
          </BlurFade>

        </motion.div>
      </section>
      {/* Work Experience Section */}
      <section id="work" className="px-6 py-20 relative">
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3 text-foreground">
              <motion.div
                className="h-1 w-12 rounded bg-white/40"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              Work Experience
            </h2>
          </motion.div>
          <div className="space-y-4">
            {DATA.work.map((work, id) => (
              <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 2 + id * 0.1}>
                <ResumeCard
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      {/* <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section> */}
      {/* Skills Section - 3D Keyboard */}
      <section id="skills" className="px-6 py-20 max-w-7xl mx-auto relative">
        {/* Matrix rain effect */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px 40px"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3 text-foreground justify-center">
              <motion.div
                className="h-1 w-12 rounded bg-white/40"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              Tech Stack
              <motion.div
                className="h-1 w-12 rounded bg-white/40"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </h2>
        </motion.div>
        
        <motion.div
          className="flex flex-wrap justify-center gap-6 perspective-1000"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {DATA.skills.map((skill, id) => (
            <KeyboardKey key={skill} skill={skill} index={id} />
          ))}
        </motion.div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="px-6 py-20 relative">
        {/* Particle effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center space-y-4 mb-16">
              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-medium border relative overflow-hidden group cursor-default backdrop-blur-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))",
                  borderColor: "rgba(255,255,255,0.3)",
                  boxShadow: "0 4px 16px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
                  color: "hsl(var(--foreground))"
                }}
              >
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative z-10">Featured Projects</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Things I&apos;ve Built
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A collection of projects showcasing my expertise in web development,
                AI integration, and modern tech stacks.
              </p>
            </div>
          </motion.div>

          <div className="space-y-12">
            {DATA.projects.map((project, id) => (
              <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 2 + id * 0.1}>
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  dates={project?.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="mt-16 text-center">
              <GlassyButton href={DATA.contact.social.GitHub.url} variant="primary">
                <span>View More on GitHub</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </GlassyButton>
            </div>
          </BlurFade>
        </div>
      </section>
      {/*  <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  During my time in university, I attended{" "}
                  {DATA.hackathons.length}+ hackathons. People from around the
                  country would come together and build incredible things in 2-3
                  days. It was eye-opening to see the endless possibilities
                  brought to life by a group of motivated and passionate
                  individuals.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section> */}
      
      {/* Articles Section */}
      <section id="articles" className="px-6 py-20 max-w-6xl mx-auto">
        <MediumArticles />
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl border border-white/20 bg-white/50 dark:bg-black/20 backdrop-blur-xl shadow-lg"
          >
            <div className="space-y-6">
              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-medium border relative overflow-hidden group cursor-default backdrop-blur-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))",
                  borderColor: "rgba(255,255,255,0.3)",
                  boxShadow: "0 4px 16px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
                  color: "hsl(var(--foreground))"
                }}
              >
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative z-10">Get in Touch</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Let&apos;s Work Together
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have a project in mind or just want to chat about tech?
                Feel free to reach out via{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  target="_blank"
                  className="text-primary hover:underline font-medium"
                >
                  Twitter
                </Link>{" "}
                or email me at{" "}
                <a
                  href={`mailto:${DATA.contact.email}`}
                  className="text-primary hover:underline font-medium"
                >
                  {DATA.contact.email}
                </a>
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <GlassyButton href={`mailto:${DATA.contact.email}`} variant="primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </GlassyButton>
                <GlassyButton href={DATA.contact.social.X.url} variant="secondary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter DM
                </GlassyButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
