//https://gradient.page/tools/shadcn-ui-theme-generator //<-- TODO: gradient rgb
export const testToParseCss = `
.theme-custom {
    /* Name: custom color palette
       Author: Ilias Ism
       URL: https://gradient.page */

    /* CSS: .bg-gradient { background: var(--gradient) } */
    --gradient: #00FF7F;

    --background: 159 65% 4%;
    --foreground: 159 10% 97.5%;

    --muted: 159 50% 15%;
    --muted-foreground: 159 10% 55%;

    --popover: 159 45% 6.5%;
    --popover-foreground: 159 10% 97.5%;

    --card: 159 45% 6.5%;
    --card-foreground: 159 10% 97.5%;

    --border: 159 50% 15%;
    --input: 159 50% 15%;

    --primary: 159 100% 50%;
    --primary-foreground: 159 10% 5%;

    --secondary: 159 50% 15%;
    --secondary-foreground: 159 10% 97.5%;

    --accent: 159 50% 15%;
    --accent-foreground: 159 10% 97.5%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 159 10% 97.5%;

    --ring: 159 100% 50%;
}
`;


//https://gradient.page/tools/shadcn-ui-theme-generator //<-- TODO: gradient url
export const testToParseCssWithUrl = `
.theme-custom {
    /* Name: custom color palette
       Author: Ilias Ism
       URL: https://gradient.page */

    /* CSS: .bg-gradient { background: var(--gradient) } */
    --gradient: url(/samples/vibrant-vista/vibrant-vista-001.jpg);

    --background: 210 26% 7.84%;
    --foreground: 210 4% 99.9%;

    --muted: 210 20% 29.4%;
    --muted-foreground: 210 4% 59.8%;

    --popover: 210 57% 12.74%;
    --popover-foreground: 210 4% 99.9%;

    --card: 210 57% 12.74%;
    --card-foreground: 210 4% 99.9%;

    --border: 210 20% 29.4%;
    --input: 210 20% 29.4%;

    --primary: 210 40% 98%;
    --primary-foreground: 210 4% 9.8%;

    --secondary: 210 20% 29.4%;
    --secondary-foreground: 210 4% 99.9%;

    --accent: 210 20% 29.4%;
    --accent-foreground: 210 4% 99.9%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 4% 99.9%;

    --ring: 210 40% 98%;
}
`;

export const testToParseCss2 = `
@layer base {
    :root {
        --background: 0 0% 100%;
        --foreground: 222.2 47.4% 11.2%;

        --muted: 210 40% 96.1%;
        --muted-foreground: 215.4 16.3% 46.9%;

        --popover: 0 0% 100%;
        --popover-foreground: 222.2 47.4% 11.2%;

        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;

        --card: 0 0% 100%;
        --card-foreground: 222.2 47.4% 11.2%;

        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;

        --secondary: 210 40% 96.1%;
        --secondary-foreground: 222.2 47.4% 11.2%;

        --accent: 210 40% 96.1%;
        --accent-foreground: 222.2 47.4% 11.2%;

        --destructive: 0 100% 50%;
        --destructive-foreground: 210 40% 98%;

        --ring: 215 20.2% 65.1%;

        --radius: 0.5rem;
    }

    .dark {
        --background: 224 71% 4%;
        --foreground: 213 31% 91%;

        --muted: 223 47% 11%;
        --muted-foreground: 215.4 16.3% 56.9%;

        --accent: 216 34% 17%;
        --accent-foreground: 210 40% 98%;

        --popover: 224 71% 4%;
        --popover-foreground: 215 20.2% 65.1%;

        --border: 216 34% 17%;
        --input: 216 34% 17%;

        --card: 224 71% 4%;
        --card-foreground: 213 31% 91%;

        --primary: 210 40% 98%;
        --primary-foreground: 222.2 47.4% 1.2%;

        --secondary: 222.2 47.4% 11.2%;
        --secondary-foreground: 210 40% 98%;

        --destructive: 0 63% 31%;
        --destructive-foreground: 210 40% 98%;

        --ring: 216 34% 17%;

        --radius: 0.5rem;
    }
}
`;

export const testToParseJs = `
addBase({
    ":root": {
        "--background": "0 0% 100%",
        "--foreground": "222.2 47.4% 11.2%",
        "--muted": "210 40% 96.1%",
        "--muted-foreground": "215.4 16.3% 46.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 47.4% 11.2%",
        "--border": "214.3 31.8% 91.4%",
        "--input": "214.3 31.8% 91.4%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 47.4% 11.2%",
        "--primary": "222.2 47.4% 11.2%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 40% 96.1%",
        "--secondary-foreground": "222.2 47.4% 11.2%",
        "--accent": "210 40% 96.1%",
        "--accent-foreground": "222.2 47.4% 11.2%",
        "--destructive": "0 100% 50%",
        "--destructive-foreground": "210 40% 98%",
        "--ring": "215 20.2% 65.1%",
        "--radius": "0.5rem"
    },
    ".dark": {
        "--background": "224 71% 4%",
        "--foreground": "213 31% 91%",
        "--muted": "223 47% 11%",
        "--muted-foreground": "215.4 16.3% 56.9%",
        "--accent": "216 34% 17%",
        "--accent-foreground": "210 40% 98%",
        "--popover": "224 71% 4%",
        "--popover-foreground": "215 20.2% 65.1%",
        "--border": "216 34% 17%",
        "--input": "216 34% 17%",
        "--card": "224 71% 4%",
        "--card-foreground": "213 31% 91%",
        "--primary": "210 40% 98%",
        "--primary-foreground": "222.2 47.4% 1.2%",
        "--secondary": "222.2 47.4% 11.2%",
        "--secondary-foreground": "210 40% 98%",
        "--destructive": "0 63% 31%",
        "--destructive-foreground": "210 40% 98%",
        "--ring": "216 34% 17%",
        "--radius": "0.5rem"
    }
});
`;
