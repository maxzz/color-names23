import twColors from 'tailwindcss/colors';
import twTheme from 'tailwindcss/defaultTheme';
import { shadcnPlugin } from './tailwind/tailwind-plugin-shadcn';

module.exports = {
    content: ['./index.html', './src/**/*.{tsx,ts,js,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                smallest: '501px',
            },
            colors: {
                // primary: {
                //     100: twColors.blue['500'],
                // },
                primary: twColors.slate,
                title: '#06133e',
                url: twColors.blue['500'],




                // border: "hsl(var(--border))",
                // input: "hsl(var(--input))",
                // ring: "hsl(var(--ring))",
                // background: "hsl(var(--background))",
                // foreground: "hsl(var(--foreground))",
                // // primary: {
                // //     DEFAULT: "hsl(var(--primary))",
                // //     foreground: "hsl(var(--primary-foreground))",
                // // },
                // secondary: {
                //     DEFAULT: "hsl(var(--secondary))",
                //     foreground: "hsl(var(--secondary-foreground))",
                // },
                // destructive: {
                //     DEFAULT: "hsl(var(--destructive))",
                //     foreground: "hsl(var(--destructive-foreground))",
                // },
                // muted: {
                //     DEFAULT: "hsl(var(--muted))",
                //     foreground: "hsl(var(--muted-foreground))",
                // },
                // accent: {
                //     DEFAULT: "hsl(var(--accent))",
                //     foreground: "hsl(var(--accent-foreground))",
                // },
                // popover: {
                //     DEFAULT: "hsl(var(--popover))",
                //     foreground: "hsl(var(--popover-foreground))",
                // },
                // card: {
                //     DEFAULT: "hsl(var(--card))",
                //     foreground: "hsl(var(--card-foreground))",
                // },
        

            },
            fontFamily: {
                header: ['Merriweather', ...twTheme.fontFamily.sans],
                orgiginal: [...twTheme.fontFamily.sans],
            },
            backgroundImage: () => ({
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-radial-to-tr': 'radial-gradient(115% 90% at 0% 100%, var(--tw-gradient-stops))',
                'gradient-radial-to-tl': 'radial-gradient(115% 90% at 100% 100%, var(--tw-gradient-stops))',
                'gradient-radial-to-br': 'radial-gradient(90% 115% at 0% 0%, var(--tw-gradient-stops))',
                'gradient-radial-to-bl': 'radial-gradient(90% 115% at 100% 0%, var(--tw-gradient-stops))',
            }),
        },
    },
    plugins: [
        require('./tailwind/tailwind-plugin-data-state'),
        require('./tailwind/tailwind-plugin-colors-bridge')({ prefix: '--tm-', groupName: 'primary' }),
        require('./tailwind/tailwind-plugin-all-colors'),
        require('./tailwind/tailwnd-plugin-debug-styles'),
        require('tailwindcss-debug-screens'),
        require('@tailwindcss/forms')({ strategy: 'class' }),
        shadcnPlugin,
    ],
};
