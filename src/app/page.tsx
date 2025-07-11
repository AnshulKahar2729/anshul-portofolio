import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { CursorGlow } from "@/components/magicui/cursor-glow";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { WaveEmoji } from "@/components/wave-emoji";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5 group">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.3)]"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} `}
                customElement={<WaveEmoji />}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl transition-all duration-300 group-hover:text-primary/90 group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.2)]"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-lg cursor-pointer">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.3)]">
            About
          </h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="group">
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert transition-all duration-300 group-hover:text-primary/90 group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.2)]">
              {DATA.summary}
            </Markdown>
            <div className="mt-4">
              <a
                href={DATA.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file-text transition-transform duration-300 group-hover:rotate-12"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold transition-all duration-300 hover:scale-105 hover:text-primary cursor-default">
              Work Experience
            </h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
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
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold transition-all duration-300 hover:scale-105 hover:text-primary cursor-default">
              Skills
            </h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge
                  key={skill}
                  className="cursor-default transform transition-all duration-300 hover:scale-110 hover:rotate-1"
                >
                  {skill}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects" className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background"></div>
        <div className="absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]"></div>
        <div className="relative space-y-16 w-full py-16">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-7xl mx-auto">
              <div className="space-y-4 group">
                <div className="inline-block rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:shadow-lg">
                  Featured Projects
                </div>
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl lg:text-3xl transition-all duration-300 group-hover:scale-105 group-hover:text-primary bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  My Latest Work
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl/relaxed max-w-3xl transition-all duration-300 group-hover:text-foreground/90">
                  I specialize in building scalable web applications and AI-powered tools. 
                  Each project demonstrates my expertise in modern technologies and user-centered design.
                  Here are some highlights from my portfolio.
                </p>
              </div>
            </div>
          </BlurFade>
          
                     {/* Enhanced Projects Grid */}
           <div className="max-w-7xl mx-auto">
             <div className="flex flex-col gap-8 px-6">
               {DATA.projects.map((project, id) => (
                 <BlurFade
                   key={project.title}
                   delay={BLUR_FADE_DELAY * 12 + id * 0.1}
                 >
                   <ProjectCard
                     href={project.href}
                     key={project.title}
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
            
            {/* Call to Action */}
            <BlurFade delay={BLUR_FADE_DELAY * 16}>
              <div className="mt-16 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary border border-primary/20 transition-all duration-300 hover:bg-primary/20 hover:scale-105">
                  <span>Want to see more projects?</span>
                  <Link
                    href={DATA.contact.social.GitHub.url}
                    target="_blank"
                    className="font-semibold underline decoration-primary/50 underline-offset-4 hover:decoration-primary transition-colors"
                  >
                    Visit my GitHub
                  </Link>
                </div>
              </div>
            </BlurFade>
          </div>
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
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3 group">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-primary">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl transition-all duration-300 group-hover:scale-105 group-hover:text-primary">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed transition-all duration-300 group-hover:translate-x-2">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline transition-all duration-300 hover:text-blue-600"
                >
                  with a direct question on twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
              <p className="transition-all duration-300 group-hover:translate-x-2">
                Contact me at{" "}
                <span className="text-blue-500 hover:underline transition-all duration-300 hover:text-blue-600">
                  {DATA.contact.email}
                </span>
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
