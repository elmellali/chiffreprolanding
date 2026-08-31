import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData';

export default function Blog() {
  return (
    <main className="container mx-auto px-4 lg:px-8 py-24 max-w-[1200px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Le Blog de ChiffrePro</h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl">
          Découvrez nos articles, guides et conseils pour optimiser la gestion de votre entreprise, automatiser votre facturation et booster votre croissance.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-slate-500">
                    {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                  <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-slate-600 mb-6 line-clamp-3 flex-grow">
                  {post.description}
                </p>
                <Link to={`/blog/${post.slug}`} className="text-primary font-bold hover:underline mt-auto inline-flex items-center gap-1">
                  Lire l'article
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
