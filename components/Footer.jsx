"use client";

import Link from "next/link";
import { Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-beige-border bg-beige-surface pt-20 pb-10">
      <div className="mx-auto grid w-[92vw] max-w-[1180px] gap-12 md:grid-cols-[1fr_2fr]">
        <div className="max-w-sm">
          <Link href="/" className="font-display text-2xl font-bold tracking-tight text-ink-primary">
            SOUND<span className="text-primary">HOUSE</span>
          </Link>
          <p className="mt-6 text-ink-secondary leading-relaxed font-medium">
            A modern space to learn, practice, and play real music. Stop waiting to be good enough.
          </p>
          <div className="mt-8 flex gap-4">
            {[Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-beige-surface border border-beige-border text-ink-secondary transition-colors hover:bg-primary hover:text-white hover:border-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h4 className="font-bold text-ink-primary mb-6">Learn</h4>
            <ul className="space-y-4 text-sm font-medium text-ink-secondary/80">
              <li><Link href="/classes" className="hover:text-primary transition-colors">Guitar Classes</Link></li>
              <li><Link href="/classes" className="hover:text-primary transition-colors">Piano Classes</Link></li>
              <li><Link href="/classes" className="hover:text-primary transition-colors">Drums Classes</Link></li>
              <li><Link href="/classes" className="hover:text-primary transition-colors">Vocal Coaching</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-ink-primary mb-6">Studio</h4>
            <ul className="space-y-4 text-sm font-medium text-ink-secondary/80">
              <li><Link href="/teachers" className="hover:text-primary transition-colors">Our Teachers</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-primary transition-colors">How it works</Link></li>
              <li><Link href="/#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/classes#schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-bold text-ink-primary mb-6">Visit us</h4>
            <address className="not-italic space-y-4 text-sm font-medium text-ink-secondary/80">
              <p>42 Harmonic Avenue<br/>Mumbai, MH 400050</p>
              <p>hello@soundhouse.in<br/>+91 98765 43210</p>
            </address>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 flex w-[92vw] max-w-[1180px] flex-col items-center justify-between border-t border-beige-border pt-8 text-xs font-medium text-ink-secondary/60 sm:flex-row">
        <p>© {new Date().getFullYear()} SoundHouse Music Classes. All rights reserved.</p>
        <div className="mt-4 flex gap-6 sm:mt-0">
          <a href="#" className="hover:text-ink-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-ink-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

