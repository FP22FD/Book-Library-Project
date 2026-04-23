import defaultTheme from 'tailwindcss/defaultTheme';

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1536px',
      },
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans], //Poppins as the default sans font
        playfair: ['"Playfair Display"', 'serif'], // Playfair Display for headings and display text
      },
      fontSize: {
        'display-1': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }], // 60px text-6xl
        'display-2': ['3rem', { lineHeight: '1.1', fontWeight: '700' }], // 48px text-5xl
        'heading-1': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }], // 36px text-4xl
        'heading-2': ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }], // 30px text-3xl
        'heading-3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px text-2xl
        'heading-4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px text-xl
        'heading-5': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }], // 18px text-lg
        'heading-6': ['1rem', { lineHeight: '1.5', fontWeight: '600' }], // 16px text-base

        'lead-paragraph': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }], // 18px text-lg

        'body-large': ['1rem', { lineHeight: '1.75', fontWeight: '400' }], // 16px text-base
        'body-normal': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px text-sm
        'body-medium': ['0.875rem', { lineHeight: '1.75', fontWeight: '400' }], // 14px text-sm
        'body-small': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }], // 12px text-xs
      },
      spacing: {
        2: '0.5rem', // 8px
        4: '1rem', // 16px
        6: '1.5rem', // 24px
        8: '2rem', // 32px
        10: '2.5rem', // 40px
        12: '3rem', // 48px (new custom spacing)
        16: '4rem', // 64px
        20: '5rem', // 80px
        24: '6rem', // 96px
        32: '8rem', // 128px
      },
      colors: {
        light: {
          // Backgrounds
          bg0: '#f7f7f5', // Light background, page/card backgrounds
          bg1: '#ffffff', // Main background, cards, containers
          bg2: '#f9f9f8', // Muted background, subtle sections
          bgActive: '#111111', // Active state background
          bg3: '#f3f3f1', // Hover / alt background
          active: '#111111', // Active state background
          gradientA: 'linear-gradient(180deg, #fff, #f9f9f8)', // Section backgrounds, footers, about
          tag1: '#f5f3ff', // Tag background
          tag3: '#f9f9f8', // Table header background
          gold: '#c49a2a', // Gold accent, ratings, highlights
          accentBorder: 'rgba(124,58,237,0.2)', // Button hover, border, focus ring
          border: 'rgba(0,0,0,0.07)', // Card/input border
          borderSoft: 'rgba(124,58,237,0.2)', // Subtle border, hover/focus
          // Text
          text0: '#111111', // Primary text
          text1: '#444444', // Secondary text
          text2: '#6e6e6e', // Muted / tertiary text
          tag1: '#7c3aed', // Tag text, accent
          tag3: '#6e6e6e', // Tag text, muted
          gold: '#c49a2a', // Gold accent text
          purple: '#7c3aed', // Link / accent text
          purpleBd: 'rgba(124,58,237,0.2)', // Accent/border text
          accentSoft: '#f5f3ff', // Soft accent text
          // Fills (SVG / icons)
          purple: '#7c3aed', // SVG/icon fill
          borderSoft: 'rgba(124,58,237,0.2)', // SVG/icon fill subtle
          // Focus
          ringAccent: 'rgba(124,58,237,0.2)', // Input focus ring
        },
      },
    },
    backgroundImage: {
      // Custom gradients to use for various sections and elements when needed
      'pink-gradient': 'linear-gradient(to right, #FF1464, #EC1060)', // 600 + know
      'pink-gradient-dark': 'linear-gradient(to right, #D70049, #D70049)', // 700 + 700
      'blue-primary-dark': 'linear-gradient(to right, #153A5B, #101935)', // 700 + 700
      'auth-background': "url('/src/assets/images/auth-background.webp')", // Auth background image. Unsplash
      'light-surfaceGlow':
        'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.12), transparent 48%)',
    },
    boxShadow: {
      custom: '0 10px 20px rgba(194, 194, 194, 0.16)', // Custom shadow #C2C2C2
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '@font-face': [
          {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "400",
            fontDisplay: "swap",
            src: 'url("/fonts/Poppins/Poppins-Regular.ttf") format("truetype")',
          },
          {
            fontFamily: "Poppins",
            fontStyle: "italic",
            fontWeight: "400",
            fontDisplay: "swap",
            src: 'url("/fonts/Poppins/Poppins-Italic.ttf") format("truetype")',
          },
          {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "500",
            fontDisplay: "swap",
            src: 'url("/fonts/Poppins/Poppins-Medium.ttf") format("truetype")',
          },
          {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "600",
            fontDisplay: "swap",
            src: 'url("/fonts/Poppins/Poppins-SemiBold.ttf") format("truetype")',
          },
          {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "700",
            fontDisplay: "swap",
            src: 'url("/fonts/Poppins/Poppins-Bold.ttf") format("truetype")',
          },
          {
            fontFamily: 'Playfair Display',
            fontStyle: 'normal',
            fontWeight: '500',
            src: 'url("/fonts/PlayfairDisplay/PlayfairDisplay-Medium.ttf") format("TrueType")',
          },
          {
            fontFamily: 'Playfair Display',
            fontStyle: 'normal',
            fontWeight: '600',
            src: 'url("/fonts/PlayfairDisplay/PlayfairDisplay-SemiBold.ttf") format("TrueType")',
          },
          {
            fontFamily: 'Playfair Display',
            fontStyle: 'normal',
            fontWeight: '700',
            src: 'url("/fonts/PlayfairDisplay/PlayfairDisplay-Bold.ttf") format("TrueType")',
          },
          {
            fontFamily: 'Playfair Display',
            fontStyle: 'normal',
            fontWeight: '800',
            src: 'url("/fonts/PlayfairDisplay/PlayfairDisplay-ExtraBold.ttf") format("TrueType")',
          },
        ],
        h1: { fontFamily: 'Playfair Display, serif' },
      });
    },
  ],
};
