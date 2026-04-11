import { parse } from 'node-html-parser';

export interface BlogPost {
  title: string;
  href: string;
  image: string;
  category: string;
}

export async function fetchLatestBlogs(count = 1): Promise<BlogPost[]> {
  try {
    const res = await fetch('https://www.homeguruworld.com/blogs/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const html = await res.text();
    const root = parse(html);

    const posts: BlogPost[] = [];

    // Try common WordPress blog card selectors
    const cards = root.querySelectorAll('article, .post, .blog-post, .entry, [class*="post-"], [class*="blog-card"]');

    for (const card of cards) {
      if (posts.length >= count) break;

      const titleEl = card.querySelector('h2, h3, h1, .entry-title, .post-title');
      const linkEl = card.querySelector('a');
      const imgEl = card.querySelector('img');
      const catEl = card.querySelector('.category, .cat, [class*="category"], [class*="tag"]');

      const title = titleEl?.text?.trim();
      const href = linkEl?.getAttribute('href') || 'https://www.homeguruworld.com/blogs/';
      const image = imgEl?.getAttribute('src') || imgEl?.getAttribute('data-src') || '';
      const category = catEl?.text?.trim() || 'Blog';

      if (title && title.length > 5) {
        posts.push({ title, href, image, category });
      }
    }

    // Fallback if nothing found
    if (posts.length === 0) {
      posts.push({
        title: 'Latest from HomeGuru',
        href: 'https://www.homeguruworld.com/blogs/',
        image: '',
        category: 'Blog',
      });
    }

    return posts.slice(0, count);
  } catch {
    return [{
      title: 'Latest from HomeGuru',
      href: 'https://www.homeguruworld.com/blogs/',
      image: '',
      category: 'Blog',
    }];
  }
}
