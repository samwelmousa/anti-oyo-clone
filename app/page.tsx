import Hero from "@/components/home/Hero";
import { ShieldCheck, Zap, Globe, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Everything you need to <span className="text-red-600">Scale</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium">
              We've built the world's most efficient hotel engine. So you can focus on hospitality while we handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-amber-500" />}
              title="Mach 1 Performance"
              description="Built on Next.js 15 and Supabase for instantaneous page loads and real-time updates."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-green-500" />}
              title="Trust & Transparency"
              description="Detailed fee breakdowns and audit-proof financial snapshots for every single booking."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-blue-500" />}
              title="Global Reach"
              description="Localized pricing, multi-currency support, and edge-native deployment worldwide."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6 text-indigo-500" />}
              title="Smart Analytics"
              description="Powerful insights for owners and automated commission tracking for the platform."
            />
          </div>
        </div>
      </section>

      {/* Listing CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to list your property?</h2>
          <p className="text-gray-400 text-lg mb-10">Join 500+ hotel owners who have grown their revenue by 30% on average since joining our platform.</p>
          <a
            href="/dashboard/owner"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95 shadow-xl"
          >
            Start Listing Now
          </a>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
