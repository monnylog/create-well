// Geyser Planning Dashboard — All data models and initial data
// Design: Desert Dusk Command — Southwestern Minimalism

export type StatusTag = 'Idea' | 'Planning' | 'Flowing' | 'Needs Clarity' | 'Locked' | 'FLAGGED' | 'Not Started' | 'Needs Review' | 'Done' | 'Open';
export type SponsorStatus = 'Idea' | 'In Conversation' | 'Pitch Sent' | 'Verbal Yes' | 'Closed' | 'Passed';
export type InviteStatus = 'Not Yet' | 'Invited' | "RSVP'd Yes" | "RSVP'd No" | 'Waitlist';
export type Owner = 'Sunshine' | 'Bingle' | 'Monny' | 'CR8W' | 'TBD';
export type CategoryTag = 'Create' | 'Play!' | 'Dive' | 'Ground' | 'Express' | 'Connect';
export type StationType = 'Activation' | 'Workshop Sampler' | 'fr. the WELL';
export type PhaseStatus = 'Flowing' | 'Needs Clarity' | 'Locked';
export type VenueStatus = 'Pending' | 'Confirmed';

// ============================================================
// SECTION 1: GEYSER AT A GLANCE
// ============================================================
export interface GeyserOverview {
  eventName: string;
  date: string; // ISO date
  venue: string;
  venueStatus: VenueStatus;
  timeRange: string;
  capacityMin: number;
  capacityMax: number;
  revenueTarget: number;
  sponsorshipConfirmed: number;
  sponsorshipInConversation: number;
  instagramFollowers: number;
  followerTarget: number;
  pullQuote: string;
}

export const geyserOverview: GeyserOverview = {
  eventName: 'CR8W HARD LAUNCH',
  date: '2026-04-15',
  venue: 'Taverna Costera Rooftop',
  venueStatus: 'Pending',
  timeRange: '5:00 – 8:30 PM',
  capacityMin: 100,
  capacityMax: 200,
  revenueTarget: 10000,
  sponsorshipConfirmed: 0,
  sponsorshipInConversation: 0,
  instagramFollowers: 0,
  followerTarget: 500,
  pullQuote: "Show Create Well. Don't just tell them about it.",
};

// ============================================================
// SECTION 2: THE WELL — PHASE TIMELINE
// ============================================================
export interface Phase {
  id: string;
  name: string;
  timing: string;
  goal: string;
  owner: string;
  notes: string;
  status: PhaseStatus;
}

export const phases: Phase[] = [
  { id: 'arrive', name: 'ARRIVE', timing: '0–25 min', goal: 'De-frazzle. Ground. Orient.', owner: 'CR8W', notes: '', status: 'Flowing' },
  { id: 'welcome', name: 'WELCOME', timing: '~25 min mark', goal: 'Set the tone. This is different.', owner: 'Sunshine', notes: '', status: 'Flowing' },
  { id: 'tasting', name: 'TASTING MENU', timing: '30–90 min', goal: 'Experience Create Well viscerally.', owner: 'CR8W', notes: '', status: 'Needs Clarity' },
  { id: 'connect', name: 'CONNECT', timing: '~90 min mark', goal: 'Conversations sparked by shared experience.', owner: 'CR8W', notes: '', status: 'Flowing' },
  { id: 'fromthewell', name: 'FROM THE WELL', timing: '~110 min mark', goal: 'Deep connection. Emotional peak.', owner: 'CR8W', notes: '', status: 'Needs Clarity' },
  { id: 'closing', name: 'CLOSING RITUAL', timing: 'Final 15 min', goal: 'Leave inspired, energized, wanting more.', owner: 'Sunshine', notes: '', status: 'Needs Clarity' },
];

// ============================================================
// SECTION 3: ACTIVATION STATIONS
// ============================================================
export interface Station {
  id: string;
  name: string;
  lead: string;
  category: CategoryTag;
  type: StationType;
  timing: string;
  format: string;
  status: StatusTag;
  setupNeeds: string;
  coordinationNotes: string;
}

