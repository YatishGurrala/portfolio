import Link from "next/link";
import { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}

export function ButtonLink({ href, children, variant = "primary", external = false }: ButtonLinkProps) {
  const isPrimary = variant === "primary";
  const className = "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5";
  const style = isPrimary
    ? {
        backgroundColor: "var(--button-primary-bg)",
        color: "var(--button-primary-fg)",
        borderColor: "var(--button-primary-border)",
      }
    : {
        backgroundColor: "var(--button-secondary-bg)",
        color: "var(--button-secondary-fg)",
        borderColor: "var(--button-secondary-border)",
      };

  if (external) {
    return (
      <a className={className} style={style} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} style={style} href={href}>
      {children}
    </Link>
  );
}
