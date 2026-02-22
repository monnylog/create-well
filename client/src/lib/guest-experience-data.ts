// Create Well Guest Experience Dashboard
// Design: Desert Dusk Command — Southwestern Minimalism
// Content: Sunshine's POV video — guest journey mapping

export type SomaticMarker = 'Exhale' | 'Dissolve' | 'Shift' | 'Seen' | 'Remember' | 'Bridge' | 'Permission' | 'Alone' | 'Energized';
export type StationType = 'Writing' | 'Movement' | 'Creative' | 'Discovery' | 'Witness';

export interface GuestJourneyStep {
  id: string;
  stepNumber: number;
  title: string;
  timing: string;
  somaticMarker: string;
  description: string;
  emotionalArc: string;
  nebulaMoment?: string;
}

export interface ActivationStation {
  id: string;
  name: string;
  type: StationType;
  timing: string;
  facilitation: string;
  prompt: string;
  somaticOutcome: string;
  setup: string;
  nebulaMoment?: string;
}

export const dashboardTitle = "CREATE WELL DASHBOARD";
export const dashboardSubtitle = "Guest Experience Design";
export const eventDate = "2026-03-31";
export const eventVenue = "Taverna Costera Rooftop, Las Vegas NV";

export const pullQuote = "This is what it actually feels like to be a guest tonight. From the moment you step off the elevator onto the rooftop, to the moment you leave — a little different than when you arrived.";

export const marqueeStates = [
  'Connected', 'Inspired', 'Energized', 'At home', 'Awakened', 
  'Flowing', 'Refreshed', 'Present', 'Connected'
];

// ============================================================
// GUEST JOURNEY: 9-STEP EXPERIENCE
// ============================================================

