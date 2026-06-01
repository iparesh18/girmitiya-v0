import { Search } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import { blogs, images } from '../data/siteData';

export default function Blog() {
  const categories = ['All', 'Heritage', 'Empowerment', 'Skill Development', 'Child Welfare'];
  return (
    <>
      <PageHeader eyebrow="Blog" title="Stories, research notes, and community reflections." text="Read about Girmitiya identity, social programs, and practical ideas from the field." image={images.publication} />
      <section className="py-20">
        <div className="container-pad">
          <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth/50" size={20} />
              <input className="w-full rounded-full border border-primary/12 bg-white/90 py-4 pl-12 pr-5 shadow-premium text-ink placeholder:text-earth/50 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Search articles" />
            </label>
            <div className="no-scrollbar flex gap-2 overflow-auto">
              {categories.map((category, index) => (
                <button key={category} className={`rounded-full px-5 py-3 text-sm font-bold transition ${index === 0 ? 'bg-primary text-light' : 'bg-white/70 text-earth border border-primary/12 hover:bg-primary/10 hover:text-primary'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>
          <article className="mb-10 grid overflow-hidden rounded-[2rem] bg-primary text-light shadow-premium lg:grid-cols-2">
            <img src={blogs[0].image} alt={blogs[0].title} className="h-full min-h-80 w-full object-cover" />
            <div className="p-8 sm:p-10">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-saffron">Featured Article</span>
              <h2 className="mt-4 font-display text-4xl font-bold">{blogs[0].title}</h2>
              <p className="mt-4 leading-8 text-light/76">{blogs[0].excerpt}</p>
              <Button to="/blog" variant="secondary" className="mt-7">Read Article</Button>
            </div>
          </article>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => <BlogCard key={post.title} post={post} />)}
          </div>
          <div className="mt-10 flex justify-center gap-2">
            {[1, 2, 3].map((page) => <button key={page} className={`grid h-11 w-11 place-items-center rounded-full font-bold transition ${page === 1 ? 'bg-primary text-light' : 'bg-white/70 border border-primary/12 text-earth hover:bg-primary/10 hover:text-primary'}`}>{page}</button>)}
          </div>
        </div>
      </section>
    </>
  );
}
