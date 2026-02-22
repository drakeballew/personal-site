import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getUses } from '@/lib/uses'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}


export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default async function Uses() {
  const categories = await getUses()

  return (
    <SimpleLayout
      title="Tools, gadgets, et cetera"
      intro="Here's a big list of stuff I use, sorted by category. Heads up that a lot of these have affiliate links, but that's not why they made the list."
    >
      <div className="space-y-20">
        {categories.map((category, categoryIndex) => (
          <ToolsSection key={category.title || categoryIndex} title={category.title}>
            {category.tools.map((tool, toolIndex) => (
              <Tool
                key={tool.title ? `${tool.title}-${toolIndex}` : toolIndex}
                title={tool.title}
                href={tool.href}
              >
                {tool.description}
              </Tool>
            ))}
          </ToolsSection>
        ))}
      </div>
    </SimpleLayout>
  )
}
