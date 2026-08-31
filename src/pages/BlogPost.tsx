import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  // Update document metadata for basic SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ChiffrePro`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.description);
      }
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "datePublished": post.date,
  };

  return (
    <main className="container mx-auto px-4 lg:px-8 py-24 max-w-[900px]">
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 font-medium transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Retour au blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <time className="text-slate-500 font-medium">
              {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
              <span className="text-slate-500 font-bold text-lg">CP</span>
            </div>
            <div>
              <p className="font-bold text-slate-900">{post.author}</p>
              <p className="text-sm text-slate-500">Expert en facturation</p>
            </div>
          </div>
        </header>

        <div 
          className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Prêt à simplifier votre facturation ?</h3>
          <p className="text-slate-600 mb-6">Testez ChiffrePro dès aujourd'hui et reprenez le contrôle de votre chiffre d'affaires.</p>
          <Link to="/#download" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
            Télécharger pour Windows
          </Link>
        </div>
      </motion.article>
    </main>
  );
}
