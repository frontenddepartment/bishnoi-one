/* ==========================================================================
   Bishnoi One — marketing site content
   Every string the site renders lives here so copy can change without
   touching a component.
   ========================================================================== */

export const products = [
  {
    id: 'inventory',
    name: 'Inventory',
    short: 'Inventory',
    tagline: 'Always know what is in stock',
    icon: 'board',
    logo: '/Inventory.png',
    accent: 'blue',
    menuBlurb: 'Stock, orders and fulfilment in one place',
    headline: 'Every item and order, from shelf to doorstep',
    description:
      'Know what is in stock, what is on order and what is running late before the customer calls. Bishnoi One keeps stock and fulfilment moving without a spreadsheet in sight.',
    bullets: [
      'Live stock levels across every warehouse and branch',
      'One queue for online, phone and in-store orders',
      'Reorder alerts before a shelf runs empty',
    ],
    stat: { value: '98%', label: 'of orders delivered on time' },
  },
  {
    id: 'people',
    name: 'People',
    short: 'People',
    tagline: 'One record per person',
    icon: 'people',
    logo: '/People.png',
    accent: 'green',
    menuBlurb: 'Employee records, onboarding and time off',
    headline: 'Give every new hire a great first week',
    description:
      'From the offer letter to the one-year review, Bishnoi One carries the whole employee record, so nothing falls through the cracks between HR, IT and the hiring manager.',
    bullets: [
      'Onboarding plans that start themselves on day one',
      'Time off, documents and reviews in a single record',
      'Reminders that reach the right manager, not a shared inbox',
    ],
    stat: { value: '6 hrs', label: 'saved per new hire, every time' },
  },
  {
    id: 'crm',
    name: 'CRM',
    short: 'CRM',
    tagline: 'Close more, chase less',
    icon: 'pipeline',
    logo: '/CRM.png',
    accent: 'violet',
    menuBlurb: 'Contacts, pipeline and revenue forecasting',
    headline: 'Your pipeline, finally in focus',
    description:
      'Every deal, contact and follow-up in one place. Bishnoi One CRM keeps the next step obvious, so your reps spend the day selling instead of updating records.',
    bullets: [
      'Deal stages that match how your team actually sells',
      'Follow-ups scheduled the moment a stage changes',
      'Forecasts that update themselves, every night',
    ],
    stat: { value: '32%', label: 'shorter sales cycle on average' },
  },
  {
    id: 'analytics',
    name: 'Analytics',
    short: 'Analytics',
    tagline: 'Every number, live',
    icon: 'chart',
    logo: '/Analytics.png',
    accent: 'coral',
    menuBlurb: 'Live dashboards and reports across every system',
    headline: 'One dashboard for the whole company',
    description:
      'Analytics reads straight from the other seven systems, so sales, stock, people, cash and support sit on one screen, and the numbers are already up to date when you open it.',
    bullets: [
      'Ready-made dashboards for every department',
      'Reports that pull from all eight systems at once',
      'Scheduled summaries sent to leadership each morning',
    ],
    stat: { value: '0', label: 'spreadsheets stitched together by hand' },
  },
  {
    id: 'books',
    name: 'Books',
    short: 'Books',
    tagline: 'Bookkeeping, done daily',
    icon: 'board',
    logo: '/Books.png',
    accent: 'yellow',
    menuBlurb: 'Invoices, bills and day-to-day bookkeeping',
    headline: 'Invoices out, bills paid, books balanced',
    description:
      'Every sale from Inventory and CRM becomes an invoice automatically, and every bill is matched as it arrives, so month-end close takes hours instead of days.',
    bullets: [
      'Invoices raised the moment an order ships',
      'Bills and receipts matched to payments automatically',
      'Tax-ready ledgers that are always up to date',
    ],
    stat: { value: '3 days', label: 'faster month-end close' },
  },
  {
    id: 'finance',
    name: 'Finance',
    short: 'Finance',
    tagline: 'Plan with confidence',
    icon: 'chart',
    logo: '/Finance.png',
    accent: 'leaf',
    menuBlurb: 'Budgets, cash flow and financial planning',
    headline: 'Budgets and cash flow you can plan around',
    description:
      'Set budgets per department, watch spending against them as it happens, and see cash flow weeks ahead, built from the real numbers in Books.',
    bullets: [
      'Department budgets tracked against actual spend',
      'Cash flow forecasts that look weeks ahead',
      'Approvals that route spend to the right person',
    ],
    stat: { value: '13 wks', label: 'of cash flow visible ahead' },
  },
  {
    id: 'workdrive',
    name: 'WorkDrive',
    short: 'WorkDrive',
    tagline: 'Every file, one shared drive',
    icon: 'board',
    logo: '/WorkDrive.png',
    accent: 'violet',
    menuBlurb: 'Shared files, folders and document control',
    headline: 'Every file your team needs, in one shared drive',
    description:
      'Contracts, price lists, payslips and invoices land in the right team folder on their own, so everyone works from the latest version and nobody digs through email attachments again.',
    bullets: [
      'Team folders with access set by role, not by hand',
      'Version history on every file, with one-click restore',
      'Documents from the other systems filed automatically',
    ],
    stat: { value: '30 days', label: 'of version history on every file' },
  },
  {
    id: 'desk',
    name: 'Desk',
    short: 'Desk',
    tagline: 'Support that never drops a ticket',
    icon: 'people',
    logo: '/desk.png',
    accent: 'blue',
    menuBlurb: 'Customer support tickets and help desk',
    headline: 'Answer every customer, with their whole story in view',
    description:
      'Emails, calls and chats become tickets in one queue, and each one shows the customer’s orders, invoices and past conversations, so your team answers the first time.',
    bullets: [
      'One queue for email, phone and chat requests',
      'Order and invoice history beside every ticket',
      'Escalations that reach the right team before a deadline slips',
    ],
    stat: { value: '2x', label: 'faster first reply to customers' },
  },
]

