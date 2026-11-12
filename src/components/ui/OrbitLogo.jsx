import './OrbitLogo.css'

/**
 * Bishnoi One logo: the "B" orbit mark (public/bishnoi-logo.png, cropped from
 * the master artwork in public/favicon.ico) beside a typeset wordmark.
 *
 * - `variant="lockup"` is the larger navbar size.
 * - `tone="light"` flips the word white for dark backgrounds.
 * - `compact` shows the mark only.
 */
export default function OrbitLogo({
  variant = 'mark',
  tone = 'dark',
  compact = false,
  className = '',
}) {
  return (
    <span
      className={`orbit-logo ${variant === 'lockup' ? 'orbit-logo--lockup' : ''} ${className}`.trim()}
    >
      <img
        className="orbit-logo__mark"
        src="/bishnoi-logo.png"
        width="320"
        height="256"
        alt={compact ? 'Bishnoi One' : ''}
        decoding="async"
      />
      {!compact && (
        <span className="orbit-logo__word" data-tone={tone}>
          Bishnoi <span className="orbit-logo__accent">One</span>
        </span>
      )}
    </span>
  )
}