export const stations: Station[] = [
  {
    id: 'notes-well', name: 'Notes from the Well — Writing Station', lead: 'CR8W (Sunshine + Monny)',
    category: 'Connect', type: 'Activation', timing: 'Throughout', format: 'Branded cards, two vessels (The Well + The Spring), seeded before doors',
    status: 'Planning', setupNeeds: 'Branded cards, two vessels, prompt cards', coordinationNotes: 'Prompt card draft needed'
  },
  {
    id: 'painting', name: 'The Painting Station', lead: 'Gaia / Angel',
    category: 'Create', type: 'Activation', timing: 'Throughout', format: 'Supplies + single prompt card, permission to make a mess',
    status: 'Idea', setupNeeds: 'Art supplies, prompt card, protective covering', coordinationNotes: ''
  },
  {
    id: 'word-bank', name: "Elle's Word Bank Station", lead: 'Elle Hope',
    category: 'Play!', type: 'Workshop Sampler', timing: 'Throughout + mic moment', format: "Elle's book 'Word Bank' on display, single writing prompt",
    status: 'Idea', setupNeeds: 'Book display, writing materials, mic access', coordinationNotes: 'Book sales logistics TBD'
  },
  {
    id: 'human-design', name: 'Human Design Station', lead: 'Ilona Pamplona',
    category: 'Dive', type: 'Workshop Sampler', timing: 'Throughout + mic moment', format: '5-min lightning type reveal, "Hi, I\'m a _____" name tags',
    status: 'Idea', setupNeeds: 'Name tags, type cards, display materials', coordinationNotes: ''
  },
  {
    id: 'somatic', name: 'Somatic / Play Activation', lead: 'MBODY',
    category: 'Ground', type: 'Workshop Sampler', timing: 'TBD', format: 'TBD — something that gets people moving or laughing, a shared reset',
    status: 'Idea', setupNeeds: 'TBD', coordinationNotes: ''
  },
  {
    id: 'body-flow', name: 'Body Flow', lead: 'AYCE',
    category: 'Express', type: 'Workshop Sampler', timing: 'TBD', format: 'Body exploration to music in a safe, guided space',
    status: 'Idea', setupNeeds: 'Sound system, open floor space', coordinationNotes: ''
  },
  {
    id: 'live-podcast', name: 'CR8W Live Podcast / From the Well', lead: 'CR8W',
    category: 'Express', type: 'fr. the WELL', timing: '30–60 min', format: 'Live open forum, chill ambient convo flow',
    status: 'Planning', setupNeeds: 'Mics, seating arrangement, ambient lighting', coordinationNotes: ''
  },
  {
    id: 'choir', name: 'Impromptu Choir / Singalong', lead: 'TBD (Monny?)',
    category: 'Express', type: 'Activation', timing: 'TBD', format: 'MAYBE — group singalong moment',
    status: 'Idea', setupNeeds: 'TBD', coordinationNotes: ''
  },
  {
    id: 'closing-activity', name: 'Closing Activity', lead: 'CR8W',
    category: 'Play!', type: 'Activation', timing: 'Final slot', format: 'Something PLAYYYFULL — TBD',
    status: 'Idea', setupNeeds: 'TBD', coordinationNotes: ''
  },
];

// ============================================================
// SECTION 4: SPONSORSHIP TRACKER
// ============================================================
export interface SponsorTier {
  name: string;
  amount: string;
  limit: string;
}

export const sponsorTiers: SponsorTier[] = [
  { name: 'Title Sponsor', amount: '$5,000', limit: 'Limit 1' },
  { name: 'Community Champion', amount: '$2,500', limit: 'Limit 3' },
  { name: 'Creative Ally', amount: '$500–$1,500', limit: 'Open' },
  { name: 'In-Kind Partner', amount: 'Min $200 value', limit: 'Open' },
  { name: 'Raffle Prize Sponsor', amount: 'Grand / Featured / Community', limit: 'Open' },
];

export interface Sponsor {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  tier: string;
  amount: number;
  status: SponsorStatus;
  closedBy: Owner;
  notes: string;
  followUpDate: string;
}

export const sponsors: Sponsor[] = [];

// ============================================================
// SECTION 5: INVITE LIST & GUEST CURATION
// ============================================================
export type GuestCategory = 'Creatives / Artists / Makers' | 'Wellness Community' | 'Cultural Community Builders' | 'Burnt-Out Corporate Creatives' | 'Shadow Artists' | 'Aligned Entrepreneurs' | 'Venue Partners';

