import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Drake. I live on the West Coast, and I love learning.",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Drake Ballew near the Golden Gate Bridge"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I&apos;m Drake. I&apos;m based on the West Coast, and I love learning.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Learning has always been my passion, and looking back on my life,
              everything I have ever enjoyed doing has had some element of learning
              and development or progress to it. Take soccer for example.
            </p>
            <p>
              I started playing soccer when I was 5 years old. As a kid, I had three siblings 
              and was largely raised by a single mom. I loved soccer, but my siblings were either
               too young or not as interested so I had to find people to play with or, more often, play by myself.
              Today, I see those countless hours of solitary dribbling, 
              passing against the side of the garage, and doing toe-tap exercises
              as evidence of an innate drive for improvement, the basis of which
              lied on the ability to learn how to translate my mind&apos;s intent
              to my feet&apos;s effect on the ball.
            </p>
            <p>
              In all honesty, until my last two years playing competitive soccer when I was 13 or 14 years old,
              I was pretty mediocre - good enough to make the best local travel squad,
              but not good enough to start and often insecure when I was on the field. And that brings up
              the other part of the equation: passion.
            </p>
            <p>
              Like I said, I <b>love</b> learning. I really think it may be the one non-living thing that gives
              the most meaning to my life. And again, looking back, it&apos;s easy to wonder why I kept at it, pushing myself to compete both externally and internally to improve as a soccer player,
              and the answer is a love of learning and a love of seeing the progression in myself as I learn.
              It&apos;s deeply, deeply engrained into my identity.
            </p>
            <p>
              Eventually, I moved on from soccer and did other things. Today, I&apos;m a self-taught small business owner
              of a boutique technology consulting agency and a hobbyist developer, chef, gardener, and full-time
              parent to two furbabies. Those hours spent practicing alone as a kid and what I learned about myself
              as those hours passed year after year have informed every part of my life as an adult and continue to 
              help me to find meaning in even the most difficult circumstances.
            </p>
            <p>
              The best part of being a passionate, life-long learner is that the journey never ends. I&apos;m approaching 40.
              With a bit of luck, I&apos;ve got at least twice as many solar cycles in front of me as I do behind,
              and I can&apos;t wait to grapple with and struggle with so many future things I don&apos;t know or maybe struggle to understand,
              because for me, that&apos;s the entire point.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="#" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="#" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink>
            <SocialLink href="#" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="#" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:drake@pacaya.io"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              drake@pacaya.io
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
