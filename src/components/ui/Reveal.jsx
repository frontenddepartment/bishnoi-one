import { useInView } from '../../hooks/useInView.js'

/**
 * Wraps children in a scroll-triggered reveal. Pass `as` to change the element,
 * `direction` for the entry vector and `delay` (ms) to stagger a group.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  className = '',
  threshold,
  ...rest
}) {
  const [ref, inView] = useInView(threshold ? { threshold } : undefined)

  return (
    <Tag
      ref={ref}
      data-direction={direction}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
