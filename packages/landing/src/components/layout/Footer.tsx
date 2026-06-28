'use client';

export function Footer() {
  return (
    <footer className="bg-surface-container-highest text-on-surface py-12 border-t border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
            <span className="font-display-lg text-lg tracking-tighter text-on-surface">
              Oscilink
            </span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="font-body-base text-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="font-body-base text-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="font-body-base text-sm text-on-surface-variant hover:text-primary transition-colors">Contact Us</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
          <p className="font-body-base text-xs text-on-surface-variant">
            &copy; {new Date().getFullYear()} Oscilink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
