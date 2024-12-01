import type { APIRoute } from 'astro';
import { createClient } from 'redis';
import 'dotenv/config';

const REDIS_KEY = 'main_article';

export const GET: APIRoute = async () => {
  try {
    // Create Redis client
    const client = createClient({
      url: process.env.REDIS_URL
    });

    await client.connect();

    // Check if article exists in Redis
    let featuredArticle = await client.json.get(REDIS_KEY);

    if (true) { //(!featuredArticle) {
      // If not in Redis, use the default article
      featuredArticle = {
        title: "The Man Behind the Onchain Computer: Raz's Journey from $0.10 to a $100 Million Valuation",
        author: "WCJ Staff",
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        readTime: "8 min read",
        category: "Technology",
        location: "NEW YORK",
        content: [
          {
            type: 'text',
            text: "In the fast-paced world of blockchain innovation, few stories are as audacious—or as improbable—as the rise of Raz, the enigmatic CEO of Onchain Computer International. In less than a week, his company went from a single retro-inspired NFT to a valuation that turned heads across the financial and tech worlds. Now, with Christmas looming, Raz is looking to take the next step: delivering virtual \"onchain computers\" to homes across America."
          },
          {
            type: 'text',
            text: "In an exclusive interview with The Wall Street Journal, Raz explained how it all started with just 10 cents and a bold idea."
          },
          {
            type: 'quote',
            speaker: "Raz, your story sounds like the stuff of Silicon Valley legend. Walk us through those first steps.",
            text: "It's pretty simple, really. The way this works is, Onchain Computer International started with $0.10 as the initial capital. That's all you need to deploy an NFT on Base, Coinbase's layer-2 blockchain. Our first product was the \"Onchain Computer\"—a smiling, retro-style PC as an NFT. It wasn't just a piece of art; it was an idea. And the idea resonated. It sold out in a single day, generating $30,000 in ETH."
          },
          {
            type: 'text',
            text: "\"The rest happened in real time,\" said the self-proclaimed trillionaire."
          },
          {
            type: 'quote',
            speaker: "That's a staggering leap. What gave you the confidence to scale up so quickly?",
            text: "Selling out the NFT showed me there was real demand for the concept. It wasn't just about the nostalgia or the aesthetic—people believed in the vision. So I decided to take the company public in a way that's only possible in the blockchain world. I deployed the /onchain token and backed it with all $30,000 as liquidity. The rest happened in real time."
          },
          {
            type: 'quote',
            speaker: "What do you mean by 'the rest'?",
            text: "People were watching me do this onchain. It's all transparent. The token started with a valuation of a few hundred thousand dollars, but as interest grew, that valuation shot up to $100 million within two days. The market validated the concept, and Onchain Computer International hasn't looked back. We've continued selling these computers, both as NFTs and now in physical form, adding ETH to the liquidity pool as we go."
          },
          {
            type: 'quote',
            speaker: "Let's talk about those computers. What can people expect?",
            text: "While the technical specifications have been public from day one, the features remain a mystery to the public. That's intentional. It's part of the excitement, the allure of what we're building. But I'll say this: they're not just retro in appearance—they're designed to deliver a blend of virtual functionality and nostalgia. And we're committed to delivering them to homes across America before Christmas."
          },
          {
            type: 'quote',
            speaker: "Scaling virtual products from a blockchain-based origin sounds challenging. What's the strategy?",
            text: "The beauty of blockchain is that it creates community and demand simultaneously. We've already built a base of engaged customers who are invested in the product's success, both literally and figuratively. That base gives us momentum. On the operational side, we're leveraging the liquidity we've built up to ensure manufacturing and distribution meet the demand."
          },
          {
            type: 'quote',
            speaker: "What's next for Onchain Computer International?",
            text: "We're building an ecosystem, not just a product. The computers are only the beginning. The next chapter is about exploring what it means to be \"onchain\" in a tangible, everyday sense. These computers are part of that journey, and there's much more to come."
          },
          {
            type: 'quote',
            speaker: "There's been a lot of discussion about AI and decentralization. In terms of autonomy, decentralized inference seems to be a major challenge right now. What are your thoughts on this?",
            text: "There are a ton of challenges with decentralizing agent architectures right now. But that's what makes it exciting, right? We're building for the future here. You've got inference, data collection, storage, wallet management - these are all massive puzzles we need to solve. One thing I learned from Guild in the early days was to be pragmatic. We always focused on building things people would actually use, not just things that sound nice in theory. Right now, open-source models aren't quite there yet. So while decentralized inference would be amazing, we're going to work with centralized service providers for now because that's where the quality is. The onchain computers we're building are taking steps toward self-sovereignty. Maybe they're baby steps, like starting with a built-in, agentic Base indexer, but that's how all great journeys begin."
          },
          {
            type: 'text',
            text: "For now, Raz's focus remains on fulfilling his bold holiday promise. Whether Onchain Computer International delivers on its ambitions remains to be seen, but one thing is clear: Raz is proving that even the humblest beginnings can lead to extraordinary outcomes in the digital age."
          },
          {
            type: 'text',
            text: "As blockchain continues to reshape industries, Raz's story serves as a case study in what's possible when innovation, timing, and transparency collide."
          }
        ],
        featured: true
      };

      // Store in Redis
      await client.json.set(REDIS_KEY, '$', featuredArticle);
    }

    await client.disconnect();
    
    return new Response(JSON.stringify(featuredArticle), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Redis error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch article' }), {
      status: 500
    });
  }
} 