export interface Guest {
  id: string;
  name: string;
  handle: string;
  category: GuestCategory;
  connection: string;
  invitedBy: Owner;
  inviteStatus: InviteStatus;
  vip: boolean;
  notes: string;
}

export const guests: Guest[] = [];

// ============================================================
// SECTION 6: BHD SYNC TRACKER (from Google Calendar)
// ============================================================
export interface BHDSync {
  id: string;
  date: string;
  title: string;
  format: string;
  attendees: string[];
  location: string;
  momentumItems: string[];
  bucketsOpened: string[];
  bucketsClosed: string[];
  murkyWater: boolean;
  notesLink: string;
  calendarEventId: string;
  description: string;
}

export const bhdSyncs: BHDSync[] = [
  {
    id: 'bhd-jan31',
    date: '2026-01-31',
    title: 'BHD | Workshop Flow, Co-Hoe Catchup',
    format: 'In-Person Podyap',
    attendees: ['Monny', 'Sunshine'],
    location: 'Sunshine Digital Content Studios, 520 S Jones Blvd, Las Vegas',
    momentumItems: [
      'Individuwell updates / decomprocesses',
      'Lunar new year workshop',
      'Flow-work (hoes)',
      'Content intake — for Bingle',
      'Workshops / gatherings to set in stone (Feb–April)',
      'CR8W well building (exercises)',
    ],
    bucketsOpened: [
      'Feb–April workshop/gathering calendar',
      'Content intake pipeline for Bingle',
      'CR8W well building exercises',
    ],
    bucketsClosed: [],
    murkyWater: false,
    notesLink: '',
    calendarEventId: 'ijtipk89co50r5kn16gi2hol24',
    description: '1 HOUR PODYAP',
  },
  {
    id: 'bhd-feb19',
    date: '2026-02-19',
    title: 'BHD Video Brain(cell) Sync',
    format: 'Virtual',
    attendees: ['Monny', 'Sunshine'],
    location: 'Google Meet',
    momentumItems: [
      'Decomprocess Files (esp. for Vday shoot)',
      'CR8W Pitch kits',
      'Bingle: update on NYC / Jazz',
      'Sunshine: March–April overview / events, gatherings, podcast',
      'Sponsorship discussion',
      'HARD LAUNCH planning',
    ],
    bucketsOpened: [
      'Decomprocess files (esp. V-Day shoot)',
      'CR8W Pitch kits',
      'Sponsorship pipeline',
      'Hard Launch event planning',
    ],
    bucketsClosed: [],
    murkyWater: false,
    notesLink: '',
    calendarEventId: '14tb4b6n8ud56skucs1r4t0egk',
    description: 'WELLSHEETS! (1-3) — Individiwell check, CR8W questions, momentum items',
  },
  {
    id: 'bhd-feb25',
    date: '2026-02-25',
    title: 'BHD Co-Hoe Updates',
    format: 'Virtual',
    attendees: ['Monny', 'Sunshine'],
    location: 'Google Meet',
    momentumItems: [],
    bucketsOpened: [],
    bucketsClosed: [],
    murkyWater: false,
    notesLink: '',
    calendarEventId: '7lk23drug33u97g80hdc4sm23p',
    description: 'Upcoming sync — agenda TBD',
  },
];

// ============================================================
// SECTION 7: MASTER DELIVERABLES & COUNTDOWN
// ============================================================
export interface Deliverable {
  id: string;
  task: string;
  owner: string;
  due: string;
  status: StatusTag;
  blocking: boolean;
  notes: string;
}

