import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

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

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="Here’s a big list of stuff I use, sorted by category. Heads up that a lot of these have affiliate links, but that's not why they made the list."
    >
      <div className="space-y-20">
        <ToolsSection title="Software">
          <Tool title="Github Copilot + VS Code" href="https://github.com/features/copilot">
            Not perfect, but makes debugging code easier. I&apos;m not sure I am at the level where I can use it to write code from scratch, but very helpful tool worth checking out.
          </Tool>
          <Tool title="ChatGPT" href="https://openai.com/">
            Super helpful for debugging code and getting quick overviews of other topics. I like to use it as a sort of Wikipedia Lite.
          </Tool>
          <Tool title="Airtable" href="https://airtable.com/invite/r/vllZZPBS">
            Similar to Google Sheets but has better file management, which comes in handy when you&apos;re working with a lot of images and other media.
          </Tool>
          <Tool title="Webflow" href="https://www.webflow.com">
            A powerful and relatively easy to use website builder. I recommend it for most of my clients.
          </Tool>
          <Tool title="MailerLite" href="https://www.mailerlite.com/invite/d33549b73bd36">
            Barebones email marketing tool. Simple, no bloat.
          </Tool>
          <Tool title="Memberstack" href="https://www.memberstack.com">
            The easiest way to get a sophisticated web application up and running. I used it to prototype [https://www.openrecipe.ai](OpenRecipe).
          </Tool>
          <Tool title="1Password" href="https://1password.com/">
            The best password management tool out there, in my opinion.
          </Tool>
          <Tool title="Proton Mail" href="https://go.getproton.me/SH1Jq">
            For people who are tired of Google harvesting their email for data.
          </Tool>
          <Tool title="Notion" href="https://www.notion.com/">
            My everything tool. Highly recommend.
          </Tool>


        </ToolsSection>
        <ToolsSection title="Solopreneur">
          <Tool title="Collective" href="https://share.collective.com/DB0526">
            Taxes, bookkeeping, and business formation made easy.
          </Tool>
          <Tool title="Mercury" href="https://mercury.com/r/pacaya-digital-llc">
            Simple, beautiful, free small business banking.
          </Tool>
          <Tool title="Nabers Solo 401k" href="https://www.solo401k.com/?via=drake">
            One way to plan retirement as a solopreneur.
          </Tool>
          <Tool title="Anytime Mailbox" href="https://anytimemailbox.referralrock.com/l/1DRAKEBALLE91/ ">
            Virtual mailbox for business owners.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="CreativeLive" href="https://www.creativelive.com/">
            The best way to learn design, photography, and other creative skills. Especially Adobe Creative Suite.
          </Tool>
          <Tool title="Adobe Creative Suite" href="https://www.adobe.com/">
            By far the best set of design tools out there.
          </Tool>
          <Tool title="Figma" href="https://www.figma.com">
            Awesome for design collaboration.
          </Tool>
          <Tool title="Midjourney" href="https://www.midjourney.com">
            Stop overpaying for stock photos and custom blog imagery.
          </Tool>
          <Tool title="Tailwind UI" href="https://tailwindui.com/">
            If you like this site and know how to code, you can buy and customize the template from Tailwind UI, made by the creators of Tailwind CSS.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Learn to Code">
          <Tool title="Launch School" href="https://launchschool.com/">
            The best way for beginners to learn to code, in my opinion. Not the fastest or easiest, but the best.
          </Tool>
          <Tool title="Scrimba" href="https://scrimba.com/">
            A great way to learn new technologies once you know the basics.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Photography">
          <Tool title="Olympus OM-5 Micro Four Thirds System Camera" href="https://amzn.to/3Dl8Apu">
            Rather than buying a fancy AI-enabled webcam, I decided to invest in a good mirrorless camera that I could use outside, in the kitchen, etc. This is the one I chose.
          </Tool>
          <Tool title="Olympus M.Zuiko Digital ED 14-42mm f/3.5-5.6 EZ Lens" href="https://amzn.to/3VSFunX">
            Great for portraits.
          </Tool>
          <Tool title="Olympus M.Zuiko Digital ED 14-150mm F4.0-5.6 II Lens" href="https://amzn.to/4ghSn2N">
            More flexible than the lens above and better for travel, outdoor shooting, etc. If you buy one, buy this one, but both are great.
          </Tool>
          <Tool title="Manfrotto Chicago Camera Backpack" href="https://amzn.to/3VNFgyo">
            High quality and great for travel. Tons of well-thought-out compartments.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Cooking">
          <Tool title="Misono 10-Inch Chef's Knife" href="https://amzn.to/4fw40Ck">
            The most important tool in your kitchen. Get a good one and take care of it. I use this one.
          </Tool>
          <Tool title="Naniwa Grit #800 Sharpening Stone" href="https://amzn.to/3BCcsSp">
            The stand isn&apos;t important (you can use a wet towel), but be sure to go #800 grit as a beginner - good for sharpening, less so for honing.
          </Tool>
          <Tool title="Naniwa Whetsone" href="https://amzn.to/49M15Ei">
            Use this to flatten your sharpening stone&apos;s surface after each use.
          </Tool>
          <Tool title="Cutting board" href="https://amzn.to/3PlQI0B">
            Go big and bamboo here, you&apos;ll be surprised how much space you need.
          </Tool>
          <Tool title="Hexclad 12-Inch Fry Pan" href="https://amzn.to/4iExRv0">
            The price of this pan has gone way up since I bought mine. I use it almost every day and its non-stick claim is no joke, but maybe do your research and see if there&apos;s a better option.
          </Tool>

          <Tool title="Tramontina Gourmet 8-Piece Cookware Set" href="https://www.wayfair.com/kitchen-tabletop/pdp/tramontina-tri-ply-clad-gourmet-8-pc-cookware-set-ta1099.html">
            You need a good set of pots - I don&apos;t really use the pans. I don&apos;t think brand is super important, but here&apos;s what I use. Affordable and high quality.
          </Tool>
          <Tool title="Lodge Cast Iron Skillet" href="https://amzn.to/3VG6SFq">
            You&apos;ll need the higher sides of a 12&quot; skillet for a lot of recipes.
          </Tool>
          <Tool title="Lodge Dutch Oven" href="https://amzn.to/4gALolk">
            Great for soups, stews, braising, and even baking bread. Don&apos;t overspend.
          </Tool>
          <Tool title="Stainless Steel Fish Spatula" href="https://amzn.to/3OYmBMv">
            Flip yo&apos; shit. Make sure to go metal here and avoid the microplastic burn off into your food.
          </Tool>
          <Tool title="Set of Silicone Spatulas" href="https://amzn.to/49GTwys">
            You will use these every day. So handy.
          </Tool>
          <Tool title="Cleanblend 64oz Countertop Blender" href="https://amzn.to/3BwYO34">
            Better for liquids than a food processor. Smoothies, anything that needs to be aerated, etc. I&apos;ve had this blender for 10+ years. Great warranty and customer service.
          </Tool>
          <Tool title="Cuisinart 14-Cup Food Processor" href="https://amzn.to/4iyDt9Y">
            Better for solids than a blender. Hummus, anything requiring minced fresh vegetables, etc. I was initially doubtful but am now grateful I got a larger food processor.
          </Tool>
          <Tool title="InstantPot" href="https://amzn.to/408PThT">
            InstantPots are incredibly versatile and have plenty of extensions for different types of cooking. Use for rice, beans, soups, slow cooking meat, etc.
          </Tool>
          <Tool title="KitchenAid Standing Mixer" href="https://amzn.to/3P30EMa">
            Not necessary, but very helpful. Especially if you bake a lot.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Gardening">
          <Tool title="Auk Mini" href="https://us.auk.eco/">
            Beautiful, barebones indoor smart garden without any unecessary subscriptions.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Furballs">
          <Tool title="How to Introduce A Remote Collar to Your Dog" href="https://www.youtube.com/watch?v=OTUgYi-Rq2M">
            Tom Davis&apos; YouTube videos are a goldmine of educational content for novice dog trainers. You need to watch this before you start using a remote collar with your pup.
          </Tool>
          <Tool title="E-Collar Technologies miniEducator" href="https://amzn.to/3BCGJk3">
            Incredible tool to help you train your dog.
          </Tool>
        </ToolsSection>
        
        <ToolsSection title="Furballs">
          <Tool title="How to Introduce A Remote Collar to Your Dog" href="https://www.youtube.com/watch?v=OTUgYi-Rq2M">
            Tom Davis&apos; YouTube videos are a goldmine of educational content for novice dog trainers. You need to watch this before you start using a remote collar with your pup.
          </Tool>
          <Tool title="E-Collar Technologies miniEducator" href="https://amzn.to/3BCGJk3">
            Incredible tool to help you train your dog.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Do Not Recommend">
          <Tool title="Pipedream" href="https://www.pipedream.com">
            Quickly becoming commoditized product run by a negligent CEO and team.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
