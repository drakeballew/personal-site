import clsx from 'clsx'

export function Prose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'prose dark:prose-invert text-zinc-600 dark:text-zinc-400 prose-p:mb-8 prose-p:mt-0 first:prose-p:mt-0'
      )}
      {...props}
    />
  )
}
