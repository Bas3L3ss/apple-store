import SupportHero from "../components/support/support-hero";
import SupportCards from "../components/support/support-cards";
import SupportFaq from "../components/support/support-faq";

export function Support() {
  return (
    <>
      <main className="  min-h-screen bg-gray-50">
        <SupportHero />

        <div className="container mx-auto px-4 py-12">
          <SupportCards />
          <SupportFaq />
        </div>
      </main>
    </>
  );
}
