/* Copy for the system pages (#/systems/<id>), one entry per Bishnoi One system.
   The `id` matches `systems` in site.js, which supplies the name and logo.
   Every page has the same shape so SystemPage.jsx renders all of them:

     accent     [main colour, soft tint], CSS values used for icons, tabs and tags
     hero       eyebrow, headline, sub, primary / secondary CTA, visual:
                  { type: 'board', title, done, columns }  kanban of cards
                  { type: 'stock', title, rows }           stock level table
     explainer  "What is ...?" for readers new to the category
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
    accent: ['var(--orbit-violet)', 'var(--orbit-violet-100)'],
    hero: {
      eyebrow: 'Bishnoi One CRM',
      headline: 'Close more. Chase less.',
      sub: 'Every contact, deal and follow-up in one place. Bishnoi One CRM keeps the next step obvious, so your team spends the day selling instead of updating records.',
      primary: { label: 'Get started free', href: '#cta' },
      secondary: { label: 'What is a CRM?', href: '#what-is' },
      // Pipeline board: [stage, [company, value, owner initials]]; `done` stage shows green.
      visual: {
        type: 'board',
        title: 'Sales pipeline',
        done: 'Won',
        columns: [
          ['Lead', [['Northwind Clinic', '₱120K', 'AR'], ['Harbor Pharmacy', '₱45K', 'JS']]],
          ['Qualified', [['Bayside Labs', '₱310K', 'MC'], ['Luzon Health', '₱88K', 'AR']]],
          ['Proposal', [['Summit Care', '₱540K', 'JS']]],
          ['Won', [['Cedar Hospital', '₱1.2M', 'MC']]],
        ],
      },
    },
    explainer: {
      eyebrow: 'What is a CRM?',
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
  {
    /* ------------------------------------------------------------------ */
    id: 'inventory',
    title: 'Inventory',
    accent: ['var(--orbit-green-500)', 'var(--orbit-green-100)'],
    hero: {
      eyebrow: 'Bishnoi One Inventory',
      headline: 'Always know what is in stock.',
      sub: 'Every item, order and supplier in one place. Bishnoi One Inventory shows what is on the shelf, what is on the way and what is running low, before a customer has to ask.',
      primary: { label: 'Get started free', href: '#cta' },
      secondary: { label: 'What is inventory management?', href: '#what-is' },
      // Stock table: [item, branch, on hand, capacity, status: ok | low | out]
      visual: {
        type: 'stock',
        title: 'Stock levels · All branches',
        rows: [
          ['Paracetamol 500mg, box of 100', 'Main warehouse', 840, 1000, 'ok'],
          ['Surgical masks, pack of 50', 'Quezon City', 120, 600, 'low'],
          ['Vitamin C 1000mg, bottle', 'Makati', 410, 500, 'ok'],
          ['Nitrile gloves, box of 100', 'Main warehouse', 35, 400, 'out'],
          ['Digital thermometer', 'Cebu', 96, 150, 'ok'],
        ],
      },
    },
    explainer: {
      eyebrow: 'What is inventory management?',
      title: 'Know what you have, where it is and when to buy more.',
      body: [
        'It covers everything that happens to stock: buying it from suppliers, receiving it, storing it across branches, selling it and reordering before it runs out. An inventory system keeps one live count of every item, so the number on screen matches the number on the shelf.',
        'Without one, stock lives in spreadsheets that are out of date the moment they are saved. Shelves run empty, cash sits in items nobody is buying, and customers find out first. With one, everyone works from the same count.',
      ],
      keeps: [
        ['board', 'Items and stock levels', 'Every product, its quantity and its value, updated as it moves.'],
        ['globe', 'Warehouses and branches', 'Stock tracked by location, with transfers between them.'],
        ['automation', 'Purchase and sales orders', 'What you have ordered from suppliers and what customers have ordered from you.'],
        ['bolt', 'Reorder points', 'Alerts and draft orders before an item runs out.'],
      ],
    },
    highlights: {
      title: 'Fewer stockouts. Less cash on the shelf.',
      items: [
        { tag: 'Live stock', title: 'One count, every branch', body: 'Stock levels update the moment an item is received, sold or moved, across every warehouse and branch.' },
        { tag: 'Orders', title: 'One queue for every order', body: 'Online, phone and in-store orders land in a single list, so picking and packing happen in the right order.' },
        { tag: 'Reorder', title: 'Restock before it runs out', body: 'Set a reorder point per item. When stock dips below it, a purchase order is drafted for the usual supplier.' },
        { tag: 'Tracking', title: 'Batches and expiry dates', body: 'Track batch numbers and expiry dates, and sell the oldest stock first so less goes to waste.' },
      ],
    },
    journey: {
      title: 'From supplier to customer',
      stages: [
        {
          tab: 'Purchase',
          title: 'Buy from suppliers',
          body: 'Raise purchase orders from your supplier list with agreed prices. Large orders go for approval first, and the supplier gets the order by email.',
          points: ['Supplier price lists on every item', 'Approval rules by amount', 'Expected delivery dates you can track'],
        },
        {
          tab: 'Receive',
          title: 'Receive and store',
          body: 'Check deliveries against the purchase order, record batches and expiry dates, and put stock away in the right location.',
          points: ['Scan items in with a barcode', 'Short or damaged deliveries flagged on the spot', 'The bill is matched in Books automatically'],
        },
        {
          tab: 'Fulfil',
          title: 'Pick, pack and ship',
          body: 'Orders from every channel go into one queue. Pick lists show where each item is, and stock is reserved the moment an order is confirmed.',
          points: ['One queue for online, phone and in-store', 'Pick lists sorted by location', 'Customers notified when it ships'],
        },
        {
          tab: 'Restock',
          title: 'Count and restock',
          body: 'Run cycle counts without closing the store, move stock between branches and let reorder points draft the next purchase for you.',
          points: ['Cycle counts by aisle or category', 'Transfers between branches', 'Purchase orders drafted at the reorder point'],
        },
      ],
    },
    connects: {
      title: 'Connected to the rest of your business',
      items: [
        ['books', 'Supplier bills and sales invoices are created from your orders.'],
        ['crm', 'Reps see live stock before they quote a delivery date.'],
        ['desk', 'Support sees order and delivery status on every ticket.'],
        ['finance', 'Stock value and purchase spend feed the budget.'],
        ['analytics', 'Stock, turnover and fulfilment reports, live.'],
      ],
    },
    faq: [
      ['What is inventory management?', 'Inventory management is how a business tracks the stock it buys, stores and sells. An inventory system keeps one live count of every item across every location, records what comes in and goes out, and tells you when to reorder.'],
      ['Why not just use a spreadsheet?', 'A spreadsheet is only right at the moment someone updates it. With more than one branch, sales channel or person handling stock, the numbers drift. An inventory system updates the count with every sale, delivery and transfer, so it stays right on its own.'],
      ['Can we track stock across several branches?', 'Yes. Each warehouse or branch has its own stock levels, and you can move stock between them with a transfer that both sides confirm.'],
      ['Does it handle batches and expiry dates?', 'Yes. Record batch numbers and expiry dates when stock is received, and get a warning before items expire.'],
      ['Can we import our current stock list?', 'Yes. Import items, quantities and suppliers from a spreadsheet or your current tool, and our team can help with the first migration.'],
      ['Is Inventory priced separately?', 'No. One Bishnoi One account covers every system you turn on, with one bill. See the pricing page for plans.'],
    ],
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'people',
    title: 'People',
    accent: ['var(--orbit-blue-600)', 'var(--orbit-blue-100)', 'var(--orbit-blue-700)'],
    hero: {
      eyebrow: 'Bishnoi One People',
      headline: 'Less paperwork. More time for people.',
      sub: 'Hiring, onboarding, attendance, time off and reviews in one place. Bishnoi One People keeps every employee record up to date, so HR spends less time chasing forms and more time with the team.',
      primary: { label: 'Get started free', href: '#cta' },
      secondary: { label: 'What is an HR system?', href: '#what-is' },
      // Onboarding card: tasks are [task, owner, status: done | doing | todo]
      visual: {
        type: 'onboarding',
        title: 'Onboarding · New hire',
        person: { initials: 'MS', name: 'Maria Santos', role: 'Pharmacist, Makati branch', start: 'Starts Monday' },
        tasks: [
          ['Offer letter signed', 'HR · People', 'done'],
          ['Contract and IDs filed', 'HR · WorkDrive', 'done'],
          ['Payroll and bank details set up', 'Finance · Books', 'done'],
          ['Laptop and email account', 'IT', 'doing'],
          ['First-week plan shared', 'Branch manager', 'todo'],
        ],
      },
    },
    explainer: {
      eyebrow: 'What is an HR system?',
      title: 'One place for everything about your people.',
      body: [
        'An HR system, sometimes called an HRIS, keeps every employee’s record in one place: their personal details, contract, documents, attendance, leave and reviews. It also runs the everyday HR work around that record, from onboarding a new hire to approving time off.',
        'Without one, that information is spread across folders, spreadsheets and email threads, and HR becomes the team that chases forms. With one, employees and managers handle the simple things themselves, and HR always has an up-to-date picture of the team.',
      ],
      keeps: [
        ['people', 'Employee records', 'Personal details, role, contract and history in one profile.'],
        ['check', 'Onboarding and offboarding', 'Checklists that make sure every step happens, on time.'],
        ['board', 'Attendance and time off', 'Leave balances, requests and who is out today.'],
        ['star', 'Reviews and goals', 'Check-ins, reviews and goals on one timeline.'],
      ],
    },
    highlights: {
      title: 'Less chasing. Happier teams.',
      items: [
        { tag: 'Records', title: 'One record per person', body: 'From the offer letter to the one-year review, every detail sits in a single employee record that HR, managers and payroll all trust.' },
        { tag: 'Onboarding', title: 'A great first week, every time', body: 'Onboarding plans start themselves on day one. IT, payroll and the hiring manager each get their tasks without a single email.' },
        { tag: 'Time off', title: 'Leave in two taps', body: 'Employees request leave from their phone. It goes to the right manager, and the balance updates the moment it is approved.' },
        { tag: 'Self-service', title: 'Answers without an email', body: 'Payslips, leave balances and documents are always in the app, so employees stop asking HR for them.' },
      ],
    },
    journey: {
      title: 'From offer letter to annual review',
      stages: [
        {
          tab: 'Hire',
          title: 'Hire the right people',
          body: 'Post a role, collect applications in one place and move candidates through interviews. When you make an offer, the letter goes out for e-signature.',
          points: ['Job posts drafted with Bishnoi One AI', 'Candidates and interview notes in one list', 'Offer letters signed online'],
        },
        {
          tab: 'Onboard',
          title: 'Onboard without the chase',
          body: 'Once the offer is signed, the onboarding plan starts. Each team gets its tasks, and the new hire fills in their own details before day one.',
          points: ['Checklists for HR, IT, payroll and the manager', 'New hires complete forms from their phone', 'Payroll set up in Books automatically'],
        },
        {
          tab: 'Day to day',
          title: 'Run the everyday',
          body: 'Attendance, shifts and leave run on their own. Managers approve requests in one tap and always know who is in today.',
          points: ['Leave requests routed to the right manager', 'Live balances for every leave type', 'Attendance and shift cover in one view'],
        },
        {
          tab: 'Grow',
          title: 'Review and grow',
          body: 'Set goals, run regular check-ins and keep review notes on the employee’s record, so every conversation builds on the last one.',
          points: ['Review cycles with reminders', 'Goals and check-ins on one timeline', 'Training records and certificates in one place'],
        },
      ],
    },
    connects: {
      title: 'Connected to the rest of your business',
      items: [
        ['books', 'New hires, leave and changes flow straight into payroll.'],
        ['workdrive', 'Contracts and employee files are filed on their own.'],
        ['desk', 'Shift cover and staffing show up where support plans its day.'],
        ['finance', 'Headcount and salary costs feed the budget.'],
        ['analytics', 'Headcount, turnover and leave reports, live.'],
      ],
    },
    faq: [
      ['What is an HR system?', 'An HR system, or HRIS, is software that keeps every employee record in one place and runs the everyday HR work around it: onboarding, attendance, time off, documents and reviews. Employees and managers can handle simple requests themselves, so HR spends less time on admin.'],
      ['Do we need one if we are a small team?', 'Small teams often feel the pain first, because one person handles HR on top of everything else. Starting early means records are clean and processes are in place before the team grows.'],
      ['Can employees use it themselves?', 'Yes. Employees can request leave, view payslips, update their details and find their documents from the web or the mobile app. Managers approve requests in one tap.'],
      ['What happens when someone leaves?', 'An offboarding checklist runs in the same way as onboarding: final pay is prepared in Books, equipment is collected, and one switch removes their access to every Bishnoi One system.'],
      ['Can we import our employee records?', 'Yes. Import employees, leave balances and documents from a spreadsheet or your current tool, and our team can help with the first migration.'],
      ['Is People priced separately?', 'No. One Bishnoi One account covers every system you turn on, with one bill. See the pricing page for plans.'],
    ],
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'analytics',
    title: 'Analytics',
    accent: ['#2a78d6', '#e3eefb', '#1c5fae'],
    hero: {
      eyebrow: 'Bishnoi One Analytics',
      headline: 'See your whole business, live.',
      sub: 'Sales, stock, people and cash on one screen, updated the moment something changes. No exports, no spreadsheets, no waiting for month-end.',
      primary: { label: 'Get started free', href: '#cta' },
      secondary: { label: 'What is business analytics?', href: '#what-is' },
      // Live, tabbed dashboard; its sample data lives in ui/AnalyticsViz.jsx.
      visual: { type: 'dashboard' },
    },
    explainer: {
      eyebrow: 'What is business analytics?',
      title: 'Your business, in numbers you can trust.',
      body: [
        'Business analytics, often called business intelligence or BI, turns the data your business already creates into dashboards and reports people can act on. Every sale, delivery, payslip and support ticket becomes a number you can see, compare and follow over time.',
        'Most teams spend hours exporting data from different tools into spreadsheets, and by the time the report is ready it is out of date. Bishnoi One Analytics reads straight from the other systems, so the numbers are already up to date when you open it.',
      ],
      keeps: [
        ['chart', 'Live dashboards', 'Key numbers for each team, updated as work happens.'],
        ['board', 'Reports', 'Ready-made and custom reports you can filter, share and schedule.'],
        ['bolt', 'Alerts', 'A message when a number crosses the line you set.'],
        ['sparkle', 'Answers in plain words', 'Ask a question and get a chart back.'],
      ],
    },
    ask: {
      eyebrow: 'Bishnoi One AI',
      title: 'Ask a question. Get a chart.',
      sub: 'No formulas or report builders. Type a question the way you would ask a colleague, and Analytics answers with the numbers and a chart.',
      // bars are [label, value]; unit is 'peso' or 'count'
      questions: [
        {
          q: 'Which branch sold the most last month?',
          answer: 'Makati led with ₱1.42M, 20% ahead of Quezon City. Online grew fastest, up 18% on the month before.',
          title: 'Revenue by branch, last month',
          unit: 'peso',
          bars: [['Makati', 1420000], ['Quezon City', 1180000], ['Online', 960000], ['Cebu', 740000], ['Davao', 520000]],
        },
        {
          q: 'What stock expires in the next 90 days?',
          answer: '4 batches worth ₱312K expire in the next 90 days. The largest is Paracetamol 500mg at the Cebu branch.',
          title: 'Stock value expiring in 90 days',
          unit: 'peso',
          bars: [['Paracetamol 500mg', 148000], ['Amoxicillin 250mg', 86000], ['Vitamin C 1000mg', 52000], ['Cough syrup 60ml', 26000]],
        },
        {
          q: 'How many people are on leave next week?',
          answer: '11 people are on leave next week. RX has the most, with 4, so Makati may need cover on Tuesday.',
          title: 'People on leave next week, by department',
          unit: 'count',
          bars: [['RX', 4], ['Hospital', 3], ['B2B', 2], ['Finance', 1], ['Regulatory', 1]],
        },
      ],
    },
    highlights: {
      title: 'Stop exporting. Start deciding.',
      items: [
        { tag: 'Live', title: 'Numbers already up to date', body: 'Analytics reads straight from the other systems, so a sale, delivery or payment shows up the moment it happens.' },
        { tag: 'Dashboards', title: 'A dashboard for every team', body: 'Start from ready-made dashboards for sales, stock, people and finance, then drag in the charts your team cares about.' },
        { tag: 'Drill down', title: 'From total to transaction', body: 'Click any number to see what is behind it, down to the single invoice, order or payslip.' },
        { tag: 'Alerts', title: 'Know when something changes', body: 'Set a threshold and get a message when stock runs low, sales dip or spending runs over budget.' },
      ],
    },
    journey: {
      title: 'From raw data to the next decision',
      stages: [
        {
          tab: 'Connect',
          title: 'Your data is already there',
          body: 'Everything in Bishnoi One is connected from the start. Add spreadsheets or other sources when you need them, and they sit next to the rest.',
          points: ['Every Bishnoi One system included', 'Spreadsheet imports in a few clicks', 'One set of permissions for every number'],
        },
        {
          tab: 'Build',
          title: 'Build a dashboard in minutes',
          body: 'Start from a template or a blank page. Pick a chart, choose the numbers and filters, and arrange it the way your team reads it.',
          points: ['Templates for every team', 'Drag-and-drop layout', 'Filters by branch, team and date'],
        },
        {
          tab: 'Share',
          title: 'Share it with the team',
          body: 'Share dashboards with the people who need them, schedule reports by email, and put the live view on the office screen.',
          points: ['Scheduled reports by email', 'Full-screen mode for office screens', 'Everyone sees only what they are allowed to'],
        },
        {
          tab: 'Act',
          title: 'Act on what you see',
          body: 'Alerts tell you when something changes, and Automations can act on it, from drafting a reorder to flagging a deal that has gone quiet.',
          points: ['Alerts by email, app or chat', 'Thresholds per branch or team', 'Trigger Automations from any number'],
        },
      ],
    },
    connects: {
      title: 'Reads from every system',
      items: [
        ['crm', 'Pipeline, win rates and revenue forecasts.'],
        ['books', 'Revenue, payments and what is owed.'],
        ['inventory', 'Stock value, turnover and deliveries.'],
        ['people', 'Headcount, attendance and leave.'],
        ['finance', 'Budgets, spend and cash flow.'],
        ['desk', 'Ticket volume and response times.'],
      ],
    },
    faq: [
      ['What is business analytics?', 'Business analytics, or business intelligence (BI), turns the data your business creates into dashboards and reports. Instead of exporting from several tools and building spreadsheets, you see live numbers for sales, stock, people and cash in one place.'],
      ['Do we need a data team to use it?', 'No. Ready-made dashboards cover the common questions for every team, building your own is drag and drop, and you can ask questions in plain words.'],
      ['Where does the data come from?', 'Straight from the other Bishnoi One systems, with no exports or syncing. You can also import spreadsheets to sit alongside them.'],
      ['How up to date are the numbers?', 'Dashboards update as work happens in the other systems, so a sale or a delivery shows up as soon as it is recorded.'],
      ['Can we control who sees what?', 'Yes. Analytics uses the same roles as the rest of Bishnoi One, so a branch manager sees their branch and a finance lead sees the books.'],
      ['Is Analytics priced separately?', 'No. One Bishnoi One account covers every system you turn on, with one bill. See the pricing page for plans.'],
    ],
  },
]

export const systemPage = (id) => systemPages.find((p) => p.id === id) ?? null
