/* Copy for the Platform pages: one overview page plus one page per item in the
   Platform menu (see platformMenu in site.js). Each page follows the same shape
   so a single template can render all of them:

     hero      eyebrow, headline, sub, primary / secondary CTA
     features  three blocks: what you get
     steps     three steps: how it works
     examples  real cross-system scenarios
     faq       short answers to the questions people ask first

   NOTE: claims marked "VERIFY" must be confirmed before going live. */

export const platformOverview = {
  slug: 'platform',
  hero: {
    eyebrow: 'The Bishnoi One platform',
    headline: 'Eight systems. One login. One version of the truth.',
    sub: 'Bishnoi One brings People, Books, Finance, Desk, Inventory, CRM, Analytics and WorkDrive onto one shared platform, so every team works from the same records, the same approvals and the same numbers.',
    primary: { label: 'Get started free', href: '#cta' },
    secondary: { label: 'See how it fits together', href: '#how-it-fits' },
  },
  pillars: [
    {
      title: 'One record for everything',
      body: 'A person, customer, supplier or item is created once and every system sees the same record. Add a new hire in People and they appear in payroll in Books, in staffing in Desk and in headcount in Analytics.',
    },
    {
      title: 'One login and one set of permissions',
      body: 'Your team signs in once. Roles are set once and apply across every system, so a store manager sees their branch and a finance lead sees the books, without eight separate admin screens.',
    },
    {
      title: 'One place to approve',
      body: 'Leave requests, purchase orders, refunds and contract renewals all land in the same Approvals inbox, with the context from the system they came from. Approve in one tap, and the next step runs on its own.',
    },
  ],
  systems: [
    { id: 'people', name: 'People', job: 'Employee records, onboarding, attendance and time off.', shares: ['Payroll data with Books', 'Staffing with Desk', 'Headcount with Analytics'] },
    { id: 'books', name: 'Books', job: 'Invoices, bills, payroll and day-to-day bookkeeping.', shares: ['Customers with CRM', 'Purchase orders with Inventory', 'Actuals with Finance'] },
    { id: 'finance', name: 'Finance', job: 'Budgets, cash flow and financial planning.', shares: ['Actuals from Books', 'Spend approvals with every team', 'Forecasts with Analytics'] },
    { id: 'desk', name: 'Desk', job: 'Customer support tickets and help desk.', shares: ['Order history from Inventory', 'Invoices from Books', 'Customer profiles from CRM'] },
    { id: 'inventory', name: 'Inventory', job: 'Stock, orders, suppliers and fulfilment.', shares: ['Bills with Books', 'Orders with CRM', 'Stock levels with Analytics'] },
    { id: 'crm', name: 'CRM', job: 'Contacts, pipeline and revenue forecasting.', shares: ['Invoices from Books', 'Tickets from Desk', 'Pipeline with Analytics'] },
    { id: 'analytics', name: 'Analytics', job: 'Live dashboards and reports across every system.', shares: ['Reads from all seven systems', 'No exports or spreadsheets needed'] },
    { id: 'workdrive', name: 'WorkDrive', job: 'Shared files, folders and document control.', shares: ['Contracts linked to CRM deals', 'Receipts linked to Books', 'Employee files linked to People'] },
  ],
  story: {
    title: 'A purchase request, start to finish',
    steps: [
      ['Inventory', 'Stock of a fast-moving item drops below its reorder point.'],
      ['Automations', 'A purchase order is drafted for the usual supplier.'],
      ['Approvals', 'The branch manager approves it from their phone.'],
      ['Books', 'The bill is recorded and scheduled for payment.'],
      ['Analytics', 'Spend and stock dashboards update the same minute.'],
    ],
  },
  faq: [
    ['Do I have to use all eight systems?', 'No. Start with the systems you need today and switch on the others when you are ready. Everything you add connects to what is already there.'],
    ['Can we move our existing data in?', 'Yes. Import from spreadsheets or your current tools, and our team can help with the first migration.'],
    ['Is it one subscription?', 'Yes. One account covers every system you turn on, with one bill.'],
  ],
}

