import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function PhotosSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({
  title,
  description,
  tripDate,
  cta,
  href,
}: {
  title: string
  description: string
  tripDate: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{tripDate}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Photography',
  description:
    'I’ve taken photos all over the world. Here are some of my favorites and the stories behind them.',
}

export default function Photos() {
  return (
    <SimpleLayout
      title="I’ve taken photos all over the world. Here are some of my favorites and the stories behind them."
      intro="One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
    >
      <div className="space-y-20">
        <PhotosSection title="Asia">
          <Appearance
            href="/photos/china"
            title="China"
            description="A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live video back to Earth."
            tripDate="2010-2014"
            cta="View photos"
          />
          <Appearance
            href="/photos/se-asia"
            title="Southeast Asia"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="2010-2011"
            cta="View photos"
          />
          <Appearance
            href="/photos/india"
            title="India"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="May 2011"
            cta="View photos"
          />
          <Appearance
            href="/photos/central-asia"
            title="Central Asia"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="Sept 2012"
            cta="View photos"
          />
          <Appearance
            href="/photos/nepal"
            title="Nepal"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="Nov 2013"
            cta="View photos"
          />
        </PhotosSection>
        <PhotosSection title="Europe">
        <Appearance
            href="/photos/italy"
            title="Rome, Florence, & Amalfi Coast"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="Aug 2016"
            cta="View photos"
          />
        <Appearance
            href="/photos/london-amsterdam-berlin"
            title="London, Amsterdam, & Berlin"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="Jul 2022"
            cta="View photos"
          />
          <Appearance
            href="/photos/paris"
            title="Paris"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="April 2023"
            cta="View photos"
          />
          <Appearance
            href="/photos/spain-morocco"
            title="Spain & Morocco"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="May 2023"
            cta="View photos"
          />
          <Appearance
            href="/photos/turkey"
            title="Turkey"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="Nov 2023"
            cta="View photos"
          />
        </PhotosSection>
        <PhotosSection title="North America">
        <Appearance
            href="/photos/us-roadtrip-2009"
            title="Western States Roadtrip"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="Jul 2009"
            cta="View photos"
          />
        <Appearance
            href="/photos/us-roadtrip-2011"
            title="The Great American Roadtrip"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="July 2011"
            cta="View photos"
          />
        <Appearance
            href="/photos/san-francisco"
            title="San Francisco"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="2014-2021"
            cta="View photos"
          />
          <Appearance
            href="/photos/central-america"
            title="Backpacking Central America"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="Mar 2017"
            cta="View photos"
          />
        <Appearance
            href="/photos/new-orleans"
            title="New Orleans"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="Jan 2018"
            cta="View photos"
          />
          <Appearance
            href="/photos/mexico-city"
            title="Mexico City"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            tripDate="Oct 2019"
            cta="View photos"
          />
        </PhotosSection>
      </div>
    </SimpleLayout>
  )
}
