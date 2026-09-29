import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0B111E] text-white">
      <div className="container py-16">
        {/* Top grid */}
        <div className="grid gap-12 md:grid-cols-[1.4fr_.7fr_.7fr]">
          {/* Brand */}
          <div>
            <div className="mb-5 text-4xl font-bold tracking-tight">HN</div>
            <p className="max-w-md text-slate-400">
              Building modern websites, applications, AI solutions and scalable
              digital products from ideas to launch.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 font-bold">Explore</h3>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/services">Services</Link>
              <Link href="/work">Work</Link>
              <Link href="/process">Process</Link>
              <Link href="/about">About</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-bold">Start a project</h3>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/contact">Project inquiry</Link>
              <a href="mailto:hello@hn.example">hello@hn.example</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row">
          <span>© {new Date().getFullYear()} HN. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookie-policy">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