// Hero links are in-page section ids on the same page (#cta is the closing banner).
export const platformPages = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'automations',
    title: 'Automations',
    hero: {
      eyebrow: 'Automations',
      headline: 'If this happens, Bishnoi One does that.',
      sub: 'Turn the routine work between your systems into flows that run on their own: routing requests, chasing approvals, updating records and notifying the right people. No code.',
      primary: { label: 'Get started free', href: '#cta' },
      secondary: { label: 'See flows in action', href: '#examples' },
    },
    features: [
      { title: 'Flows that cross systems', body: 'Start in one system and finish in another. A leave request in People can check cover in Desk, check the balance in Books and update payroll once approved.' },
      { title: 'Ready-made templates', body: 'Start from a template for the work every business does, from onboarding a new hire to collecting an overdue invoice, then adjust it to fit how you work.' },
      { title: 'Rules for the exceptions', body: 'Set what happens when something does not fit: route it to a person, retry it later or pause the flow. You fix the cause once and every waiting run clears.' },
    ],
    steps: [
      ['Pick a trigger', 'A form is submitted, a record changes, a date arrives or a number crosses a limit.'],
      ['Add the steps', 'Check, update, approve, notify. Drag them into order in the builder.'],
      ['Preview, then switch it on', 'Test the flow in a sandbox with real-looking data before it touches your records.'],
    ],
    examples: [
      'New hire added in People → laptop request, WorkDrive folder and payroll setup created automatically',
      'Invoice 7 days overdue in Books → reminder sent, account flagged in CRM',
      'Stock below reorder point in Inventory → purchase order drafted for approval',
      'Ticket unanswered for 4 hours in Desk → escalated to the team lead',
    ],
    faq: [
      ['Do I need a developer?', 'No. Flows are built by choosing steps from a list. If you can describe the process, you can build it.'],
      ['What if a step fails?', 'The run pauses and appears in Exceptions with the reason, and you can retry it, fix it or hand it to a person.'],
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'dashboards',
    title: 'Dashboards',
    hero: {
      eyebrow: 'Dashboards',
      headline: 'Live numbers your leadership team trusts.',
      sub: 'Sales, cash, stock, headcount and support in one view, updated as the work happens. No exports, no copy-paste, no Monday-morning spreadsheet.',
      primary: { label: 'Get started free', href: '#cta' },
      secondary: { label: 'See what you can track', href: '#examples' },
    },
    features: [
      { title: 'Every system, one screen', body: 'Because all eight systems share one database, a dashboard can show revenue from Books beside pipeline from CRM and tickets from Desk without any setup.' },
      { title: 'Built for each role', body: 'Owners see the whole business, branch managers see their branch, team leads see their queue. Same data, filtered by the permissions you already set.' },
      { title: 'From number to record', body: 'Click any figure to see the invoices, orders or tickets behind it, and act on them right there.' },
    ],
    steps: [
      ['Start from a template', 'Pick a ready-made dashboard for sales, finance, operations or support.'],
      ['Add what matters to you', 'Drop in charts, targets and tables from any system.'],
      ['Share it', 'Send it to the team, pin it to a TV in the office or get it by email every morning.'],
    ],
    examples: [
      'Daily sales by branch against target',
      'Cash in the bank, money owed to you and bills due this week',
      'Stock running low across all warehouses',
      'Open tickets and average first-reply time by agent',
    ],
    faq: [
      ['How fresh is the data?', 'Dashboards read from the live records, so they reflect changes as soon as they are saved.'],
      ['Can I export?', 'Yes, to PDF or spreadsheet, though most teams stop needing to.'],
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'ai',
    title: 'Bishnoi One AI',
    hero: {
      eyebrow: 'Bishnoi One AI',
      headline: 'An assistant that already knows your business.',
      sub: 'Drafts, summaries and next-step suggestions built into every system, using your own records, so the answer is about your customers, your stock and your numbers.',
      primary: { label: 'Get started free', href: '#cta' },
      secondary: { label: 'See what it can do', href: '#examples' },
    },
    features: [
      { title: 'Drafts in seconds', body: 'Write a customer reply in Desk, a payment reminder in Books or a job post in People, with the details filled in from the record you are looking at.' },
      { title: 'Summaries on demand', body: 'Get the story of a customer, a long ticket thread or last month’s spending in a few lines, before a call or a meeting.' },
      { title: 'Suggestions, not surprises', body: 'Bishnoi One AI suggests the next step, such as an invoice to chase or a reorder to place, and a person always decides.' },
    ],
    steps: [
      ['Open any record', 'A customer, a ticket, an invoice or an employee.'],
      ['Ask or pick a suggestion', 'Type a question or choose from suggested actions.'],
      ['Review and send', 'Edit the draft, then send or save it. Nothing goes out without you.'],
    ],
    examples: [
      '“Summarise this customer before my call.”',
      '“Draft a polite reminder for invoices over 30 days.”',
      '“Which items will run out before next week?”',
      '“Write a reply to this ticket using our refund policy.”',
    ],
    faq: [
      ['Does it see all our data?', 'It only sees what the person using it is allowed to see under their role.'],
      ['Is our data used to train public models?', 'VERIFY with the AI provider terms before publishing an answer here.'],
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'integrations',
    title: 'Integrations',
    hero: {
      eyebrow: 'Integrations',
      headline: 'Keep the tools you love. Connect them in a couple of clicks.',
      // VERIFY: the menu says "200+ tools". Use the real count, or keep this wording.
      sub: 'Bishnoi One connects to the email, payment, banking, messaging and e-commerce tools you already use, so information flows in without anyone retyping it.',
      primary: { label: 'Get started free', href: '#cta' },
      secondary: { label: 'See how it connects', href: '#steps' },
    },
    features: [
      { title: 'Email and calendar', body: 'Emails become tickets in Desk or leads in CRM, and meetings show up beside the customer they are about.' },
      { title: 'Payments and banking', body: 'Payments are matched to invoices in Books automatically, and bank feeds keep cash in Finance up to date.' },
      { title: 'Shops and marketplaces', body: 'Online orders arrive in Inventory, stock levels sync back, and the sale is recorded in Books.' },
    ],
    steps: [
      ['Choose a tool', 'Find it in the integrations directory.'],
      ['Sign in to connect', 'Approve access once; no API keys or developers needed for supported tools.'],
      ['Pick what syncs', 'Choose which records flow in, which flow out, and how often.'],
    ],
    examples: [
      'Supplier invoice emailed in → read and drafted as a bill in Books',
      'Online order placed → stock reserved in Inventory, sale recorded in Books',
      'Customer message on chat → ticket opened in Desk with their order history',
    ],
    faq: [
      ['What if my tool is not listed?', 'Tell us which one. We add integrations based on what customers ask for, and many tools can also connect through webhooks.'],
      ['Does data sync both ways?', 'For most integrations, yes. You choose the direction for each type of record.'],
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'security',
    title: 'Security',
    hero: {
      eyebrow: 'Security',
      headline: 'Your business data, locked down and under your control.',
      // VERIFY: the menu claims "SOC 2 Type II, SSO and regional data storage".
      // Only list certifications that have been completed.
      sub: 'Access controls, audit trails and encryption are built into every system, so the right people see the right data and you can always see who did what.',
      primary: { label: 'Talk to our team', href: '#cta' },
      secondary: { label: 'How access works', href: '#features' },
    },
    features: [
      { title: 'Roles and permissions', body: 'Decide who can see, edit and approve in each system, down to a branch or a team. Set it once and it applies everywhere.' },
      { title: 'A full audit trail', body: 'Every change, approval and login is recorded with who, what and when, and kept for as long as you need it.' },
      { title: 'Protected at every step', body: 'Data is encrypted in transit and at rest, backed up daily and monitored around the clock.' }, // VERIFY backup / monitoring specifics
    ],
    steps: [
      ['Set up roles', 'Start from templates like Owner, Manager and Staff, or create your own.'],
      ['Turn on sign-in protection', 'Require two-step verification or single sign-on for your team.'],
      ['Review regularly', 'See who has access to what, and remove it in one click when someone leaves.'],
    ],
    examples: [
      'An employee leaves → one switch removes their access to all eight systems',
      'A refund is approved → the audit log shows who approved it and when',
      'A branch manager signs in → they only see their branch’s sales and stock',
    ],
    faq: [
      ['Where is our data stored?', 'VERIFY the hosting region(s) before publishing.'],
      ['Can we get a copy of our data?', 'Yes. You can export your records at any time; it is your data.'],
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'mobile',
    title: 'Bishnoi One Mobile',
    hero: {
      eyebrow: 'Bishnoi One Mobile',
      headline: 'The whole platform, in a pocket-sized app.',
      sub: 'Approve requests, check the numbers, answer customers and look up stock from your phone, whether you are on the shop floor, at a supplier or on the road.',
      primary: { label: 'Get started free', href: '#cta' },
      secondary: { label: 'See what it does', href: '#features' },
    },
    features: [
      { title: 'Approvals on the go', body: 'Get a notification, see the details, approve or decline in one tap. Nothing waits for you to get back to your desk.' },
      { title: 'Your dashboards, anywhere', body: 'Today’s sales, cash and stock at a glance, with the same live numbers as the office screen.' },
      { title: 'Built for the field', body: 'Scan items into Inventory, snap receipts into Books and update tickets in Desk, straight from the phone camera.' },
    ],
    steps: [
      ['Download the app', 'Available for iPhone and Android.'],
      ['Sign in with your work account', 'Your roles and permissions come with you.'],
      ['Turn on notifications', 'Choose what you want to hear about, and nothing more.'],
    ],
    examples: [
      'A manager approves overtime from a site visit',
      'A warehouse team counts stock by scanning barcodes',
      'An owner checks the day’s sales before closing time',
    ],
    faq: [
      ['Does it work offline?', 'VERIFY offline support before publishing.'],
      ['Is it a separate subscription?', 'No. The app is included with your Bishnoi One account.'],
    ],
  },
]
