import { activationStations } from '@/lib/guest-experience-data';
import { Palette, Zap, BookOpen, Lightbulb, Grid3x3 } from 'lucide-react';

const typeIcons = {
  Writing: BookOpen,
  Movement: Zap,
  Creative: Palette,
  Discovery: Lightbulb,
  Witness: Grid3x3,
};

export default function ActivationStationsDetail() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-sm uppercase tracking-widest text-terracotta mb-4">Activation Stations</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-umber mb-6">
            Five ways to <span className="italic text-terracotta">experience</span> the well
          </h1>
          <p className="text-lg text-slate-700">Every station is open all evening. No order. No pressure. Follow what calls you.</p>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activationStations.map((station) => {
            const Icon = typeIcons[station.type as keyof typeof typeIcons];
            return (
              <div
                key={station.id}
                className="bg-cream border border-sage/20 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-umber mb-1">{station.name}</h3>
                    <div className="text-xs uppercase tracking-widest text-sage">{station.timing}</div>
                  </div>
                  {Icon && <Icon className="w-6 h-6 text-terracotta flex-shrink-0" />}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-sage mb-1">Facilitation</div>
                    <p className="text-sm text-slate-700">{station.facilitation}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-sage mb-1">Prompt</div>
                    <p className="text-sm text-slate-700 italic">{station.prompt}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-sage mb-1">Somatic Outcome</div>
                    <p className="text-sm text-slate-700">{station.somaticOutcome}</p>
                  </div>
                  <div className="pt-4 border-t border-sage/20">
                    <div className="text-xs uppercase tracking-widest text-sage mb-2">Setup</div>
                    <p className="text-xs text-slate-600">{station.setup}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