export const guestJourneySteps: GuestJourneyStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'You step onto the rooftop.',
    timing: 'ARRIVAL · 0–25 MIN',
    somaticMarker: '→ You exhale for the first time all day.',
    description: 'Warm lighting. Music that feels like a deep breath. A team member hands you your Create Well welcome card — your personal guide to the evening. You see an easel with a painting in progress. A candle-lit writing corner. People already in conversation around a beautiful wooden box. You don\'t know exactly what you\'re walking into, but it doesn\'t feel like a networking event. It feels like a place.',
    emotionalArc: 'De-frazzle. Ground. Orient.',
    nebulaMoment: 'Behind-the-scenes setup'
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'You get your welcome card & bingo card.',
    timing: 'WELCOME CARD · FIRST 5 MIN',
    somaticMarker: '→ Now you know what to do. The anxiety dissolves.',
    description: 'Your welcome card is a simple, beautiful guide — it shows you the five activation stations, suggests a gentle flow for the evening, and explains Notes from the Well. You also receive a blank bingo card. Your challenge: fill it by collecting experiences, finding other Human Design types, and exploring every corner of the rooftop. Prizes for bingo. No pressure. Just play.',
    emotionalArc: 'Set the tone. This is different.',
    nebulaMoment: 'Welcome card design reveal'
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'You find the writing station.',
    timing: 'NOTES FROM THE WELL · OPEN ALL EVENING',
    somaticMarker: '→ You\'re holding a stranger\'s truth. Something shifts.',
    description: 'A single prompt card sits on the table. You sit down, read it. Something surfaces — a thought, a memory, a feeling you didn\'t know was there. You write it down on a beautiful branded card. You fold it and drop it in The Well. Then you reach into The Spring and pull a card someone else wrote. You carry their words in your pocket for the rest of the evening.',
    emotionalArc: 'Vulnerability meets witness. Exchange.',
    nebulaMoment: 'Prompt card concepts'
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'You discover your creative type.',
    timing: 'HUMAN DESIGN TENT · TASTING MENU WINDOW',
    somaticMarker: '→ You feel seen without having said a word.',
    description: 'In a 5-minute lightning round, the Human Design collaborator breaks down all five types — but for creatives. How you generate ideas. Why you work in bursts or marathons. Why you burn out the way you do. You find your type. You get a little badge for your nametag. Suddenly the person next to you says "wait, I\'m a Generator too" and you\'re in a conversation you didn\'t expect to have.',
    emotionalArc: 'Experience viscerally. Find your people.',
    nebulaMoment: 'Human Design explainer video'
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'You pick up a brush.',
    timing: 'PAINTING STATION · ANYTIME',
    somaticMarker: '→ You forgot what this felt like. Making something just because.',
    description: 'There\'s no instruction. A prompt card says something like "paint what rest looks like." You haven\'t painted since college. You do it anyway. It\'s terrible and you love it. The person next to you laughs at their own canvas and you laugh too and that\'s how you end up in a 20-minute conversation with someone you never would have met any other way.',
    emotionalArc: 'Permission to create. Joy of making.',
    nebulaMoment: 'Guest testimonials (painting moment)'
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'You write one line.',
    timing: 'ELLE\'S WORD BANK STATION · ANYTIME',
    somaticMarker: '→ Language becomes a bridge back to yourself.',
    description: 'Elle is a Las Vegas poet who just released her book Word Bank. Her station has a prompt pulled from her work — a single word to write around. You write one line. Just one. It takes 30 seconds and it\'s the most honest thing you\'ve said all week. Her book is on the table and you flip through it and end up buying one.',
    emotionalArc: 'Language as reclamation. Honesty.',
    nebulaMoment: 'Elle\'s poetry reading (Nebula)'
  },
  {
    id: 'step-7',
    stepNumber: 7,
    title: 'You\'re actually talking to strangers — and loving it.',
    timing: 'CREATE WELL BINGO · THROUGHOUT EVENING',
    somaticMarker: '→ The bingo card gave you permission to wander. You did.',
    description: 'Your bingo card has sent you across the rooftop. You found a Projector (they guided you to the writing station). You found a fellow Manifesting Generator (they dragged you to the painting table). You\'ve visited three stations. You wrote a note. You have one more square to fill — "share something you created tonight" — and you\'re actually considering it.',
    emotionalArc: 'Conversations sparked by shared experience.',
    nebulaMoment: 'Bingo challenge mechanics'
  },
  {
    id: 'step-8',
    stepNumber: 8,
    title: 'Someone reads your words aloud.',
    timing: 'FROM THE WELL · ~110 MIN MARK',
    somaticMarker: '→ You feel less alone than you have in a long time.',
    description: 'Sunshine gathers the room. She invites people who received a note from The Spring to read a line that stayed with them and say something back to the anonymous writer. You wrote something vulnerable. You dropped it in. Someone reads it now, across the rooftop. You don\'t say anything. You just listen. The room is very quiet and very warm.',
    emotionalArc: 'Deep connection. Emotional peak. Witness.',
    nebulaMoment: 'Collective witness moment (video)'
  },
  {
    id: 'step-9',
    stepNumber: 9,
    title: 'Elle reads. Sunshine toasts. You stay.',
    timing: 'CLOSING RITUAL · FINAL 15 MIN',
    somaticMarker: '→ You leave energized. You leave inspired. You\'re already looking for the next one.',
    description: 'Elle performs a single poem about reclaiming the thing you abandoned. Sunshine closes with a vision — what Create Well is building, where it\'s going, and how tonight was just the first page. There\'s a toast. Music comes back up. And you don\'t leave right away because something in you doesn\'t want this to end just yet.',
    emotionalArc: 'Leave inspired, energized, wanting more.',
    nebulaMoment: 'Elle\'s closing poem + Sunshine\'s vision (Nebula)'
  },
];

// ============================================================
// ACTIVATION STATIONS: 5 CORE
// ============================================================