/* The eight Bishnoi One systems, one per logo in public/. Drives the Products
   menu (desktop mega menu and mobile drawer). */
export const systems = [
  { id: 'inventory', name: 'Inventory', logo: '/Inventory.png', href: '#/systems/inventory', blurb: 'Stock, orders and fulfilment in one place' },
  { id: 'people', name: 'People', logo: '/People.png', href: '#/systems/people', blurb: 'Employee records, onboarding and time off' },
  { id: 'crm', name: 'CRM', logo: '/CRM.png', href: '#/systems/crm', blurb: 'Contacts, pipeline and revenue forecasting' },
  { id: 'analytics', name: 'Analytics', logo: '/Analytics.png', href: '#/systems/analytics', blurb: 'Live dashboards and reports across every system' },
  { id: 'books', name: 'Books', logo: '/Books.png', href: '#showcase-books', blurb: 'Invoices, bills and day-to-day bookkeeping' },
  { id: 'finance', name: 'Finance', logo: '/Finance.png', href: '#showcase-finance', blurb: 'Budgets, cash flow and financial planning' },
  { id: 'workdrive', name: 'WorkDrive', logo: '/WorkDrive.png', href: '#showcase-workdrive', blurb: 'Shared files, folders and document control' },
  { id: 'desk', name: 'Desk', logo: '/desk.png', href: '#showcase-desk', blurb: 'Customer support tickets and help desk' },
]

export const platformMenu = [
  { icon: 'automation', grad: ['#e57a44', '#251351'], title: 'Automations', slug: 'automations', blurb: 'If this happens, Bishnoi One does that. No code.' },
  { icon: 'chart', grad: ['#02c3bd', '#4e148c'], title: 'Dashboards', slug: 'dashboards', blurb: 'Live numbers your leadership team trusts.' },
  { icon: 'sparkle', grad: ['#ffc145', '#ec368d'], title: 'Bishnoi One AI', slug: 'ai', blurb: 'Drafts, summaries and next-step suggestions.' },
  { icon: 'puzzle', grad: ['#414288', '#b0db43'], title: 'Integrations', slug: 'integrations', blurb: '200+ tools connected in a couple of clicks.' },
  { icon: 'shield', grad: ['#007cbe', '#5fd3c4'], title: 'Security', slug: 'security', blurb: 'SOC 2 Type II, SSO and regional data storage.' },
  { icon: 'globe', grad: ['#629460', '#f4d35e'], title: 'Bishnoi One Mobile', slug: 'mobile', blurb: 'The whole platform, in a pocket-sized app.' },
]

