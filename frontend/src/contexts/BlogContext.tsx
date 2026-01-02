import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'slug'>) => void;
  updatePost: (id: string, post: Omit<BlogPost, 'id' | 'slug'>) => void;
  deletePost: (id: string) => void;
  getPostBySlug: (slug: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Science Behind Our Grip Technology',
    slug: 'science-behind-grip-technology',
    excerpt: 'Discover how our proprietary grip technology provides unmatched control on the court.',
    content: `Our revolutionary grip technology is the result of years of research and development. Working closely with professional players, we've engineered a surface texture that maintains optimal grip in all conditions.

The micro-channel system embedded in each basketball creates thousands of contact points with your hands, ensuring consistent control whether you're driving to the basket or executing a precise pass.

Our grip technology adapts to different playing conditions - from indoor hardwood courts to outdoor concrete surfaces. The unique compound we use remains tacky without becoming sticky, giving you the confidence to make every play count.`,
    author: 'Dr. Sarah Chen',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Training Tips from Pro Players',
    slug: 'training-tips-pro-players',
    excerpt: 'Learn the techniques that professional athletes use to elevate their game.',
    content: `We sat down with several NBA players who use Hoops basketballs to get their best training advice.

"Ball handling is everything," says point guard Marcus Williams. "I spend at least 30 minutes every day just working on my dribbling skills. The Hoops Pro Series ball gives me the consistent feel I need to develop muscle memory."

Center James Rodriguez emphasizes the importance of fundamentals: "You can't skip the basics. Free throws, box outs, positioning - these are what separate good players from great ones."

Shooting guard Elena Martinez shares her pre-game routine: "I always warm up with light shooting, then gradually move back. The key is to get your body and mind synchronized before the game starts."`,
    author: 'Mike Thompson',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800',
    category: 'Training'
  },
  {
    id: '3',
    title: 'Sustainable Manufacturing: Our Commitment',
    slug: 'sustainable-manufacturing-commitment',
    excerpt: 'How Hoops is leading the industry in eco-friendly basketball production.',
    content: `At Hoops, we believe that great products shouldn't come at the expense of our planet. That's why we've invested heavily in sustainable manufacturing processes.

Our facilities run on 100% renewable energy, and we've reduced water usage by 60% through innovative recycling systems. The materials we use are carefully sourced from suppliers who share our environmental values.

We're also pioneering the use of recycled materials in our basketball construction. Our newest line incorporates recycled rubber and sustainable synthetic materials without compromising on performance.

By 2025, we aim to achieve carbon neutrality across all our operations. This isn't just good for the environment - it's good business. Our customers care about sustainability, and so do we.`,
    author: 'Lisa Park',
    date: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    category: 'Sustainability'
  }
];

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('hoops-blog-posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  useEffect(() => {
    localStorage.setItem('hoops-blog-posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<BlogPost, 'id' | 'slug'>) => {
    const newPost: BlogPost = {
      ...post,
      id: generateId(),
      slug: generateSlug(post.title),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (id: string, post: Omit<BlogPost, 'id' | 'slug'>) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...post, id, slug: generateSlug(post.title) }
          : p
      )
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const getPostBySlug = (slug: string) => {
    return posts.find((p) => p.slug === slug);
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost, getPostBySlug }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
