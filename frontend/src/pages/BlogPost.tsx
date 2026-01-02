import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useBlog } from '@/contexts/BlogContext';
import { ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug } = useBlog();
  
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Layout>
      <article className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Back link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video bg-muted/30 rounded-2xl overflow-hidden mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground/90 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
