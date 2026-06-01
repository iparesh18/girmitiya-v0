import AnimatedContainer from './AnimatedContainer';

export default function SectionHeading({ eyebrow, title, text, align = 'center', titleClassName = '', titleStyle }) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto';
  return (
    <AnimatedContainer className={`mb-10 flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-3 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.26em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-balance font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] text-primary ${titleClassName}`}
        style={titleStyle}
      >
        {title}
      </h2>
      {text && <p className="mt-4 max-w-2xl text-[18px] leading-[1.8] text-earth/80">{text}</p>}
    </AnimatedContainer>
  );
}
