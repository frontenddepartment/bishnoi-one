/* Copy for the system pages (#/systems/<id>), one entry per Bishnoi One system.
   The `id` matches `systems` in site.js, which supplies the name and logo.
   Every page has the same shape so SystemPage.jsx renders all of them:

     hero       eyebrow, headline, sub, primary / secondary CTA, board (hero visual)
     explainer  "What is a ...?" for readers new to the category
     highlights four short benefit cards
     journey    tabbed walk through the work the system covers
     connects   what it shares with the other systems
     faq        short answers to the questions people ask first

   Add a page by adding an entry here. */

export const systemPages = [
  /* ------------------------------------------------------------------ */
  {
    id: 'crm',
    title: 'CRM',
    hero: {
      eyebrow: 'Bishnoi One CRM',
      headline: 'Close more. Chase less.',
      sub: 'Every contact, deal and follow-up in one place. Bishnoi One CRM keeps the next step obvious, so your team spends the day selling instead of updating records.',
      primary: { label: 'Get started free', href: '#cta' },
      secondary: { label: 'What is a CRM?', href: '#what-is' },
      // Pipeline board in the hero: [stage, [company, value, owner initials]]
      board: [
        ['Lead', [['Northwind Clinic', '₱120K', 'AR'], ['Harbor Pharmacy', '₱45K', 'JS']]],
        ['Qualified', [['Bayside Labs', '₱310K', 'MC'], ['Luzon Health', '₱88K', 'AR']]],
        ['Proposal', [['Summit Care', '₱540K', 'JS']]],
        ['Won', [['Cedar Hospital', '₱1.2M', 'MC']]],
      ],
    },
    explainer: {
      title: 'A CRM is where your customer relationships live.',
      body: [
        'CRM stands for customer relationship management. It is one shared system for everything your team knows about the people and companies you sell to: who they are, what you have talked about, what they have bought and what happens next.',
        'Without one, that knowledge sits in inboxes, spreadsheets and people’s heads. With one, anyone on the team can pick up a customer and know exactly where things stand.',
      ],
      keeps: [
        ['people', 'Contacts and companies', 'One record per customer, with every detail in one place.'],
        ['pipeline', 'Deals and stages', 'Each opportunity, its value and how close it is to closing.'],
        ['headset', 'Conversations', 'Calls, emails and meetings logged against the right record.'],
        ['check', 'Next steps', 'Tasks and reminders so no follow-up slips.'],
      ],
    },
    highlights: {
      title: 'Less admin. More selling.',
      items: [
        { tag: 'Pipeline', title: 'See every deal at a glance', body: 'Deal stages that match how your team actually sells. Drag a deal forward and everything that depends on it updates.' },
        { tag: 'Contacts', title: 'Records you can trust', body: 'Emails, calls and meetings attach to the right contact on their own, so nobody has to type up what happened.' },
        { tag: 'Follow-ups', title: 'Never miss the next step', body: 'Follow-ups are scheduled the moment a stage changes, and the owner gets a nudge before a deal goes quiet.' },
        { tag: 'Forecast', title: 'A number you can commit to', body: 'Forecasts update themselves every night from the live pipeline, by rep, by team and by month.' },
      ],
    },
    journey: {
      title: 'From first hello to repeat customer',
      stages: [
        {
          tab: 'Capture',
          title: 'Capture and qualify leads',
          body: 'Leads from your website, events and referrals land in one list. Score them, assign an owner and spend time on the ones most likely to buy.',
          points: ['Web forms and imports go straight into the CRM', 'Duplicates are caught before they are created', 'Leads are routed to the right rep automatically'],
        },
        {
          tab: 'Nurture',
          title: 'Build the relationship',
          body: 'Keep every conversation in context. Templates and reminders help reps follow up on time, with the history in front of them.',
          points: ['Email templates for every stage', 'Full timeline of calls, emails and meetings', 'Reminders before a lead goes cold'],
        },
        {
          tab: 'Close',
          title: 'Close the deal',
          body: 'Send the quote, track who has seen it and get approval on discounts without leaving the deal. When it is won, Books raises the invoice.',
          points: ['Quotes built from your product list', 'Discount approvals in one tap', 'Won deals hand over to Books and Inventory'],
        },
        {
          tab: 'Grow',
          title: 'Keep and grow the account',
          body: 'After the sale, support tickets, orders and invoices all show on the customer record, so renewals and upsells come with the full story.',
          points: ['Tickets from Desk on every account', 'Renewal reminders ahead of time', 'Account health at a glance'],
        },
      ],
    },
    connects: {
      title: 'Connected to the rest of your business',
      items: [
        ['books', 'Won deals become invoices, and payment status shows on the deal.'],
        ['desk', 'Every support ticket shows on the customer’s record.'],
        ['inventory', 'Quotes check live stock before you promise a date.'],
        ['analytics', 'Pipeline and revenue reports, live, with no exports.'],
        ['workdrive', 'Contracts and proposals stay linked to the deal.'],
      ],
    },
    faq: [
      ['What is a CRM?', 'CRM stands for customer relationship management. It is software that keeps every contact, deal and conversation with your customers in one shared place, so your team always knows who a customer is, where the deal stands and what to do next.'],
      ['Why does a business need one?', 'Once more than one person talks to customers, details start getting lost in inboxes and spreadsheets. A CRM keeps one shared record, shows every deal in your pipeline and reminds people to follow up, which means fewer missed opportunities and a forecast you can rely on.'],
      ['Can we set up our own stages and fields?', 'Yes. Name your pipeline stages, add the fields you track and build separate pipelines for different products or teams.'],
      ['Can we move in from spreadsheets or another CRM?', 'Yes. Import contacts, companies and deals from a spreadsheet or your current tool, and our team can help with the first migration.'],
      ['Does it work with the other Bishnoi One systems?', 'Yes. CRM shares the same customer record with Books, Desk, Inventory, Analytics and WorkDrive, so there is nothing to sync.'],
      ['Is CRM priced separately?', 'No. One Bishnoi One account covers every system you turn on, with one bill. See the pricing page for plans.'],
    ],
  },
]

export const systemPage = (id) => systemPages.find((p) => p.id === id) ?? null
