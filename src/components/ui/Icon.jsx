/**
 * One inline SVG sprite for the whole site — keeps the bundle free of an icon
 * dependency and lets every glyph inherit currentColor.
 */
const paths = {
  arrowRight: (
    <path
      d="M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  arrowUpRight: (
    <path
      d="M7 17 17 7m0 0H9m8 0v8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  arrowLeft: (
    <path
      d="M19 12H6m0 0 5.5-5.5M6 12l5.5 5.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  chevronDown: (
    <path
      d="m6 9.5 6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  check: (
    <path
      d="m5 12.5 4.5 4.5L19 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  close: (
    <path
      d="M6 6 18 18M18 6 6 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  ),
  menu: (
    <path
      d="M4 7h16M4 12h16M4 17h16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  ),
  play: <path d="M9 7.5v9l7.5-4.5z" fill="currentColor" />,
  plus: (
    <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  ),
  minus: <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
  star: (
    <path
      d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1.05 5.9L12 17l-5.25 2.8L7.8 13.9 3.5 9.8l5.9-.8z"
      fill="currentColor"
    />
  ),
  sparkle: (
    <path
      d="M12 3.2 13.9 9l5.8 1.9-5.8 1.9L12 18.6 10.1 12.8 4.3 10.9 10.1 9zM18.6 3l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8z"
      fill="currentColor"
    />
  ),
  bolt: (
    <path d="M13.5 2 5 13.4h5.2L9.8 22 19 10.4h-5.4z" fill="currentColor" />
  ),
  shield: (
    <path
      d="M12 3 5 5.8v5.6c0 4.3 2.9 8.2 7 9.6 4.1-1.4 7-5.3 7-9.6V5.8z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  ),
  globe: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.4 12h17.2M12 3.4c2.2 2.4 3.4 5.4 3.4 8.6S14.2 18.2 12 20.6C9.8 18.2 8.6 15.2 8.6 12S9.8 5.8 12 3.4z" />
    </g>
  ),
  pipeline: (
    <g fill="currentColor">
      <rect x="3" y="4.5" width="5" height="15" rx="2" opacity="0.45" />
      <rect x="9.5" y="4.5" width="5" height="10" rx="2" opacity="0.75" />
      <rect x="16" y="4.5" width="5" height="6" rx="2" />
    </g>
  ),
  people: (
    <g fill="currentColor">
      <circle cx="9" cy="8.5" r="3.6" />
      <path d="M2.8 20c0-3.4 2.8-5.6 6.2-5.6s6.2 2.2 6.2 5.6z" opacity="0.75" />
      <circle cx="17.4" cy="9.4" r="2.7" opacity="0.55" />
      <path d="M15 20h6.4c0-2.6-1.6-4.4-3.9-4.7" opacity="0.4" />
    </g>
  ),
  board: (
    <g fill="currentColor">
      <rect x="3" y="4" width="18" height="16" rx="3.4" opacity="0.28" />
      <rect x="6" y="7.4" width="6.4" height="2.6" rx="1.3" />
      <rect x="6" y="11.4" width="10.4" height="2.6" rx="1.3" opacity="0.8" />
      <rect x="6" y="15.4" width="4.4" height="2.6" rx="1.3" opacity="0.6" />
    </g>
  ),
  headset: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4.5 13v-1a7.5 7.5 0 1 1 15 0v1" />
      <rect x="2.8" y="12.6" width="4.2" height="6.4" rx="2.1" fill="currentColor" stroke="none" />
      <rect x="17" y="12.6" width="4.2" height="6.4" rx="2.1" fill="currentColor" stroke="none" />
      <path d="M19.2 19v.6a2.6 2.6 0 0 1-2.6 2.6H13" />
    </g>
  ),
  chart: (
    <g fill="currentColor">
      <rect x="3.5" y="12" width="4" height="8" rx="1.8" opacity="0.5" />
      <rect x="10" y="7" width="4" height="13" rx="1.8" opacity="0.78" />
      <rect x="16.5" y="3.5" width="4" height="16.5" rx="1.8" />
    </g>
  ),
  automation: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6.5" cy="6.5" r="3" />
      <circle cx="17.5" cy="17.5" r="3" />
      <path d="M9.5 6.5h5a3 3 0 0 1 3 3v5M14.5 17.5h-5a3 3 0 0 1-3-3v-5" />
    </g>
  ),
  puzzle: (
    <path
      d="M10.2 3h3.6v2a1.8 1.8 0 1 0 3.6 0h2.6v3.6h-2a1.8 1.8 0 1 0 0 3.6h2V21h-6v-2.4a1.8 1.8 0 1 0-3.6 0V21H4V15h2a1.8 1.8 0 1 0 0-3.6H4V6.6h2.6a1.8 1.8 0 1 0 3.6 0z"
      fill="currentColor"
    />
  ),
  quote: (
    <path
      d="M9.4 6C6.3 7.4 4.4 10.2 4.4 13.6c0 2.8 1.7 4.6 4 4.6 2 0 3.5-1.5 3.5-3.4 0-1.9-1.3-3.3-3.1-3.3-.3 0-.7 0-.9.1.4-1.6 1.7-3 3.4-3.8zm9.2 0c-3.1 1.4-5 4.2-5 7.6 0 2.8 1.7 4.6 4 4.6 2 0 3.5-1.5 3.5-3.4 0-1.9-1.3-3.3-3.1-3.3-.3 0-.7 0-.9.1.4-1.6 1.7-3 3.4-3.8z"
      fill="currentColor"
    />
  ),
}

export default function Icon({ name, size = 20, className = '', ...rest }) {
  const glyph = paths[name]
  if (!glyph) return null
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}
