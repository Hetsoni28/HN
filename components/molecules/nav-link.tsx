import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  mobile?: boolean;
}

export function NavLink({ href, label, onClick, mobile = false }: NavLinkProps) {
  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="border-b border-slate-100 py-4 font-semibold"
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="text-sm font-semibold text-slate-600 transition hover:text-[#0051FF]"
    >
      {label}
    </Link>
  );
}