export const deliverables: Deliverable[] = [
  { id: 'd1', task: 'Venue confirmation (Taverna Costera)', owner: 'Monny', due: 'ASAP', status: 'Needs Clarity', blocking: true, notes: 'Pending confirmation' },
  { id: 'd2', task: 'CR8W Pitch Kits', owner: 'Sunshine + Monny', due: 'Pre-launch', status: 'Flowing', blocking: false, notes: '' },
  { id: 'd3', task: 'Sponsorship package (separate doc)', owner: 'Monny', due: 'ASAP', status: 'Flowing', blocking: false, notes: '' },
  { id: 'd4', task: 'Feb–Apr workshop/gathering calendar', owner: 'Sunshine', due: 'Feb 25 BHD', status: 'Flowing', blocking: false, notes: '' },
  { id: 'd5', task: 'Decomprocess files (esp. V-Day shoot)', owner: 'Bingle', due: 'ASAP', status: 'Flowing', blocking: false, notes: '' },
  { id: 'd6', task: 'Collaborator coordination — Elle', owner: 'Sunshine / Monny', due: 'March', status: 'Idea', blocking: false, notes: '' },
  { id: 'd7', task: 'Collaborator coordination — Ilona', owner: 'Sunshine / Monny', due: 'March', status: 'Idea', blocking: false, notes: '' },
  { id: 'd8', task: 'Collaborator coordination — MBODY', owner: 'Sunshine / Monny', due: 'March', status: 'Idea', blocking: false, notes: '' },
  { id: 'd9', task: 'Collaborator coordination — AYCE', owner: 'Sunshine / Monny', due: 'March', status: 'Idea', blocking: false, notes: '' },
  { id: 'd10', task: 'Collaborator coordination — Gaia/Angel', owner: 'Sunshine / Monny', due: 'March', status: 'Idea', blocking: false, notes: '' },
  { id: 'd11', task: 'Notes from the Well — prompt copy', owner: 'Sunshine', due: 'March', status: 'Open', blocking: false, notes: '' },
  { id: 'd12', task: 'Instagram account launch + handle display', owner: 'Bingle', due: 'Pre-launch', status: 'Open', blocking: false, notes: '' },
  { id: 'd13', task: 'Email list sign-up integration (RSVP)', owner: 'Monny', due: 'March', status: 'Open', blocking: false, notes: '' },
  { id: 'd14', task: 'Raffle incentive / offer defined', owner: 'Sunshine + Monny', due: 'March', status: 'Open', blocking: false, notes: '' },
  { id: 'd15', task: 'Closing words / toast draft', owner: 'Sunshine', due: 'April', status: 'Open', blocking: false, notes: '' },
  { id: 'd16', task: 'Day-of run-of-show doc', owner: 'Monny', due: 'April 1', status: 'Not Started', blocking: true, notes: '' },
  { id: 'd17', task: 'Header date correction (March 31 vs April 15)', owner: 'Anyone', due: 'Immediate', status: 'FLAGGED', blocking: true, notes: 'Date discrepancy needs resolution' },
];

// ============================================================
// SECTION 8: OPS HORIZON — SUNSHINE AT SEA CONTINGENCY
// ============================================================
export interface OpsPhase {
  id: string;
  name: string;
  timeframe: string;
  summary: string;
  status: StatusTag;
  items: OpsItem[];
}

export interface OpsItem {
  id: string;
  category: string;
  task: string;
  owner: string;
  status: StatusTag;
  notes: string;
  critical: boolean;
}

export const opsHorizon = {
  context: 'Sunshine auditions for Virgin Voyages. If she books, she ships out sometime after April 15. CR8W Hard Launch happens, Sunshine holds the room as MC, and then she\'s gone — at sea, performing, likely with limited wifi, time zones shifting, no in-person presence in Las Vegas.',
  thesis: 'This is not a setback. This is a founding myth. The founder who launched, went to sea, and came back — and her community held the Well.',
  returnEvent: 'Back from the Well. Geyser 2.0.',
};

