import clsx from 'clsx';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={clsx('px-6 py-16 md:py-24', className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
