import { PageShell } from '@/components/Chrome';
import { Eyebrow } from '@/components/PageHero';

export default function LegalPage() {
  return <PageShell>
    <section className="section bg-[var(--paper)]">
      <div className="container">
        <Eyebrow>Site information</Eyebrow>
        <h1 className="display mt-5">Terms &amp; notes.</h1>
        <div className="legal-content">
          <section id="terms">
            <h2>Terms of use</h2>
            <p>This website is provided to introduce Spaceworks Design &amp; Build and its services. You may view and share links to its content for personal, non-commercial use. Please do not copy, republish or use site content, imagery or brand assets commercially without permission.</p>
            <p>Website content is general information, not a quotation, appointment, or project agreement. Any work, fees, scope, schedule and responsibilities must be confirmed in a separate written agreement.</p>
          </section>
          <section id="disclaimer">
            <h2>Disclaimer</h2>
            <p>We take care to keep the information on this site useful and current, but it is provided as-is and may change. Concept artwork and illustrative visuals are for visual communication and may not represent completed projects or final construction documents.</p>
            <p>Project outcomes depend on the approved brief, site conditions, statutory requirements, consultant input and the agreed scope. Please seek project-specific advice before making decisions.</p>
          </section>
          <section id="credits">
            <h2>Credits &amp; rights</h2>
            <p>Website content and Spaceworks brand assets are presented by Spaceworks Design &amp; Build. Architectural illustrations and supplied sketch artwork are conceptual visuals. Curated reference photographs are from <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="legal-link">Unsplash</a> and are used under the Unsplash License; they illustrate design direction and are not Spaceworks commissions.</p>
            <p>Unless otherwise noted, all rights in Spaceworks name, logo and original website content are reserved. © 2026 Spaceworks Design &amp; Build. All rights reserved.</p>
          </section>
        </div>
      </div>
    </section>
  </PageShell>;
}
