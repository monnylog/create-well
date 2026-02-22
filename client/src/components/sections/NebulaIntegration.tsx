import { nebulaIntegrationPoints } from '@/lib/guest-experience-data';
import { Play, Film } from 'lucide-react';

export default function NebulaIntegration() {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-cream">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-sm uppercase tracking-widest text-terracotta mb-4">Content Archive</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-umber mb-6">Nebula Integration Points</h1>
          <p className="text-lg text-slate-700">
            Video moments that capture the Create Well experience for the team and future guests.
          </p>
        </div>

        {/* Integration Points */}
        <div className="space-y-4">
          {nebulaIntegrationPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-white border border-sage/20 rounded-lg hover:border-terracotta/30 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
                <Film className="w-5 h-5 text-terracotta" />
              </div>
              <div className="flex-1">
                <p className="text-slate-700">{point}</p>
              </div>
              <button className="flex-shrink-0 px-3 py-1 text-xs uppercase tracking-widest text-terracotta border border-terracotta/30 rounded hover:bg-terracotta/5 transition-colors">
                <Play className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Nebula CTA */}
        <div className="mt-12 p-8 bg-terracotta/5 border border-terracotta/20 rounded-lg text-center">
          <h3 className="text-2xl font-serif text-umber mb-4">Watch on Nebula</h3>
          <p className="text-slate-700 mb-6">
            Full behind-the-scenes content, guest testimonials, and the complete Create Well experience.
          </p>
          <a
            href="https://nebula.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-terracotta text-white rounded hover:bg-terracotta/90 transition-colors"
          >
            Visit Nebula
          </a>
        </div>
      </div>
    </section>
  );
}
