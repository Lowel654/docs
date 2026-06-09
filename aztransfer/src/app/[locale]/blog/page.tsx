'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

export default function BlogPage() {
  const { t } = useTranslation();
  const posts = [
    { title: 'Top 10 Things to Do in Baku', date: 'June 1, 2025', excerpt: 'Discover the best attractions and experiences in Azerbaijan\'s capital city.' },
    { title: 'Airport Transfer Tips for Travelers', date: 'May 25, 2025', excerpt: 'Everything you need to know about getting from Heydar Aliyev Airport to the city.' },
    { title: 'Why Choose a Professional Transfer Service', date: 'May 18, 2025', excerpt: 'The benefits of booking a private transfer vs. regular taxi services.' },
  ];
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4 text-center">
          <h1 className="text-4xl font-bold">{t('blog.title')}</h1>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto grid gap-6">
            {posts.map((p) => (
              <article key={p.title} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="text-xs text-gray-500 mb-2">{p.date}</div>
                <h2 className="text-xl font-bold mb-2">{p.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