export const solutionsMenu = [
  { title: 'Startups', blurb: 'Run the whole company before you hire ops.' },
  { title: 'Agencies', blurb: 'Clients, projects and retainers side by side.' },
  { title: 'Professional services', blurb: 'Billable work, tracked to the hour.' },
  { title: 'Operations teams', blurb: 'Replace the spreadsheet graveyard.' },
  { title: 'Sales leaders', blurb: 'A forecast you can take to the board.' },
  { title: 'People teams', blurb: 'One home for the employee lifecycle.' },
]

export const resourcesMenu = [
  { title: 'Blog', blurb: 'Playbooks from teams running on Bishnoi One' },
  { title: 'Help centre', blurb: 'Guides, answers and quick fixes' },
  { title: 'Templates', blurb: '180+ ready-made starting points' },
  { title: 'Webinars', blurb: 'Live sessions, twice a week' },
  { title: 'Customer stories', blurb: 'How other teams made the switch' },
  { title: 'Developers', blurb: 'API docs, SDKs and webhooks' },
]

/* Departments shown under the hero. */
export const departments = [
  'Regulatory',
  'Inlicensing',
  'Finance',
  'HR',
  'RX',
  'Hospital',
  'B2B',
  'Digital/IT',
]

export const stats = [
  { value: 180, suffix: 'K+', label: 'teams run on Bishnoi One' },
  { value: 99.98, suffix: '%', label: 'platform uptime', decimals: 2 },
  { value: 200, suffix: '+', label: 'tools you can connect' },
  { value: 4.8, suffix: '/5', label: 'average customer rating', decimals: 1 },
]

export const capabilities = [
  {
    icon: 'automation',
    accent: 'blue',
    title: 'Automate the boring half',
    body: 'Build a rule in plain language and Bishnoi One runs it forever. Assign the owner, send the reminder, move the stage, notify the channel.',
  },
  {
    icon: 'chart',
    accent: 'green',
    title: 'See everything at a glance',
    body: 'Pull any number from any corner of the platform into one live view. No exports, no stale slides, no Monday morning scramble.',
  },
  {
    icon: 'sparkle',
    accent: 'violet',
    title: 'Let Bishnoi One AI do the first draft',
    body: 'Summarise a long thread, draft the reply, suggest the next step. You stay in charge. Bishnoi One just removes the blank page.',
  },
  {
    icon: 'puzzle',
    accent: 'amber',
    title: 'Connect the tools you keep',
    body: 'Slack, Gmail, Outlook, Zoom, Xero, Stripe, GitHub and 190 more. Two clicks each, and the data flows both ways.',
  },
  {
    icon: 'shield',
    accent: 'sky',
    title: 'Enterprise grade from day one',
    body: 'SOC 2 Type II, GDPR, SSO and granular permissions come standard, not as a line item on an enterprise quote.',
  },
  {
    icon: 'bolt',
    accent: 'coral',
    title: 'Live in an afternoon',
    body: 'Start from a template, import your spreadsheet, invite the team. Most companies are fully running before the week is out.',
  },
]

export const steps = [
  {
    number: '01',
    title: 'Pick a starting point',
    body: 'Choose one of 180 templates built for real teams, or start from a blank workspace and shape it yourself.',
  },
  {
    number: '02',
    title: 'Make it yours',
    body: 'Drag in the fields you need, name your stages, set who sees what. Everything is editable, none of it needs code.',
  },
  {
    number: '03',
    title: 'Invite everyone',
    body: 'Bring in your team, your clients and your contractors, each with the right level of access.',
  },
  {
    number: '04',
    title: 'Let it run',
    body: 'Automations handle the routine, dashboards keep leadership in the loop, and you get your afternoons back.',
  },
]

export const testimonials = [
  {
    quote:
      'We replaced four tools and a wall of spreadsheets with Bishnoi One. Onboarding a new client used to take a week of coordination. It is now a single button.',
    name: 'Priya Raghavan',
    role: 'COO, Cascade Studio',
    company: 'Cascade',
    accent: 'blue',
    metric: { value: '11 hrs', label: 'saved per week, per manager' },
  },
  {
    quote:
      'Our forecast used to be a guess dressed up in a spreadsheet. Now the board sees the same live number we do, and nobody argues about whose version is right.',
    name: 'Daniel Okafor',
    role: 'VP Revenue, Meridian',
    company: 'Meridian',
    accent: 'green',
    metric: { value: '32%', label: 'shorter sales cycle' },
  },
  {
    quote:
      'I set up our entire onboarding flow on a Thursday afternoon. No IT ticket, no consultant, no three month implementation. It simply worked.',
    name: 'Hannah Lindqvist',
    role: 'Head of People, Lumen Labs',
    company: 'Lumen Labs',
    accent: 'violet',
    metric: { value: '1 day', label: 'from signup to fully live' },
  },
]

