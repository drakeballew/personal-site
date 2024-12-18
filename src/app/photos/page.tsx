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
  published,
}: {
  title: string
  description: string
  tripDate: string
  cta: string
  href: string
  published?: boolean
}) {
  if (!published) return null;

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
  const appearances = [
    // Asia
    {
      href: "/photos/china",
      title: "China",
      description: "Rice terraces, a very Great Wall, and some of the best food I've ever tasted.",
      tripDate: "2010-2014",
      cta: "View photos",
      section: "Asia",
      published: true,
    },
    {
      href: "/photos/se-asia",
      title: "Southeast Asia",
      description: "Teach English, take holiday. Beaches, banana pancakes, motorbikes, and one super-hot German blonde.",
      tripDate: "2010-2011",
      cta: "View photos",
      section: "Asia",
      published: true,
    },
    {
      href: "/photos/india",
      title: "India",
      description: "Sensory overload at its best and diarrhea of the worst, most vengeful kind.",
      tripDate: "May 2011",
      cta: "View photos",
      section: "Asia",
      published: true,
    },
    {
      href: "/photos/central-asia",
      title: "Central Asia",
      description: "A night spent snowed out on top of a glacier. An epic near-kidnapping hitchhiking experience. Being retained and questioned by the People's Liberation Army at the border. All in one trip!",
      tripDate: "Sept 2012",
      cta: "View photos",
      section: "Asia",
      published: true,
    },
    {
      href: "/photos/nepal",
      title: "Nepal",
      description: "3 weeks of trekking in the Himalayas. Probably the most beautiful place I've ever been. Definitely the best apple pie.",
      tripDate: "Nov 2013",
      cta: "View photos",
      section: "Asia",
      published: true,
    },
    // Europe
    {
      href: "/photos/italy",
      title: "Rome, Florence, & Amalfi Coast",
      description: "Brother graduates college, we go to Italy. I eat pasta, look at pretty old things, and drink wine in terrazzas and piazzas.",
      tripDate: "Aug 2016",
      cta: "View photos",
      section: "Europe",
      published: true,
    },
    {
      href: "/photos/london-amsterdam-berlin",
      title: "London, Amsterdam, & Berlin",
      description: "Old buildings, hot babes, great beer. Love Europe.",
      tripDate: "Jul 2022",
      cta: "View photos",
      section: "Europe",
      published: true,
    },
    {
      href: "/photos/paris",
      title: "Paris",
      description: "Forgot to eat a croissant. Guess I gotta go back.",
      tripDate: "April 2023",
      cta: "View photos",
      section: "Europe",
      published: true,
    },
    {
      href: "/photos/spain-morocco",
      title: "Spain & Morocco",
      description: "Art, the Atlas mountains, Iberican ham, and the worst host experience of my life.",
      tripDate: "May 2023",
      cta: "View photos",
      section: "Europe",
      published: true,
    },
    {
      href: "/photos/turkey",
      title: "Turkey",
      description: "Definitely the best breakfast I've ever had on the road. Istanbul was pretty cool too!",
      tripDate: "Nov 2023",
      cta: "View photos",
      section: "Europe",
      published: false,
    },
    // North America
    {
      href: "/photos/panama-city-san-blas",
      title: "Panama City & San Blas",
      description: "My first trip abroad! Sex, drugs, violence - what more could a a 22-year-old ask for??",
      tripDate: "Jan 2009",
      cta: "View photos",
      section: "North America",
      published: true,
    },
    {
      href: "/photos/us-roadtrip-2009",
      title: "Western States Roadtrip",
      description: "Near-death experience in the Grand Canyon. Near-death experience on a remote Utah highway. Near-death experience hiking up Half Dome. Great success!!!",
      tripDate: "Jul 2009",
      cta: "View photos",
      section: "North America",
      published: true,
    },
    {
      href: "/photos/us-roadtrip-2011",
      title: "The Great American Roadtrip",
      description: "Multiple monstrous storms. A bear attack next door. Unintentionally off-trailing in Yosemite. Constant quarreling and make-up sex. Nothing steels a relationship like the open road.",
      tripDate: "July 2011",
      cta: "View photos",
      section: "North America",
      published: true,
    },
    {
      href: "/photos/san-francisco",
      title: "San Francisco",
      description: "8 years numbing myself to the horrors of Free Market Capitalism and political dysfunction. Also: seals, public parks, and a LOT of tacos.",
      tripDate: "2014-2021",
      cta: "View photos",
      section: "North America",
      published: false,
    },
    {
      href: "/photos/oahu-hawaii",
      title: "Oahu, Hawaii",
      description: "Quick trip to Waikiki. Donuts, poke, sunburn.",
      tripDate: "Nov 2015",
      cta: "View photos",
      section: "North America",
      published: true,
    },
    {
      href: "/photos/central-america",
      title: "Backpacking Central America",
      description: '"Quit your job, sell your stuff, and hit the road." 3 months on the Gringo Trail, starting in Caye Caulker and ending in Panama City.',
      tripDate: "Mar 2017",
      cta: "View photos",
      section: "North America",
      published: true,
    },
    {
      href: "/photos/new-orleans",
      title: "New Orleans",
      description: "Met up with family in the Big Easy for a long, post-New Years weekend. Colder than a witch's tit.",
      tripDate: "Jan 2018",
      cta: "View photos",
      section: "North America",
      published: true,
    },
    {
      href: "/photos/mexico-city",
      title: "Mexico City",
      description: "Dia de Los Muertos in Mexico City. Tacos, tequila, and a whole lot of skeletons.",
      tripDate: "Oct 2019",
      cta: "View photos",
      section: "North America",
      published: true,
    },
    {
      href: "/photos/kauai-hawaii",
      title: "COVID in Kauai",
      description: "Mid-COVID bachannalia at its best with my brother and his friends.",
      tripDate: "Nov 2020",
      cta: "View photos",
      section: "North America",
      published: true,
    },
    {
      href: "/photos/portland",
      title: "Portland, Oregon",
      description: "Absolutely gorgeous landscape. Some good people and whooooooole lot of assholes.",
      tripDate: "Sep 2021",
      cta: "View photos",
      section: "North America",
      published: false,
    },
    {
      href: "/photos/saladita",
      title: "Playa Saladita, Mexico",
      description: "Surfs up! Little waves, big 'staches.",
      tripDate: "Dec 2022",
      cta: "View photos",
      section: "North America",
      published: true,
    },
  ];


  return (
    <SimpleLayout
      title="I’ve taken photos all over the world. Here are some of my favorites and the stories behind them."
      intro="Common themes: spicy food, hot babes, near-death experiences in pretty places."
    >
      <div className="space-y-20">
      <PhotosSection title="Asia">
          {appearances
            .filter(appearance => appearance.published && appearance.section === "Asia")
            .map((appearance, index) => (
              <Appearance
                key={index}
                href={appearance.href}
                title={appearance.title}
                description={appearance.description}
                tripDate={appearance.tripDate}
                cta={appearance.cta}
                published={appearance.published}
              />
            ))}
        </PhotosSection>
        <PhotosSection title="Europe">
          {appearances
            .filter(appearance => appearance.published && appearance.section === "Europe")
            .map((appearance, index) => (
              <Appearance
                key={index}
                href={appearance.href}
                title={appearance.title}
                description={appearance.description}
                tripDate={appearance.tripDate}
                cta={appearance.cta}
                published={appearance.published}
              />
            ))}
        </PhotosSection>
        <PhotosSection title="North America">
          {appearances
            .filter(appearance => appearance.published && appearance.section === "North America")
            .map((appearance, index) => (
              <Appearance
                key={index}
                href={appearance.href}
                title={appearance.title}
                description={appearance.description}
                tripDate={appearance.tripDate}
                cta={appearance.cta}
                published={appearance.published}
              />
            ))}
        </PhotosSection>
      </div>
    </SimpleLayout>
  )
}
