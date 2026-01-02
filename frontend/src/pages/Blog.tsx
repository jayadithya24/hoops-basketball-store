import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';

const Blog = () => {
  const { posts } = useBlog();

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Insights, tips, and stories from the world of basketball.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="card-tech group hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-muted/30 rounded-xl mb-4 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
