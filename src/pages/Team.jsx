import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import SectionHeading from '../components/common/SectionHeading';
import { images, team } from '../data/siteData';

export default function Team() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="People who combine research, fieldwork, and compassion."
        text="Our team is presented as a representative leadership structure for a modern foundation website and can be replaced with official profiles."
        image={images.about}
      />
      <section className="py-20">
        <div className="container-pad">
          <SectionHeading eyebrow="Leadership" title="Guided by service and cultural responsibility." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-saffron to-maroon font-display text-3xl font-bold text-light">
                  {member.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-primary">{member.name}</h3>
                <p className="mt-1 font-semibold text-primary">{member.role}</p>
                <p className="mt-3 leading-7 text-light/72">{member.focus}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
