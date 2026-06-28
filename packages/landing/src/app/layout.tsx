import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://oscilink.com'),
  title: 'Oscilink — Free Browser-Based Arduino Simulator',
  description: 'Build Arduino circuits and simulate them in your browser. Write real code, drag components, watch your LED blink. Free, no installation, no hardware required.',
  keywords: 'arduino simulator, browser arduino, free circuit simulator, arduino online, avr simulator, learn arduino',
  openGraph: {
    title: 'Oscilink — Arduino Simulator',
    description: 'Build circuits and simulate Arduino in your browser. Free forever.',
    type: 'website',
    url: 'https://oscilink.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oscilink — Arduino Simulator',
    description: 'Free browser-based Arduino circuit simulator.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="light">
        <head>
          <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600&family=JetBrains+Mono:wght@400;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
          <style dangerouslySetInnerHTML={{ __html: `
            .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
            .glass-panel { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(118, 166, 147, 0.1); }
            .circuit-grid { background-image: radial-gradient(circle, rgba(118, 166, 147, 0.1) 1px, transparent 1px); background-size: 32px 32px; }
            @keyframes blink { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 8px #ba1a1a); } 50% { opacity: 0.3; filter: drop-shadow(0 0 1px #ba1a1a); } }
            .led-blink { animation: blink 1s infinite; }
            .soft-shadow { box-shadow: 0 4px 20px -2px rgba(44, 94, 74, 0.1); }
            @keyframes led-pulse { 0%, 100% { opacity: 1; transform: scale(1); filter: brightness(1.6); } 50% { opacity: 0.6; transform: scale(1.1); filter: brightness(1); } }
            @keyframes drag-arduino { 0% { top: 48%; left: 12.5%; transform: translate(-50%, -50%) scale(0.75); opacity: 0; background-color: white; border-color: rgba(118, 166, 147, 0.2); } 10% { top: 48%; left: 12.5%; transform: translate(-50%, -50%) scale(0.75); opacity: 1; background-color: white; border-color: rgba(118, 166, 147, 0.2); } 20% { top: 48%; left: 12.5%; transform: translate(-50%, -50%) scale(0.85); opacity: 1; background-color: white; border-color: rgba(118, 166, 147, 0.2); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2); } 60% { top: 50%; left: 62.5%; transform: translate(-50%, -50%) scale(2.7) rotate(5deg); opacity: 1; background-color: transparent; border-color: transparent; box-shadow: none; } 70% { top: 50%; left: 62.5%; transform: translate(-50%, -50%) scale(2.5) rotate(0deg); opacity: 1; background-color: transparent; border-color: transparent; box-shadow: none; } 95% { top: 50%; left: 62.5%; transform: translate(-50%, -50%) scale(2.5) rotate(0deg); opacity: 1; background-color: transparent; border-color: transparent; box-shadow: none; } 100% { top: 50%; left: 62.5%; transform: translate(-50%, -50%) scale(2.5) rotate(0deg); opacity: 0; background-color: transparent; border-color: transparent; box-shadow: none; } }
            @keyframes cursor-drop { 0%, 70% { transform: translateY(0) translateX(0); opacity: 1; } 85% { transform: translateY(150px) translateX(50px); opacity: 0; } 100% { transform: translateY(150px) translateX(50px); opacity: 0; } }
            @keyframes click-ring { 0%, 15% { opacity: 0; transform: scale(0.5); } 20% { opacity: 1; transform: scale(1); } 65% { opacity: 1; transform: scale(1); } 70%, 100% { opacity: 0; transform: scale(1.5); } }
            @keyframes type-l1 { 0% { width: 0ch; border-right: 2px solid #333333; opacity: 1; animation-timing-function: steps(14, end); } 20% { width: 14ch; border-right: 2px solid #333333; opacity: 1; } 21%, 90% { width: 14ch; border-right: 2px solid transparent; opacity: 1; } 91%, 100% { width: 0ch; border-right: 2px solid transparent; opacity: 0; } }
            @keyframes type-l2 { 0%, 20% { width: 0ch; border-right: 2px solid transparent; opacity: 0; } 20.1% { width: 0ch; border-right: 2px solid #333333; opacity: 1; animation-timing-function: steps(22, end); } 50% { width: 22ch; border-right: 2px solid #333333; opacity: 1; } 51%, 90% { width: 22ch; border-right: 2px solid transparent; opacity: 1; } 91%, 100% { width: 0ch; border-right: 2px solid transparent; opacity: 0; } }
            @keyframes type-l3 { 0%, 50% { width: 0ch; border-right: 2px solid transparent; opacity: 0; } 50.1% { width: 0ch; border-right: 2px solid #333333; opacity: 1; animation-timing-function: steps(1, end); } 55% { width: 1ch; border-right: 2px solid #333333; opacity: 1; } 56%, 60%, 70%, 80%, 90% { width: 1ch; border-right: 2px solid #333333; opacity: 1; } 65%, 75%, 85% { width: 1ch; border-right: 2px solid transparent; opacity: 1; } 91%, 100% { width: 0ch; border-right: 2px solid transparent; opacity: 0; } }
            @keyframes run-bg { 0%, 15% { background-color: #4A7563; } 15.1%, 35% { background-color: #88A396; } 35.1%, 100% { background-color: #4A7563; } }
            @keyframes run-t1 { 0%, 15% { opacity: 1; animation-timing-function: step-end; } 15.1%, 35% { opacity: 0; animation-timing-function: step-end; } 35.1%, 100% { opacity: 1; } }
            @keyframes run-t2 { 0%, 15% { opacity: 0; animation-timing-function: step-end; } 15.1%, 35% { opacity: 1; animation-timing-function: step-end; } 35.1%, 100% { opacity: 0; } }
            @keyframes play-solid { 0%, 45% { opacity: 1; animation-timing-function: step-end; } 45.1%, 90% { opacity: 0; animation-timing-function: step-end; } 90.1%, 100% { opacity: 1; } }
            @keyframes play-out { 0%, 45% { opacity: 0; animation-timing-function: step-end; } 45.1%, 90% { opacity: 1; animation-timing-function: step-end; } 90.1%, 100% { opacity: 0; } }
            @keyframes stop-solid { 0%, 45% { opacity: 0; animation-timing-function: step-end; } 45.1%, 90% { opacity: 1; animation-timing-function: step-end; } 90.1%, 100% { opacity: 0; } }
            @keyframes stop-out { 0%, 45% { opacity: 1; animation-timing-function: step-end; } 45.1%, 90% { opacity: 0; animation-timing-function: step-end; } 90.1%, 100% { opacity: 1; } }
            @keyframes mouse-compile { 0%, 5% { transform: translate(50px, 50px); opacity: 0; } 12%, 35% { transform: translate(0, 0); opacity: 1; } 42%, 55% { transform: translate(-182px, 0); opacity: 1; } 65%, 100% { transform: translate(-150px, 50px); opacity: 0; } }
            @keyframes ring-compile { 0%, 14.9% { opacity: 0; transform: scale(0.5); } 15% { opacity: 1; transform: scale(1); } 25% { opacity: 0; transform: scale(1.5); } 25.1%, 44.9% { opacity: 0; transform: scale(0.5); } 45% { opacity: 1; transform: scale(1); } 55% { opacity: 0; transform: scale(1.5); } 55.1%, 100% { opacity: 0; transform: scale(0.5); } }
          `}} />
          <script dangerouslySetInnerHTML={{ __html: `
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  "colors": {
                          "primary-container": "#76a693",
                          "outline-variant": "#c0c8c3",
                          "inverse-surface": "#2f3130",
                          "on-error-container": "#93000a",
                          "tertiary-container": "#989d99",
                          "primary-fixed-dim": "#a0d1bd",
                          "on-error": "#ffffff",
                          "tertiary-fixed-dim": "#c2c8c3",
                          "surface-tint": "#2C5E4A",
                          "background": "#f9f9f7",
                          "surface-container-highest": "#e2e3e1",
                          "surface-container-lowest": "#ffffff",
                          "surface": "#f9f9f7",
                          "surface-container-high": "#e8e8e6",
                          "on-tertiary-fixed": "#171d1a",
                          "on-tertiary": "#ffffff",
                          "on-primary": "#ffffff",
                          "tertiary": "#5a605c",
                          "error": "#ba1a1a",
                          "primary-fixed": "#bbedd8",
                          "secondary": "#486551",
                          "on-primary-fixed-variant": "#1f4f3f",
                          "secondary-fixed": "#caead2",
                          "primary": "#2C5E4A",
                          "on-secondary-fixed-variant": "#314d3b",
                          "on-primary-container": "#063b2d",
                          "on-background": "#1a1c1b",
                          "surface-dim": "#dadad8",
                          "on-secondary-container": "#4c6956",
                          "error-container": "#ffdad6",
                          "on-secondary": "#ffffff",
                          "inverse-primary": "#a0d1bd",
                          "on-primary-fixed": "#002117",
                          "on-secondary-fixed": "#042011",
                          "inverse-on-surface": "#f1f1ef",
                          "surface-container-low": "#f4f4f2",
                          "surface-container": "#eeeeec",
                          "secondary-fixed-dim": "#aeceb7",
                          "secondary-container": "#c7e8cf",
                          "on-tertiary-container": "#2f3532",
                          "surface-bright": "#f9f9f7",
                          "on-tertiary-fixed-variant": "#424845",
                          "on-surface": "#1a1c1b",
                          "tertiary-fixed": "#dfe4df",
                          "outline": "#717974",
                          "on-surface-variant": "#404945",
                          "surface-variant": "#e2e3e1"
                  },
                  "borderRadius": {
                          "DEFAULT": "0.25rem",
                          "lg": "0.5rem",
                          "xl": "0.75rem",
                          "full": "9999px"
                  },
                  "spacing": {
                          "gutter": "24px",
                          "xs": "4px",
                          "margin-mobile": "16px",
                          "sm": "12px",
                          "md": "24px",
                          "lg": "48px",
                          "margin-desktop": "64px",
                          "xl": "80px",
                          "base": "8px",
                          "container-max": "1280px"
                  },
                  "fontFamily": {
                          "display-lg": ["Plus Jakarta Sans"],
                          "headline-md": ["Plus Jakarta Sans"],
                          "body-base": ["Source Sans 3"],
                          "code-sm": ["JetBrains Mono"]
                  },
                  "fontSize": {
                          "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                          "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                          "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                          "body-base": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                          "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700"}],
                          "code-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}]
                  }
                }
              }
            }
          `}} />
        </head>
      <body className="bg-surface text-on-surface font-body-base antialiased overflow-x-hidden">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-brand text-white px-4 py-2 rounded-lg font-bold"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
