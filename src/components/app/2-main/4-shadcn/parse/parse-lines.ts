//https://gradient.page/tools/shadcn-ui-theme-generator
export const testToParse = `
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

const isThemeNameRegex = /^\s*\.([a-zA-Z0-9\-]+)\s* \{\s*$/;
const isCSSVarRegex = /^\s*--([a-zA-Z0-9\-]+)\s*:\s*([^;]+)\s*;?\s*$/;

export function parseTextAsCSSvars(text: string) {
    const vars = text.split(/\r?\n/)
        .map((line) => {
            const asVar = isCSSVarRegex.exec(line);
            if (asVar) {
                const [_, name, value] = asVar;
                return { name, value: value.trim() };
            } else {
                const asName = isThemeNameRegex.exec(line);
                if (asName) {
                    const [_, name] = asName;
                    console.log('name', name);
                }
            }
        })
        .filter(Boolean);

    console.log('vars', vars);
}
