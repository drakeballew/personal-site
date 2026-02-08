import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

function PhotosSection({
  title,
  appearances,
}: {
  title: string
  appearances: Array<{
    href: string
    title: string
    description: string
    tripDate: string
    cta: string
    section: string
    published: boolean
  }>
}) {
  const sectionAppearances = appearances.filter((a) => a.section === title)

  if (sectionAppearances.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        {title}
      </h2>
      <div className="space-y-16">
        {sectionAppearances.map((appearance) => (
          <Card as="article" key={appearance.href}>
            <Card.Title as="h3" href={appearance.href}>
              {appearance.title}
            </Card.Title>
            <Card.Eyebrow decorate>{appearance.tripDate}</Card.Eyebrow>
            <Card.Description>{appearance.description}</Card.Description>
            <Card.Cta>{appearance.cta}</Card.Cta>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Photos',
  description:
    'Visual stories from my travels around the world.',
}

export default function Photos() {
  const appearances = [
    {
      href: '/photos/china',
      title: 'China',
      description: 'Rice terraces, a very Great Wall, and some of the best food I\'ve ever tasted.',
      tripDate: '',
      cta: 'View photos',
      section: 'Asia',
      published: true,
    },
    {
      href: '/photos/se-asia',
      title: 'Southeast Asia',
      description: 'Teach English, take holiday. Beaches, banana pancakes, motorbikes, and one super-hot German blonde.',
      tripDate: '',
      cta: 'View photos',
      section: 'Asia',
      published: true,
    },
    {
      href: '/photos/homeless-in-america',
      title: 'Homeless in America',
      description: 'And Mexico, briefly.',
      tripDate: 'Sep 2025',
      cta: 'View photos',
      section: 'North America',
      published: true,
    },
    {
      href: '/photos/india',
      title: 'India',
      description: 'Sensory overload at its best and diarrhea of the worst, most vengeful kind.',
      tripDate: 'May 2011',
      cta: 'View photos',
      section: 'Asia',
      published: true,
    },
    {
      href: '/photos/central-asia',
      title: 'Central Asia',
      description: 'A night spent snowed out on top of a glacier. An epic near-kidnapping hitchhiking experience. Being retained and questioned by the People\'s Liberation Army at the border. All in one trip!',
      tripDate: 'Sep 2012',
      cta: 'View photos',
      section: 'Asia',
      published: true,
    },
    {
      href: '/photos/nepal',
      title: 'Nepal',
      description: '3 weeks of trekking in the Himalayas. Probably the most beautiful place I\'ve ever been. Definitely the best apple pie.',
      tripDate: 'Nov 2013',
      cta: 'View photos',
      section: 'Asia',
      published: true,
    },
    {
      href: '/photos/italy',
      title: 'Rome, Florence, & Amalfi Coast',
      description: 'Brother graduates college, we go to Italy. I eat pasta, look at pretty old things, and drink wine in terrazzas and piazzas.',
      tripDate: 'Aug 2016',
      cta: 'View photos',
      section: 'Europe',
      published: true,
    },
    {
      href: '/photos/london-amsterdam-berlin',
      title: 'London, Amsterdam, & Berlin',
      description: 'Old buildings, hot babes, great beer. Love Europe.',
      tripDate: 'Jul 2022',
      cta: 'View photos',
      section: 'Europe',
      published: true,
    },
    {
      href: '/photos/paris',
      title: 'Paris',
      description: 'Forgot to eat a croissant. Guess I gotta go back.',
      tripDate: 'Apr 2023',
      cta: 'View photos',
      section: 'Europe',
      published: true,
    },
    {
      href: '/photos/spain-morocco',
      title: 'Spain & Morocco',
      description: 'Art, the Atlas mountains, Iberican ham, and the worst host experience of my life.',
      tripDate: 'May 2023',
      cta: 'View photos',
      section: 'Europe',
      published: true,
    },
    {
      href: '/photos/panama-city-san-blas',
      title: 'Panama City & San Blas',
      description: 'My first trip abroad! Sex, drugs, violence - what more could a a 22-year-old ask for??',
      tripDate: 'Jan 2009',
      cta: 'View photos',
      section: 'North America',
      published: true,
    },
    {
      href: '/photos/us-roadtrip-2009',
      title: 'Western States Roadtrip',
      description: 'Near-death experience in the Grand Canyon. Near-death experience on a remote Utah highway. Near-death experience hiking up Half Dome. Great success!!!',
      tripDate: 'Jul 2009',
      cta: 'View photos',
      section: 'North America',
      published: true,
    },
    {
      href: '/photos/us-roadtrip-2011',
      title: 'The Great American Roadtrip',
      description: 'Multiple monstrous storms. A bear attack next door. Unintentionally off-trailing in Yosemite. Constant quarreling and make-up sex. Nothing steels a relationship like the open road.',
      tripDate: 'Jul 2011',
      cta: 'View photos',
      section: 'North America',
      published: true,
    },
    {
      href: '/photos/oahu-hawaii',
      title: 'Oahu, Hawaii',
      description: 'Quick trip to Waikiki. Donuts, poke, sunburn.',
      tripDate: 'Nov 2015',
      cta: 'View photos',
      section: 'North America',
      published: true,
    },
    {
      href: '/photos/central-america',
      title: 'Backpacking Central America',
      description: '"Quit your job, sell your stuff, and hit the road." 3 months on the Gringo Trail, starting in Caye Caulker and ending in Panama City.',
      tripDate: 'Mar 2017',
      cta: 'View photos',
      section: 'North America',
      published: true,
    },
    {
      href: '/photos/new-orleans',
      title: 'New Orleans',
      description: 'Met up with family in the Big Easy for a long, post-New Years weekend. Colder than a witch\'s tit.',
      tripDate: 'Jan 2018',
      cta: 'View photos',
      section: 'North America',
      published: true,
    },
    {
      href: '/photos/mexico-city',
      title: 'Mexico City',
      description: 'Dia de Los Muertos in Mexico City. Tacos, tequila, and a whole lot of skeletons.',
      tripDate: 'Oct 2019',
      cta: 'View photos',
      section: 'North America',
      published: true,
    },
    {
      href: '/photos/kauai-hawaii',
      title: 'COVID in Kauai',
      description: 'Mid-COVID bachannalia at its best with my brother and his friends.',
      tripDate: 'Nov 2020',
      cta: 'View photos',
      section: 'North America',
      published: true,
    },
    {
      href: '/photos/saladita',
      title: 'Playa Saladita, Mexico',
      description: 'Surfs up! Little waves, big \'staches.',
      tripDate: 'Dec 2022',
      cta: 'View photos',
      section: 'North America',
      published: true,
    },
  ]

  return (
    <SimpleLayout
      title="Photos"
      intro="Visual stories from my travels around the world. Each album captures the moments, people, and places that made each journey memorable."
    >
      <div className="space-y-20">
        <PhotosSection title="Asia" appearances={appearances} />
        <PhotosSection title="North America" appearances={appearances} />
        <PhotosSection title="Europe" appearances={appearances} />
      </div>
    </SimpleLayout>
  )
}