export const opsPhases: OpsPhase[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — Before She Leaves',
    timeframe: 'Now → April 15',
    summary: 'Everything that gets locked before she sails determines how well CR8W runs while she\'s away.',
    status: 'Flowing',
    items: [
      { id: 'op-1', category: 'Brand & Voice', task: 'Record Sunshine\'s welcome, opening ritual language, and CR8W philosophy on video', owner: 'Sunshine + Bingle', status: 'Not Started', notes: 'Evergreen content', critical: true },
      { id: 'op-2', category: 'Brand & Voice', task: 'Capture voice for email templates, community tone guide, onboarding language', owner: 'Sunshine', status: 'Not Started', notes: '', critical: true },
      { id: 'op-3', category: 'Brand & Voice', task: 'Build CR8W Brand Bible (vocabulary, visual standards, tone)', owner: 'CR8W', status: 'Not Started', notes: 'The Well, Individuwell, murky water, buckets, flow', critical: true },
      { id: 'op-4', category: 'Operations', task: 'Define who holds what (Monny: partnerships/ops, Bingle: docs/content, Community lead: engagement)', owner: 'CR8W', status: 'Idea', notes: '', critical: true },
      { id: 'op-5', category: 'Operations', task: 'Transfer Sunshine\'s key contacts (from DMs and head, not in any doc)', owner: 'Sunshine', status: 'Not Started', notes: '', critical: true },
      { id: 'op-6', category: 'Operations', task: 'Finalize pitch kit before she leaves (no approval needed per send)', owner: 'Sunshine + Monny', status: 'Flowing', notes: 'Already in progress', critical: true },
      { id: 'op-7', category: 'Legal & Financial', task: 'Business structure / operating agreement', owner: 'CR8W', status: 'Idea', notes: 'Even a simple one', critical: true },
      { id: 'op-8', category: 'Legal & Financial', task: 'Bank account, revenue access, signing authority', owner: 'Monny', status: 'Idea', notes: '', critical: true },
      { id: 'op-9', category: 'Legal & Financial', task: 'Sunshine\'s compensation structure for revenue generated while at sea', owner: 'CR8W', status: 'Idea', notes: 'She should still benefit from what she built', critical: false },
      { id: 'op-10', category: 'Community', task: 'Identify 2-3 community stewards who could hold space at future gatherings', owner: 'Sunshine', status: 'Idea', notes: 'Artist\'s Way Book Club community is most organized', critical: true },
    ],
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — Hard Launch',
    timeframe: 'April 15',
    summary: 'Sunshine is present. This is her night. She MCs, she holds the room, she IS Create Well in the flesh.',
    status: 'Planning',
    items: [
      { id: 'op-11', category: 'Capture', task: 'Bingle documents full event — energy, language, how guests respond', owner: 'Bingle', status: 'Planning', notes: 'Not just content, but energy', critical: true },
      { id: 'op-12', category: 'Capture', task: 'Record Sunshine\'s opening, Welcome moment, From the Well moments', owner: 'Bingle', status: 'Planning', notes: 'This footage becomes 6 months of content', critical: true },
      { id: 'op-13', category: 'Seed', task: 'Announce what\'s coming next (workshop series, digital Well space)', owner: 'Sunshine', status: 'Idea', notes: 'The launch should open the next loop, not close it', critical: true },
      { id: 'op-14', category: 'Seed', task: 'Give guests something to follow, join, return to', owner: 'CR8W', status: 'Idea', notes: 'Community channel / digital Well space', critical: false },
    ],
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — Sunshine at Sea',
    timeframe: 'April → ~October 2026',
    summary: 'What CR8W looks like in her absence. Her being away becomes a FEATURE, not a gap.',
    status: 'Idea',
    items: [
      { id: 'op-15', category: 'Community-Led', task: 'Template stations-based format (Geyser model) for community leads', owner: 'Monny', status: 'Idea', notes: 'Artist Way model already proved community can self-run', critical: true },
      { id: 'op-16', category: 'Digital Presence', task: '"Notes from the Sea" — Sunshine records short audio/video drops from ship', owner: 'Sunshine', status: 'Idea', notes: 'Her absence becomes the content arc', critical: true },
      { id: 'op-17', category: 'Digital Presence', task: 'Email newsletter on template (community stories, programming, note from Sunshine)', owner: 'Monny', status: 'Idea', notes: '', critical: false },
      { id: 'op-18', category: 'Workshops', task: 'Collaborator-led ticketed workshops under CR8W umbrella (revenue split)', owner: 'Monny', status: 'Idea', notes: 'Ilona, Elle, MBODY can run independently', critical: true },
      { id: 'op-19', category: 'Coverage', task: 'Identify guest MC / rotating host for in-person events', owner: 'CR8W', status: 'Idea', notes: 'Lyka Ferry, Amiri Dion, or rotating collective format', critical: true },
      { id: 'op-20', category: 'Coverage', task: 'Define decision-making protocol (what Monny decides vs. needs Sunshine)', owner: 'Monny + Sunshine', status: 'Idea', notes: 'Async consult via voice note during port days', critical: true },
    ],
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — Sunshine Returns',
    timeframe: '~October 2026',
    summary: 'She returns to a community that\'s been active, a workshop ecosystem with revenue, documented systems, and a founding myth.',
    status: 'Idea',
    items: [
      { id: 'op-21', category: 'Return', task: 'Return event: "Back from the Well. Geyser 2.0."', owner: 'CR8W', status: 'Idea', notes: 'The return event writes itself', critical: false },
      { id: 'op-22', category: 'Return', task: 'Content library and brand infrastructure handback', owner: 'Bingle', status: 'Idea', notes: '', critical: false },
    ],
  },
];

