import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
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
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
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
      fontFamily: {
        "display-lg": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "body-base": ["Source Sans 3", "sans-serif"],
        "code-sm": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "body-base": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700" }],
        "code-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }]
      }
    },
  },
  plugins: [],
};
export default config;