export const activationStations: ActivationStation[] = [
  {
    id: 'station-well',
    name: 'Notes from The Well',
    type: 'Writing',
    timing: 'Open all evening',
    facilitation: 'Solo or paired. Self-guided.',
    prompt: 'Single prompt card (e.g., "What are you ready to release?")',
    somaticOutcome: 'Vulnerability. Witness. Exchange.',
    setup: 'Two vessels (The Well + The Spring), branded cards, seeded prompts',
    nebulaMoment: 'Behind-the-scenes card design'
  },
  {
    id: 'station-human-design',
    name: 'Human Design Tent',
    type: 'Discovery',
    timing: 'Lightning rounds throughout',
    facilitation: 'Ilona Pamplona leads 5-min type breakdowns',
    prompt: 'How do you generate ideas? Why do you burn out? Find your type.',
    somaticOutcome: 'Seen. Recognized. Instant connection.',
    setup: 'Type cards, name tag badges, seating',
    nebulaMoment: 'Type explainer video'
  },
  {
    id: 'station-painting',
    name: 'The Painting Station',
    type: 'Creative',
    timing: 'Anytime',
    facilitation: 'Gaia / Angel. No instruction.',
    prompt: 'Paint what rest looks like. No rules.',
    somaticOutcome: 'Permission. Joy. Unexpected connection.',
    setup: 'Art supplies, protective covering, single prompt card',
    nebulaMoment: 'Guest testimonial (painting moment)'
  },
  {
    id: 'station-word-bank',
    name: 'Elle\'s Word Bank Station',
    type: 'Writing',
    timing: 'Anytime + mic moment',
    facilitation: 'Elle Hope. Single word prompt.',
    prompt: 'Write one line. Just one.',
    somaticOutcome: 'Language as bridge. Honesty.',
    setup: 'Book display, writing materials, mic access',
    nebulaMoment: 'Elle\'s poetry reading (Nebula)'
  },
  {
    id: 'station-bingo',
    name: 'Create Well Bingo',
    type: 'Discovery',
    timing: 'Throughout evening',
    facilitation: 'Self-guided exploration',
    prompt: 'Find experiences, Human Design types, explore every corner',
    somaticOutcome: 'Permission to wander. Serendipity.',
    setup: 'Blank bingo cards, prizes, clear instructions',
    nebulaMoment: 'Bingo mechanics explainer'
  },
];

// ============================================================
// DESIGN ELEMENTS & FRAMEWORK
// ============================================================

export const designElements = {
  welcomeCard: {
    purpose: 'Personal guide to the evening',
    contains: ['5 activation stations', 'Suggested gentle flow', 'Notes from the Well explanation'],
    design: 'Simple, beautiful, branded'
  },
  bingoCard: {
    purpose: 'Guided exploration + experience collection',
    challenges: [
      'Collect experiences (visit stations)',
      'Find other Human Design types',
      'Explore every corner of the rooftop',
      'Share something you created tonight'
    ],
    tone: 'No pressure. Just play.'
  },
  theWellAndSpring: {
    theWell: 'Drop in written vulnerability',
    theSpring: 'Pull out someone else\'s truth',
    outcome: 'Carry their words in your pocket all evening'
  },
};

export const teamRoles = {
  sunshine: 'Host, closer, vision keeper, MC',
  monny: 'Overall design, facilitation, somatic framework',
  elle: 'Poet, station facilitator, closing performance',
  ilona: 'Human Design collaborator, type discovery',
  bingle: 'Content, documentation, video',
  ayce: 'Video production, behind-the-scenes',
  gaia: 'Painting station facilitation',
};

export const nebulaIntegrationPoints = [
  'Behind-the-scenes setup/breakdown',
  'Welcome card design reveal',
  'Prompt card concepts',
  'Human Design explainer video',
  'Guest testimonials (painting moment)',
  'Elle\'s poetry reading',
  'Bingo challenge mechanics',
  'Collective witness moment',
  'Elle\'s closing poem + Sunshine\'s vision',
];
