import { guestJourneySteps } from '@/lib/guest-experience-data';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function GuestJourney() {
  const [expandedStep, setExpandedStep] = useState<string | null>('step-1');

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-cream to-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-sm uppercase tracking-widest text-terracotta mb-4">Guest Experience</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-umber mb-6">Your evening, step by step</h1>
          <p className="text-lg text-slate-700 italic">
            "This is what it actually feels like to be a guest tonight. From the moment you step off the elevator onto the rooftop, to the moment you leave — a little different than when you arrived."
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {guestJourneySteps.map((step, index) => (
            <div key={step.id} className="border-l-4 border-terracotta pl-6 py-4">
              <button
                onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                className="w-full text-left hover:opacity-80 transition-opacity"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-sage mb-2">{step.timing}</div>
                    <h3 className="text-2xl font-serif text-umber mb-1">{step.title}</h3>
                    <div className="text-sm italic text-terracotta">{step.somaticMarker}</div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-terracotta transition-transform ${
                      expandedStep === step.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {expandedStep === step.id && (
                <div className="mt-4 pt-4 border-t border-sage/30">
                  <p className="text-slate-700 mb-4 leading-relaxed">{step.description}</p>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-sage mb-1">Emotional Arc</div>
                    <p className="text-slate-600">{step.emotionalArc}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
