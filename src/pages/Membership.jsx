import PageHero from '../components/common/PageHero';
import MembershipCard from '../components/MembershipCard';

export default function Membership() {
  return (
    <>
      <PageHero
        eyebrow="MEMBERSHIP · SUPPORT US"
        line1="JOIN"
        line2="US"
        size="clamp(4rem, 13vw, 12.5rem)"
        quote="Become part of a living heritage and service network."
        description="Members support research, outreach, publications, programs, volunteer coordination, and the patient work of helping families reconnect."
      />

      <section className="bg-cream py-20">
        <div className="container-pad">
          <div className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <span className="font-display text-base tracking-[0.2em] text-ink/28">MEMBERSHIP PLANS</span>
            <h2 className="font-display leading-tight text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Choose a membership that matches your commitment.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <MembershipCard
              id="lifetime"
              title="Life Time Membership"
              price="₹11,000"
              description="A long-term commitment for patrons, descendants, and supporters who want to sustain the foundation's core work."
              highlighted
              benefits={[
                'Lifetime recognition as a foundation member',
                'Invitations to heritage and publication events',
                'Priority access to Root Search guidance',
                'Annual impact updates and volunteer opportunities',
              ]}
            />
            <MembershipCard
              id="yearly"
              title="Yearly Membership"
              price="₹1,100"
              description="A flexible annual membership for volunteers, students, families, and community supporters."
              benefits={[
                'Annual member certificate',
                'Participation in local programs and workshops',
                'Newsletter and research updates',
                'Discounted seats for selected learning events',
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
