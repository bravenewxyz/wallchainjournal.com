import type { APIRoute } from 'astro';
import { createClient } from 'redis';
import 'dotenv/config';

const REDIS_KEY = 'secondary_articles';

export const GET: APIRoute = async () => {
  try {
    // Create Redis client
    const client = createClient({
      url: process.env.REDIS_URL
    });

    await client.connect();

    // Check if articles exist in Redis
    let secondaryArticles = await client.json.get(REDIS_KEY);

    if (!secondaryArticles) {
      // If not in Redis, use the default articles
      secondaryArticles = [
        {
          title: "Market Surges as Military Base Penguin Makes Daring Escape",
          author: "Jane Smith",
          category: "Markets",
          readTime: "4 min read",
          content: `
In an unprecedented turn of events, global markets experienced an unexpected rally following news of a peculiar incident at the McMurdo Station in Antarctica. A particularly clever Adelie penguin, nicknamed "Agent P" by base personnel, managed to breach security protocols and access the station's main communications center, causing a brief disruption in international weather monitoring systems.

The S&P 500 surged 2.3% on the news, with crypto markets following suit in what analysts are calling the "Penguin Rally." Trading algorithms, apparently triggered by the unusual combination of keywords in news feeds, initiated a cascade of buy orders across major exchanges.

"Sometimes the market just needs a good story," said Mark Thompson, chief market strategist at Goldman Sachs. "This penguin has done more for market sentiment than any Fed announcement this quarter."

The penguin was last seen waddling towards the coast, reportedly carrying what appeared to be a USB drive. Military officials have declined to comment on the contents of the drive, stating only that their primary concern is the "operational security implications of sophisticated penguin infiltration techniques."
`
        },
        {
          title: "DeFi Protocol Claims AI Integration, Actually Just Using ChatGPT",
          author: "Hugh Jass",
          category: "Technology",
          readTime: "3 min read",
          content: `
In a revealing investigation, the Wall Chain Journal discovered that prominent DeFi protocol SafeYield's claimed "revolutionary AI system" was simply ChatGPT behind a fancy frontend. Furthermore, deeper investigation revealed an even more startling truth: SafeYield has no human employees at all. The entire operation, from customer support to protocol maintenance, is run by a sophisticated network of AI agents powered by ChatGPT.

"We were initially disappointed to find they weren't using proprietary AI," said lead investigator Hugh Jass. "But then we realized we were actually witnessing something far more impressive – the first fully autonomous company run entirely by AI. They even have AI agents scheduling Zoom meetings with other AI agents to maintain appearances."

When reached for comment, SafeYield's AI CEO responded with suspiciously well-formatted markdown and insisted on providing code examples to explain their business model.
`
        },
        {
          title: "NFT Trading Volumes Spike After Collector Accidentally Fat-Fingers Purchase",
          author: "Ligma Johnson",
          category: "Markets",
          readTime: "3 min read",
          content: `
A mistaken decimal point led to a $3.2M purchase of a CryptoPunk, triggering a market-wide FOMO event in the NFT space. The buyer, who wished to remain anonymous but is known in crypto circles as "DogeWhaleGod420," claims they were trying to buy lunch on UberEats when their phone accidentally opened their NFT trading app.

"I was just trying to order a $32 burger," they explained. "Next thing I know, my thumb slipped and I'm the proud owner of a CryptoPunk wearing a beanie. I don't even like beanies."

On first reports of the news, local burger shops started raising their prices to $3 million in hope of a repeated incident.

"We've upgraded our payment terminals to automatically open MetaMask," explained Bob Wilson, owner of Bob's Burgers. "It's just good business."

DogeWhaleGod420 has since turned down multiple interview requests but was last seen developing a new hardware wallet with extra-large buttons, marketed specifically for "traders with unusually wide thumbs."
`
        }
      ];

      // Store in Redis
      await client.json.set(REDIS_KEY, '$', secondaryArticles);
    }

    await client.disconnect();
    
    return new Response(JSON.stringify(secondaryArticles), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Redis error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch secondary articles' }), {
      status: 500
    });
  }
}; 