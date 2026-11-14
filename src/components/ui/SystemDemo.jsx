import { useEffect, useRef, useState } from 'react'
import { systems } from '../../data/site.js'
import './SystemDemo.css'

/* A small, scripted "live" board for each system in the showcase. Two team
   cursors (with name tags, like a multiplayer design tool) move around
   and do that system's everyday job: reorder stock, approve time off, move a
   deal, send an invoice and so on. Pure illustration — nothing is real. */

const PEOPLE = {
  mark: { name: 'Mark', c: '#5a6dff', d: '0s' },
  john: { name: 'John', c: '#ffd900', ci: '#1a1a1a', d: '-0.8s' },
  joshua: { name: 'Joshua', c: '#fd4040', d: '-1.4s' },
  angel: { name: 'Angel', c: '#3e8e2d', d: '-2s' },
  jane: { name: 'Jane', c: '#f36b21', d: '-0.5s' },
  kate: { name: 'Kate', c: '#173f2a', d: '-1.1s' },
}

const Chip = ({ tone, children }) => (
  <span className="sd__chip" data-tone={tone}>
    {children}
  </span>
)

const Bar = ({ pct, low, t }) => (
  <span className={`sd__bar ${low ? 'is-low' : ''}`} data-t={t}>
    <i style={{ width: `${pct}%` }} />
  </span>
)

// Owner avatar: initial on the person's colour.
const Av = ({ k }) => (
  <span className="sd__av" style={{ '--c': PEOPLE[k].c, '--ci': PEOPLE[k].ci || '#fff' }}>
    {PEOPLE[k].name[0]}
  </span>
)

/* Small extra table under each board: a header row in the group colour,
   then [title, sub, owner, middle, chip tone, chip label] rows. */
const MiniTable = ({ title, grp, cols, head, rows }) => (
  <div className="sd__table" style={{ '--cols': cols, '--grp': grp }}>
    <div className="sd__tr sd__th">
      <span className="sd__grp">{title}</span>
      <span>Owner</span>
      <span>{head}</span>
      <span>Status</span>
    </div>
    {rows.map(([name, sub, who, mid, tone, label]) => (
      <div key={name} className="sd__tr">
        <span><b>{name}</b>{sub ? <small>{sub}</small> : null}</span>
        <span><Av k={who} /></span>
        <span>{mid}</span>
        <span><Chip tone={tone}>{label}</Chip></span>
      </div>
    ))}
  </div>
)