export const opsRisks = [
  { id: 'r1', risk: 'Sunshine IS the brand right now', mitigation: 'Programming continuity, digital presence, community activation', severity: 'high' as const },
  { id: 'r2', risk: 'Decision fatigue for Monny', mitigation: 'Community lead / steward role needs to be real and compensated', severity: 'high' as const },
  { id: 'r3', risk: 'Revenue gap after launch', mitigation: 'Workshop revenue split + second sponsor round in fall', severity: 'medium' as const },
  { id: 'r4', risk: 'Audition might not happen this cycle (ends March 15)', mitigation: 'This doc is still the ops foundation for any founder absence', severity: 'low' as const },
];

export const opsNextSteps = [
  { task: 'Bring this doc into BHD Co-Hoe sync as agenda foundation', due: 'Feb 25 BHD', owner: 'Monny' },
  { task: 'Align on what gets locked before April 15 vs. ship-side', due: 'Feb 25 BHD', owner: 'CR8W' },
  { task: 'Identify the community steward role — who, what, compensated how', due: 'March', owner: 'CR8W' },
  { task: 'Decide on Sunshine\'s CR8W role while at sea', due: 'March', owner: 'CR8W' },
  { task: 'Draft "Notes from the Sea" content concept as a real series', due: 'March', owner: 'Sunshine + Monny' },
];

// ============================================================
// HELPERS
// ============================================================
export function getDaysUntilLaunch(): number {
  const launch = new Date('2026-04-15T00:00:00');
  const now = new Date();
  const diff = launch.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Flowing':
    case 'Confirmed':
    case 'Locked':
    case 'Done':
      return 'bg-sage-light/40 text-sage border-sage/20';
    case 'Needs Clarity':
    case 'Needs Review':
    case 'Planning':
      return 'bg-gold/20 text-umber border-gold/30';
    case 'Idea':
    case 'Open':
    case 'Not Started':
      return 'bg-dusty-rose/20 text-plum border-dusty-rose/30';
    case 'FLAGGED':
      return 'bg-red-100 text-red-700 border-red-300';
    case 'In Conversation':
    case 'Pitch Sent':
      return 'bg-terracotta/10 text-terracotta border-terracotta/20';
    case 'Verbal Yes':
    case 'Closed':
      return 'bg-sage-light/40 text-sage border-sage/20';
    case 'Passed':
      return 'bg-muted text-muted-foreground border-border';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'Create': return 'bg-terracotta/15 text-terracotta';
    case 'Play!': return 'bg-gold/20 text-umber';
    case 'Dive': return 'bg-plum/15 text-plum';
    case 'Ground': return 'bg-sage/15 text-sage';
    case 'Express': return 'bg-dusty-rose/20 text-plum';
    case 'Connect': return 'bg-terracotta-light/20 text-terracotta';
    default: return 'bg-muted text-muted-foreground';
  }
}

export function getOwnerColor(owner: string): string {
  if (owner.includes('Sunshine')) return 'text-terracotta';
  if (owner.includes('Bingle')) return 'text-plum';
  if (owner.includes('Monny')) return 'text-sage';
  if (owner.includes('CR8W')) return 'text-umber';
  return 'text-muted-foreground';
}

// Count deliverables by owner
export function getDeliverablesByOwner(ownerName: string): Deliverable[] {
  return deliverables.filter(d => d.owner.toLowerCase().includes(ownerName.toLowerCase()));
}

// Get blocking items
export function getBlockingItems(): Deliverable[] {
  return deliverables.filter(d => d.blocking && d.status !== 'Done' && d.status !== 'Locked');
}

// Get flagged items
export function getFlaggedItems(): Deliverable[] {
  return deliverables.filter(d => d.status === 'FLAGGED');
}

// Get upcoming BHD syncs
export function getUpcomingSyncs(): BHDSync[] {
  const today = new Date().toISOString().split('T')[0];
  return bhdSyncs.filter(s => s.date >= today);
}

// Get past BHD syncs
export function getPastSyncs(): BHDSync[] {
  const today = new Date().toISOString().split('T')[0];
  return bhdSyncs.filter(s => s.date < today);
}
