import { Quote } from 'lucide-react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { testimonials } from '../data/siteData';

export default function TestimonialSlider() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
      loop
      grabCursor
      speed={800}
      spaceBetween={24}
      breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
      className="pb-12"
    >
      {testimonials.map((item) => (
        <SwiperSlide key={item.name}>
          <article className="h-full rounded-[1.4rem] border border-primary/20 bg-darker/90 p-6 shadow-premium transition hover:border-primary/30">
            <Quote className="text-saffron" />
            <p className="mt-4 text-sm leading-6 text-white">“{item.quote}”</p>
            <div className="mt-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-light/55">Community Voice</p>
              <p className="mt-2 font-semibold text-light">{item.name}</p>
              <p className="text-xs text-light/60">{item.role}</p>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