/* --- Scenes ------------------------------------------------------------ */
const SCENES = {
  inventory: {
    nav: ['Dashboard', 'Items', 'Orders', 'Purchases', 'Warehouses'],
    on: 1,
    title: 'Items',
    action: '+ New item',
    people: ['mark', 'joshua'],
    init: { msg: 'Watching stock across 3 branches' },
    scripts: [
      [
        { to: 'r0', fx: 0.3, wait: 250 },
        { to: 'reorder', click: 1, set: { ordered: 1, msg: 'PO-2041 sent to MedSupply Co.' }, wait: 1700 },
      ],
      [
        { wait0: 1700 },
        { to: 'r2', fx: 0.3, wait: 250 },
        { to: 'receive', click: 1, set: { received: 1, msg: 'Vitamin C delivery received' }, wait: 700 },
        { to: 'bar2', fx: 0.8, wait: 600 },
      ],
    ],
    View: ({ st }) => (
      <>
        <div className="sd__table" style={{ '--cols': '1.7fr 46px 1fr 0.95fr 68px', '--grp': '#5a6dff' }}>
          <div className="sd__tr sd__th">
            <span className="sd__grp">Pharmacy stock</span>
            <span>Owner</span>
            <span>Stock</span>
            <span>Status</span>
            <span />
          </div>
          <div className="sd__tr" data-t="r0">
            <span><b>Paracetamol 500mg</b><small>PCM-500 · 8 boxes</small></span>
            <span><Av k="mark" /></span>
            <span><Bar pct={8} low /></span>
            <span>{st.ordered ? <Chip tone="blue">On order</Chip> : <Chip tone="red">Low</Chip>}</span>
            <span><span className={`sd__btn ${st.ordered ? 'is-done' : ''}`} data-t="reorder">{st.ordered ? 'PO-2041' : 'Reorder'}</span></span>
          </div>
          <div className="sd__tr">
            <span><b>Amoxicillin 250mg</b><small>AMX-250 · 310 boxes</small></span>
            <span><Av k="kate" /></span>
            <span><Bar pct={62} /></span>
            <span><Chip tone="green">In stock</Chip></span>
            <span />
          </div>
          <div className="sd__tr" data-t="r2">
            <span><b>Vitamin C 1000mg</b><small>VTC-1K · {st.received ? '440' : '230'} boxes</small></span>
            <span><Av k="joshua" /></span>
            <span><Bar pct={st.received ? 88 : 46} t="bar2" /></span>
            <span>{st.received ? <Chip tone="green">Received</Chip> : <Chip tone="yellow">Arriving</Chip>}</span>
            <span><span className={`sd__btn is-ghost ${st.received ? 'is-done' : ''}`} data-t="receive">{st.received ? 'Done' : 'Receive'}</span></span>
          </div>
          <div className="sd__tr">
            <span><b>Cetirizine 10mg</b><small>CTZ-10 · 205 boxes</small></span>
            <span><Av k="angel" /></span>
            <span><Bar pct={71} /></span>
            <span><Chip tone="green">In stock</Chip></span>
            <span />
          </div>
          <div className="sd__tr">
            <span><b>Ibuprofen 400mg</b><small>IBU-400 · 96 boxes</small></span>
            <span><Av k="jane" /></span>
            <span><Bar pct={34} /></span>
            <span><Chip tone="yellow">Reorder soon</Chip></span>
            <span />
          </div>
        </div>
        <MiniTable
          title="Purchase orders"
          grp="#f36b21"
          cols="1.7fr 46px 1fr 1fr"
          head="Units"
          rows={[
            ['PO-2041', 'MedSupply Co.', 'mark', st.ordered ? '200' : '—', st.ordered ? 'blue' : undefined, st.ordered ? 'Sent' : 'Draft'],
            ['PO-2038', 'PharmaHub', 'joshua', '220', 'yellow', 'In transit'],
          ]}
        />
      </>
    ),
  },

  people: {
    nav: ['Home', 'Employees', 'Onboarding', 'Time off', 'Reviews'],
    on: 2,
    title: 'Onboarding',
    action: '+ New hire',
    people: ['john', 'angel'],
    init: { c0: 1, c1: 1, msg: 'Preparing Ria’s first week' },
    scripts: [
      [
        { to: 'c2', click: 1, set: { c2: 1 }, wait: 650 },
        { to: 'c3', click: 1, set: { c3: 1, msg: 'Ria is ready for day one' }, wait: 1200 },
      ],
      [
        { wait0: 1900 },
        { to: 'approve', click: 1, set: { approved: 1, msg: 'Time off approved for Leo' }, wait: 800 },
      ],
    ],
    View: ({ st }) => {
      const tasks = [
        ['Offer signed', 'angel', 'Nov 28', 'c0'],
        ['Contract filed', 'john', 'Nov 29', 'c1'],
        ['Laptop shipped', 'john', 'Dec 1', 'c2'],
        ['Week one plan', 'angel', 'Dec 2', 'c3'],
      ]
      const cols = { '--cols': '1.6fr 46px 0.8fr 1fr 62px' }
      return (
        <>
          <div className="sd__table" style={{ ...cols, '--grp': '#3e8e2d' }}>
            <div className="sd__tr sd__th">
              <span className="sd__grp">Ria Santos · onboarding</span>
              <span>Owner</span>
              <span>Due</span>
              <span>Status</span>
              <span />
            </div>
            {tasks.map(([task, who, due, key], i) => (
              <div key={task} className="sd__tr">
                <span><b>{task}</b></span>
                <span><Av k={who} /></span>
                <span>{due}</span>
                <span data-t={key}>
                  {st[key] ? <Chip tone="green">Done</Chip> : i === 2 ? <Chip tone="yellow">Working on it</Chip> : <Chip>Not started</Chip>}
                </span>
                <span />
              </div>
            ))}
          </div>
          <div className="sd__table" style={{ ...cols, '--grp': '#5a6dff' }}>
            <div className="sd__tr sd__th">
              <span className="sd__grp">Time off requests</span>
              <span>Owner</span>
              <span>Days</span>
              <span>Status</span>
              <span />
            </div>
            <div className="sd__tr">
              <span><b>Leo Cruz</b><small>Dec 4 – 5</small></span>
              <span><Av k="mark" /></span>
              <span>2 days</span>
              <span>{st.approved ? <Chip tone="green">Approved</Chip> : <Chip tone="yellow">Pending</Chip>}</span>
              <span><span className={`sd__btn ${st.approved ? 'is-done' : ''}`} data-t="approve">{st.approved ? 'Done' : 'Approve'}</span></span>
            </div>
            <div className="sd__tr">
              <span><b>Ana Reyes</b><small>Dec 12</small></span>
              <span><Av k="jane" /></span>
              <span>1 day</span>
              <span><Chip tone="green">Approved</Chip></span>
              <span />
            </div>
          </div>
          <MiniTable
            title="Performance reviews"
            grp="#f36b21"
            cols="1.6fr 46px 0.8fr 1fr"
            head="Due"
            rows={[
              ['Carlo Mendoza', 'Sales · Q4', 'kate', 'Dec 8', 'yellow', 'In review'],
            ]}
          />
        </>
      )
    },
  },

  crm: {
    nav: ['Leads', 'Deals', 'Contacts', 'Forecast', 'Reports'],
    on: 1,
    title: 'Deals pipeline',
    action: '+ New deal',
    people: ['joshua', 'kate'],
    init: { msg: 'Updating the sales pipeline' },
    scripts: [
      [
        { to: 'd-acme', wait: 250 },
        { click: 1, carry: 'Acme Pharma · ₱120k', set: { lift_acme: 1 }, wait: 120 },
        { to: 'col-won', fy: 0.62, move: 1000 },
        { click: 1, carry: null, set: { acme: 'won', lift_acme: 0, msg: 'Acme Pharma moved to Won' }, wait: 900 },
      ],
      [
        { wait0: 2900 },
        { to: 'd-zen', wait: 200 },
        { click: 1, carry: 'Zen Clinic · ₱64k', set: { lift_zen: 1 }, wait: 120 },
        { to: 'col-prop', fy: 0.75, move: 900 },
        { click: 1, carry: null, set: { zen: 'prop', lift_zen: 0 }, wait: 600 },
      ],
    ],
    View: ({ st }) => {
      const deals = [
        { id: 'zen', name: 'Zen Clinic', amt: 64, col: st.zen || 'qual' },
        { id: 'lab', name: 'LabOne', amt: 42, col: 'qual' },
        { id: 'acme', name: 'Acme Pharma', amt: 120, col: st.acme || 'prop' },
        { id: 'north', name: 'North Hospital', amt: 210, col: 'prop' },
        { id: 'mega', name: 'MegaDrug', amt: 88, col: 'won' },
      ]
      const cols = [['qual', 'Qualified'], ['prop', 'Proposal'], ['won', 'Won']]
      return (
        <>
        <div className="sd__cols">
          {cols.map(([key, label]) => {
            const list = deals.filter((d) => d.col === key)
            const sum = list.reduce((a, d) => a + d.amt, 0)
            return (
              <div key={key} className="sd__col" data-t={`col-${key}`} data-won={key === 'won' || undefined}>
                <h6>
                  {label}
                  <span key={sum}>₱{sum}k</span>
                </h6>
                {list.map((d) =>
                  st[`lift_${d.id}`] ? (
                    <div key={d.id} className="sd__deal is-ghost" />
                  ) : (
                    <div key={`${d.id}-${d.col}`} className="sd__deal" data-t={`d-${d.id}`}>
                      {d.name}
                      <small>₱{d.amt}k</small>
                    </div>
                  ),
                )}
              </div>
            )
          })}
        </div>
        <MiniTable
          title="Next follow-ups"
          grp="#5a6dff"
          cols="1.6fr 46px 0.9fr 1fr"
          head="When"
          rows={[
            ['North Hospital', 'Send revised quote', 'kate', 'Today', 'red', 'Due today'],
            ['Zen Clinic', 'Product demo', 'joshua', 'Thu', 'blue', 'Booked'],
          ]}
        />
        </>
      )
    },
  },

  analytics: {
    nav: ['Overview', 'Sales', 'Stock', 'People', 'Finance'],
    on: 0,
    title: 'Company overview',
    action: 'Share report',
    people: ['angel', 'jane'],
    init: { msg: 'Reading live numbers from every system' },
    scripts: [
      [
        { to: 'month', click: 1, set: { range: 'month' }, wait: 1000 },
        { to: 'bar6', fy: 0.25, set: { tip: 6 }, wait: 1300 },
      ],
      [
        { wait0: 2600 },
        { to: 'action', click: 1, set: { msg: 'Report sent to leadership' }, wait: 1800 },
      ],
    ],
    View: ({ st }) => {
      const month = st.range === 'month'
      const vals = month ? [55, 62, 58, 70, 74, 82, 94] : [42, 58, 50, 72, 64, 80, 76]
      const labels = month ? ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S']
      return (
        <>
          <div className="sd__chart">
            <div className="sd__chart-head">
              <b>Sales</b>
              <span className="sd__seg">
                <span className={!month ? 'is-on' : ''} data-t="week">Week</span>
                <span className={month ? 'is-on' : ''} data-t="month">Month</span>
              </span>
            </div>
            <div className="sd__bars">
              {vals.map((v, i) => (
                <span key={i} data-t={`bar${i}`} className={st.tip === i ? 'is-hot' : ''} style={{ height: `${v}%` }}>
                  {st.tip === i ? <em className="sd__tip">₱1.42M · best month</em> : null}
                </span>
              ))}
            </div>
            <div className="sd__axis">
              {labels.map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </div>
          </div>
          <MiniTable
            title="Top products"
            grp="#3e8e2d"
            cols="1.6fr 46px 0.9fr 1fr"
            head="Sales"
            rows={[
              ['Paracetamol 500mg', 'Pharmacy', 'mark', month ? '₱1.9M' : '₱460k', 'green', '▲ 12%'],
              ['Vitamin C 1000mg', 'Wellness', 'jane', month ? '₱1.1M' : '₱270k', 'yellow', '▼ 3%'],
            ]}
          />
        </>
      )
    },
  },

  books: {
    nav: ['Dashboard', 'Invoices', 'Bills', 'Banking', 'Reports'],
    on: 1,
    title: 'Invoices',
    action: '+ New invoice',
    people: ['jane', 'mark'],
    init: { msg: 'Closing this month’s invoices' },
    scripts: [
      [
        { to: 'r0', fx: 0.3, wait: 200 },
        { to: 'send', click: 1, set: { sent: 1, msg: 'INV-1044 emailed to Acme Pharma' }, wait: 1700 },
      ],
      [
        { wait0: 1900 },
        { to: 'pay', click: 1, set: { paid: 1, msg: 'Payment matched to INV-1043' }, wait: 1300 },
      ],
    ],
    View: ({ st }) => (
      <>
        <div className="sd__table" style={{ '--cols': '1.4fr 46px 0.9fr 0.85fr 88px', '--grp': '#3e8e2d' }}>
          <div className="sd__tr sd__th">
            <span className="sd__grp">This month</span>
            <span>Owner</span>
            <span>Amount</span>
            <span>Status</span>
            <span />
          </div>
          <div className="sd__tr" data-t="r0">
            <span><b>INV-1044</b><small>Acme Pharma</small></span>
            <span><Av k="jane" /></span>
            <span>₱24,800</span>
            <span>{st.sent ? <Chip tone="blue">Sent</Chip> : <Chip>Draft</Chip>}</span>
            <span><span className={`sd__btn ${st.sent ? 'is-done' : ''}`} data-t="send">{st.sent ? 'Sent' : 'Send'}</span></span>
          </div>
          <div className="sd__tr">
            <span><b>INV-1043</b><small>Zen Clinic</small></span>
            <span><Av k="mark" /></span>
            <span>₱18,400</span>
            <span>{st.paid ? <Chip tone="green">Paid</Chip> : <Chip tone="yellow">Due Fri</Chip>}</span>
            <span><span className={`sd__btn is-ghost ${st.paid ? 'is-done' : ''}`} data-t="pay">{st.paid ? 'Matched' : 'Record'}</span></span>
          </div>
          <div className="sd__tr">
            <span><b>INV-1042</b><small>North Hospital</small></span>
            <span><Av k="kate" /></span>
            <span>₱36,200</span>
            <span><Chip tone="red">Overdue</Chip></span>
            <span><span className="sd__btn is-ghost">Remind</span></span>
          </div>
          <div className="sd__tr">
            <span><b>BILL-208</b><small>MedSupply Co.</small></span>
            <span><Av k="angel" /></span>
            <span>₱52,000</span>
            <span><Chip tone="green">Matched</Chip></span>
            <span />
          </div>
        </div>
        <MiniTable
          title="Bills to pay"
          grp="#5a6dff"
          cols="1.4fr 46px 0.9fr 1fr"
          head="Amount"
          rows={[
            ['BILL-211', 'PharmaHub', 'angel', '₱31,500', 'yellow', 'Due Mon'],
            ['BILL-210', 'City Power', 'mark', '₱8,900', 'green', 'Scheduled'],
          ]}
        />
      </>
    ),
  },

  finance: {
    nav: ['Overview', 'Budgets', 'Cash flow', 'Approvals', 'Reports'],
    on: 1,
    title: 'Budgets · Q4',
    action: 'Export',
    people: ['kate', 'john'],
    init: { msg: 'Reviewing Q4 budgets' },
    scripts: [
      [
        { to: 'approve', click: 1, set: { approved: 1, msg: 'Trade fair spend approved' }, wait: 500 },
        { to: 'b-mkt', fx: 0.7, wait: 1000 },
      ],
      [
        { wait0: 1500 },
        { to: 'b-ppl', set: { msg: 'People budget at 88% · flagged early' }, wait: 1200 },
      ],
    ],
    View: ({ st }) => {
      const rows = [
        ['Sales', 'jane', 72, '₱720k of ₱1M'],
        ['Operations', 'mark', 54, '₱430k of ₱800k'],
        ['Marketing', 'kate', st.approved ? 58 : 40, st.approved ? '₱58k of ₱100k' : '₱40k of ₱100k', 'b-mkt'],
        ['People', 'angel', 88, '₱350k of ₱400k', 'b-ppl'],
      ]
      const cols = { '--cols': '1.2fr 46px 1.5fr 0.9fr 62px' }
      return (
        <>
          <div className="sd__table" style={{ ...cols, '--grp': '#f36b21' }}>
            <div className="sd__tr sd__th">
              <span className="sd__grp">Q4 budgets</span>
              <span>Owner</span>
              <span>Spent</span>
              <span>Status</span>
              <span />
            </div>
            {rows.map(([dept, who, pct, note, t]) => (
              <div key={dept} className="sd__tr" data-t={t}>
                <span><b>{dept}</b></span>
                <span><Av k={who} /></span>
                <span className="sd__spent">
                  <Bar pct={pct} low={pct > 85} />
                  <small key={note}>{note}</small>
                </span>
                <span>{pct > 85 ? <Chip tone="yellow">At risk</Chip> : <Chip tone="green">On track</Chip>}</span>
                <span />
              </div>
            ))}
          </div>
          <div className="sd__table" style={{ ...cols, '--grp': '#5a6dff' }}>
            <div className="sd__tr sd__th">
              <span className="sd__grp">Spend requests</span>
              <span>Owner</span>
              <span>Amount</span>
              <span>Status</span>
              <span />
            </div>
            <div className="sd__tr">
              <span><b>Trade fair booth</b><small>Marketing</small></span>
              <span><Av k="kate" /></span>
              <span>₱18,000</span>
              <span>{st.approved ? <Chip tone="green">Approved</Chip> : <Chip tone="yellow">Pending</Chip>}</span>
              <span><span className={`sd__btn ${st.approved ? 'is-done' : ''}`} data-t="approve">{st.approved ? 'Done' : 'Approve'}</span></span>
            </div>
          </div>
          <MiniTable
            title="Cash flow · this week"
            grp="#3e8e2d"
            cols="1.2fr 46px 1.5fr 0.9fr"
            head="Amount"
            rows={[
              ['Money in', 'Customer payments', 'jane', '₱860,000', 'green', 'Healthy'],
              ['Money out', 'Payroll + suppliers', 'mark', '₱640,000', 'blue', 'Planned'],
            ]}
          />
        </>
      )
    },
  },

  workdrive: {
    nav: ['My files', 'Team folders', 'Shared', 'Recent', 'Trash'],
    on: 1,
    title: 'Team folders',
    action: '+ Upload',
    people: ['kate', 'joshua'],
    init: { msg: 'Filing team documents' },
    scripts: [
      [
        { to: 'file0', fx: 0.3, wait: 200 },
        { click: 1, carry: 'Supplier contract.pdf', set: { lift: 1 }, wait: 120 },
        { to: 'f-contracts', move: 1000, set: { hot: 1 } },
        { click: 1, carry: null, set: { moved: 1, lift: 0, hot: 0, msg: 'Moved to Contracts' }, wait: 1600 },
      ],
      [
        { wait0: 2600 },
        { to: 'share', click: 1, set: { shared: 1, msg: 'Price list shared with Sales' }, wait: 700 },
      ],
    ],
    View: ({ st }) => {
      const folders = [
        ['f-contracts', 'Contracts', st.moved ? 13 : 12, '#5a6dff'],
        ['f-price', 'Price lists', 8, '#59ba43'],
        ['f-hr', 'HR documents', 24, '#ffd900'],
        ['f-inv', 'Invoices', 96, '#f36b21'],
      ]
      return (
        <>
          <div className="sd__folders">
            {folders.map(([t, name, count, color]) => (
              <div key={t} className={`sd__folder ${t === 'f-contracts' && st.hot ? 'is-hot' : ''}`} data-t={t} style={{ '--f': color }}>
                <span className="sd__fico" />
                <b>{name}</b>
                <small key={count}>{count} files</small>
              </div>
            ))}
          </div>
          <div className="sd__table" style={{ '--cols': '1.9fr 1fr 96px', '--grp': '#f36b21' }}>
            <div className="sd__tr sd__th">
              <span className="sd__grp">Recent files</span>
              <span>Folder</span>
              <span />
            </div>
            <div className={`sd__tr ${st.lift ? 'is-lifted' : ''}`} data-t="file0">
              <span className="sd__file"><span className="sd__ftype" data-type="PDF">PDF</span><span><b>Supplier contract.pdf</b><small>Edited 2 min ago</small></span></span>
              <span>{st.moved ? <Chip tone="blue">Contracts</Chip> : <Chip>Uploads</Chip>}</span>
              <span />
            </div>
            <div className="sd__tr">
              <span className="sd__file"><span className="sd__ftype" data-type="XLS">XLS</span><span><b>Price list 2026.xlsx</b><small>Version 12</small></span></span>
              <span><Chip tone="green">Price lists</Chip></span>
              <span><span className={`sd__btn is-ghost ${st.shared ? 'is-done' : ''}`} data-t="share">{st.shared ? 'Shared' : 'Share'}</span></span>
            </div>
            <div className="sd__tr">
              <span className="sd__file"><span className="sd__ftype" data-type="DOC">DOC</span><span><b>Onboarding guide.docx</b><small>Version 2</small></span></span>
              <span><Chip tone="yellow">HR documents</Chip></span>
              <span />
            </div>
          </div>
          <MiniTable
            title="Waiting for approval"
            grp="#5a6dff"
            cols="1.9fr 46px 0.8fr 1fr"
            head="Size"
            rows={[
              ['NDA · LabOne.pdf', 'Contracts', 'kate', '1.2 MB', 'yellow', 'Needs sign-off'],
              ['Q4 price update.xlsx', 'Price lists', 'joshua', '340 KB', 'green', 'Approved'],
            ]}
          />
        </>
      )
    },
  },

  desk: {
    nav: ['Inbox', 'My tickets', 'Customers', 'Reports', 'Settings'],
    on: 0,
    title: 'Inbox',
    action: '+ New ticket',
    people: ['mark', 'angel'],
    init: { open: -1, msg: 'Answering customer tickets' },
    scripts: [
      [
        { to: 't0', fx: 0.4, click: 1, set: { open: 0 }, wait: 500 },
        { to: 'reply', fx: 0.3, click: 1, wait: 100 },
        { type: ['reply', 'Sorry about that! Two new boxes ship today.'], wait: 250 },
        { to: 'send', click: 1, set: { solved: 1, msg: 'Reply sent · ticket solved' }, wait: 1600 },
      ],
      [
        { wait0: 1300 },
        { to: 'assign', click: 1, set: { assigned: 1 }, wait: 700 },
      ],
    ],
    View: ({ st }) => (
      <>
      <div className="sd__desk">
        <div className="sd__tickets">
          <div className={`sd__ticket ${st.open === 0 ? 'is-on' : ''}`} data-t="t0">
            <b>Order arrived damaged</b>
            <small>Acme Pharma · #2081</small>
            {st.solved ? <Chip tone="green">Solved</Chip> : <Chip tone="red">High · Open</Chip>}
          </div>
          <div className="sd__ticket">
            <b>Change delivery address</b>
            <small>Zen Clinic · #2080</small>
            <span className={`sd__assign ${st.assigned ? 'is-done' : ''}`} data-t="assign">
              {st.assigned ? 'Angel' : 'Assign to me'}
            </span>
          </div>
          <div className="sd__ticket">
            <b>Invoice copy request</b>
            <small>North Hospital · #2079</small>
            <Chip tone="blue">Replied</Chip>
          </div>
        </div>
        <div className="sd__card sd__detail">
          {st.open === 0 ? (
            <>
              <h6>Acme Pharma · order history</h6>
              <span className="sd__ctx">
                <Chip tone="blue">SO-3318 · delivered Tue</Chip>
                <Chip tone="yellow">INV-1044 · ₱24,800</Chip>
              </span>
              <p className="sd__msg">Two boxes of Paracetamol arrived crushed. Can you replace them?</p>
              <div className={`sd__reply ${st.reply !== undefined && !st.solved ? 'is-typing' : ''}`} data-t="reply">
                {st.reply || <span className="sd__ph">Write a reply…</span>}
              </div>
              <span className={`sd__btn sd__send ${st.solved ? 'is-done' : ''}`} data-t="send">{st.solved ? 'Sent' : 'Send'}</span>
            </>
          ) : (
            <span className="sd__empty">Select a ticket to see the customer’s orders, invoices and history.</span>
          )}
        </div>
      </div>
      <MiniTable
        title="SLA watch"
        grp="#fd4040"
        cols="1.6fr 46px 0.9fr 1fr"
        head="Time left"
        rows={[
          ['#2078 · Refund request', 'MegaDrug', 'mark', '25 min', 'red', 'At risk'],
          ['#2077 · Login help', 'LabOne', 'angel', '3 h', 'green', 'On track'],
        ]}
      />
      </>
    ),
  },
}

function Cursor({ c, p }) {
  return (
    <div className={`sd__cursor ${c.flip ? "is-flip" : ""}`} style={{ transform: `translate(${c.x}px, ${c.y}px)`, '--c': p.c, '--ci': p.ci || '#fff' }}>
      <span className="sd__ptr" style={{ '--d': p.d }}>
      <span key={c.click} className={`sd__ripple ${c.click ? 'is-on' : ''}`} />
      <svg width="16" height="18" viewBox="0 0 18 20">
        <path d="M1 1l15 7.2-6.6 1.9-3.1 6.4z" fill={p.c} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="sd__tag">
        <span className="sd__face">{p.name[0]}</span>
        {p.name}
      </span>
      {c.carry ? <span className="sd__carry">{c.carry}</span> : null}
      </span>
    </div>
  )
}

export default function SystemDemo({ id }) {
  const scene = SCENES[id] || SCENES.inventory
  const sys = systems.find((s) => s.id === id) || systems[0]
  const rootRef = useRef(null)
  const [st, setSt] = useState(scene.init || {})
  const [cycle, setCycle] = useState(0)
  const startCursors = () =>
    scene.people.map((_, i) => ({ x: i ? 420 : 150, y: i ? 70 : 300, click: 0, carry: null }))
  const [cur, setCur] = useState(startCursors)

  useEffect(() => {
    let dead = false
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const upd = (i, fn) => setCur((list) => list.map((v, j) => (j === i ? { ...v, ...fn(v) } : v)))

    // Target position inside the window, corrected for any scale on an
    // ancestor (the panel pops in with a transform).
    const posOf = (t, fx = 0.5, fy = 0.55) => {
      const root = rootRef.current
      const el = root?.querySelector(`[data-t="${t}"]`)
      if (!el) return null
      const a = root.getBoundingClientRect()
      const b = el.getBoundingClientRect()
      const k = root.offsetWidth ? a.width / root.offsetWidth : 1
      const x = (b.left - a.left + b.width * fx) / k
      return { x, y: (b.top - a.top + b.height * fy) / k, flip: x > root.offsetWidth - 120 }
    }

    const run = async (steps, i) => {
      for (const s of steps) {
        if (s.wait0) await sleep(s.wait0)
        if (dead) return
        if (s.to) {
          const p = posOf(s.to, s.fx, s.fy)
          if (p) upd(i, () => p)
          await sleep(s.move ?? 850)
        }
        if (dead) return
        if (s.click) {
          upd(i, (v) => ({ click: v.click + 1 }))
          await sleep(180)
        }
        if ('carry' in s) upd(i, () => ({ carry: s.carry }))
        if (s.set) setSt((prev) => ({ ...prev, ...s.set }))
        if (s.type) {
          const [key, text] = s.type
          for (let n = 0; n <= text.length; n++) {
            if (dead) return
            setSt((prev) => ({ ...prev, [key]: text.slice(0, n) }))
            await sleep(30)
          }
        }
        await sleep(s.wait ?? 450)
      }
    }

    const loop = async () => {
      await sleep(750)
      while (!dead) {
        await Promise.all(scene.scripts.map((steps, i) => run(steps, i)))
        await sleep(2200)
        if (dead) return
        // Reset and replay, with the rows animating in again.
        setSt(scene.init || {})
        setCur((list) => list.map((v, i) => ({ ...startCursors()[i], click: v.click })))
        setCycle((n) => n + 1)
        await sleep(1100)
      }
    }
    loop()
    return () => {
      dead = true
    }
  }, [scene])

  const View = scene.View

  return (
    <div className="sd" ref={rootRef} aria-hidden="true">
      <div className="sd__header">
        <div className="sd__titlebar">
          <img src={sys.logo} alt="" width="20" height="20" />
          <h5>{scene.title}</h5>
          <span className="sd__live">
            <i /> Live
          </span>
          <span className="sd__team">
            {scene.people.map((k) => (
              <span key={k} className="sd__face sd__face--sm" style={{ '--c': PEOPLE[k].c, '--ci': PEOPLE[k].ci || '#fff' }}>
                {PEOPLE[k].name[0]}
              </span>
            ))}
          </span>
        </div>
        <div className="sd__tabs">
          {scene.nav.slice(0, 4).map((n, i) => (
            <span key={n} className={i === scene.on ? 'is-on' : ''}>
              {n}
            </span>
          ))}
          <span className="sd__tab-add">+</span>
          <span className="sd__btn sd__action" data-t="action">
            {scene.action}
          </span>
        </div>
      </div>

      <div className="sd__main">
        <div className="sd__view" key={cycle}>
          <View st={st} />
        </div>
      </div>

      {/* What the team is doing right now */}
      <div className="sd__caption">
        <span className="sd__caption-logo">
          <img src={sys.logo} alt="" width="16" height="16" />
        </span>
        <span key={st.msg}>{st.msg}</span>
      </div>

      {scene.people.map((k, i) => (
        <Cursor key={k} c={cur[i]} p={PEOPLE[k]} />
      ))}
    </div>
  )
}
