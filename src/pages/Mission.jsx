import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import SectionHeading from '../components/common/SectionHeading';
import { values, images } from '../data/siteData';

export default function Mission() {
  return (
    <>
      <PageHeader eyebrow="Our Mission" title="Preserve roots. Strengthen lives. Inspire future generations." text="Our mission is both cultural and practical: reconnect Girmitiya descendants with heritage while creating development programs that improve everyday life." image={images.roots} />
      <section className="py-20">
        <div className="container-pad">
          <SectionHeading eyebrow="How We Work" title="Principles that shape every program." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <Icon className="text-saffron" />
                  <h3 className="mt-4 font-display text-2xl font-bold text-earth">{item.title}</h3>
                  <p className="mt-3 leading-7 text-earth/80">{item.text}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