export const pricing = {
  tiers: [
    {
      id: 'free',
      name: 'Free',
      tagline: 'For getting a feel for it',
      monthly: 0,
      yearly: 0,
      cta: 'Get started free',
      features: [
        'Up to 3 seats',
        'Unlimited items and docs',
        '2 workspaces',
        '200+ templates',
        'iOS and Android apps',
      ],
    },
    {
      id: 'basic',
      name: 'Basic',
      tagline: 'For small teams finding their rhythm',
      monthly: 11,
      yearly: 9,
      cta: 'Start free trial',
      features: [
        'Everything in Free',
        'Unlimited seats and viewers',
        '5GB file storage',
        'Priority customer support',
        'One dashboard per workspace',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      tagline: 'The one most teams choose',
      monthly: 15,
      yearly: 12,
      cta: 'Start free trial',
      popular: true,
      features: [
        'Everything in Basic',
        'Timeline, calendar and map views',
        '250 automation runs per month',
        'Guest access for clients',
        'Dashboards across 5 workspaces',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'For teams running the whole company',
      monthly: 24,
      yearly: 19,
      cta: 'Start free trial',
      features: [
        'Everything in Standard',
        '25,000 automation runs per month',
        'Private workspaces and docs',
        'Time tracking and approvals',
        'Dashboards across 20 workspaces',
      ],
    },
  ],
  enterprise: {
    name: 'Enterprise',
    blurb:
      'Advanced security, tailored onboarding and a named success manager. Built for organisations rolling Bishnoi One out to hundreds of people.',
    points: [
      'SSO, SCIM and audit logs',
      'Regional data residency',
      '99.9% uptime SLA',
      'Dedicated success manager',
    ],
  },
}

export const faqs = [
  {
    q: 'How long does it take to get started?',
    a: 'Most teams are running the same day. Pick a template, import your existing spreadsheet, invite your team. The free plan needs no card and no call with sales.',
  },
  {
    q: 'Can I try Bishnoi One before paying?',
    a: 'Yes. Every paid plan comes with a 14 day trial of the full product, and the Free plan stays free for up to three seats with no time limit.',
  },
  {
    q: 'What counts as a seat?',
    a: 'Anyone who creates or edits work needs a seat. Viewers and clients you invite as guests are free on Standard and above, and never count towards your seat total.',
  },
  {
    q: 'Do you integrate with the tools we already use?',
    a: 'Bishnoi One connects to more than 200 tools including Slack, Gmail, Outlook, Zoom, Stripe, Xero, HubSpot and GitHub. Anything not on the list can be wired up through our open API.',
  },
  {
    q: 'How secure is my data?',
    a: 'Bishnoi One is SOC 2 Type II certified and GDPR compliant, with encryption in transit and at rest, SSO on every paid plan, and the option to store your data in the EU, US or Australia.',
  },
  {
    q: 'Can I change or cancel my plan later?',
    a: 'Any time, from your billing page. Upgrades apply immediately and downgrades take effect at the end of your current period. No phone call, no retention script.',
  },
]

/* Footer link columns. The Product column is built from `systems` (with
   their logos); these columns pair each link with a small line icon. */
export const footerColumns = [
  {
    title: 'Solutions',
    links: [
      ['Startups', 'rocket'],
      ['Agencies', 'briefcase'],
      ['Professional services', 'user'],
      ['Operations', 'gear'],
      ['Sales teams', 'trend'],
      ['People teams', 'users'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Blog', 'pen'],
      ['Help centre', 'help'],
      ['Templates', 'grid'],
      ['Webinars', 'video'],
      ['Customer stories', 'chat'],
      ['Developers', 'code'],
      ['Community', 'users'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About us', 'info', '#/about'],
      ['Careers', 'briefcase'],
      ['Press', 'news'],
      ['Partners', 'link'],
      ['Contact', 'mail'],
      ['Trust centre', 'shield'],
    ],
  },
]
