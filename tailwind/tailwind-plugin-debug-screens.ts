import plugin from 'tailwindcss/plugin';
import twTheme from 'tailwindcss/defaultTheme';
import { ResolvableTo, ScreensConfig } from 'tailwindcss/types/config';

// based on https://github.com/jorenvanhee/tailwindcss-debug-screens // use: add class 'debug-screens' on any top element

const extraScreens = {
    xs: '420px',
    xsm: '501px', // Chrome minimum screen size is 500px
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px' /*or xl: '1350px'*/,
    '2xl': '1536px',
    '3xl': '1920px'
};

const screensToTheme = { // TODO: make it configurable
    ...extraScreens,
    ...twTheme.screens,
};

type ScreenEntry = [screen: string, size: string];

module.exports = plugin(
    function ({ addComponents, theme }) {
        const screens = (theme('screens') || {}) as ResolvableTo<ScreensConfig>; // { sm: '640px', md: '768px', ... }
        const userStyles = theme('debugScreens.style', {});
        const ignoredScreens = theme('debugScreens.ignore', ['dark']);
        const prefix = theme('debugScreens.prefix', 'screen: ');
        const selector = theme('debugScreens.selector', '.debug-screens');

        const defaultPosition = ['left', 'bottom'];
        const position = theme('debugScreens.position', defaultPosition);
        const positionX = position[0] || defaultPosition[0];
        const positionY = position[1] || defaultPosition[1];

        const screenEntries = sortScreenEntries(screens).filter(([screen]) => !ignoredScreens.includes(screen));
        if (!screenEntries.length) {
            return;
        }
        const lowestScreenName = screenEntries[0][0];
        const lowestScreenSize = screenEntries[0][1];

        //console.log('----------------------- screenEntries', JSON.stringify(screenEntries));

        const components: Record<string, any> = {
            [`${selector}::before`]:
                Object.assign({
                    zIndex: '2147483647',
                    position: 'fixed',
                    [positionX]: '4px',
                    [positionY]: '6px',
                    padding: '.5em',
                    fontSize: '12px',
                    lineHeight: '1',
                    fontFamily: 'sans-serif',
                    color: '#ddd',
                    backgroundColor: '#0008',
                    border: '1px solid #b1b1b1',
                    borderRadius: '3px',
                    boxShadow: '0 0 2px 2px #fff5',
                    content: `'${prefix}less then ${lowestScreenName} (${lowestScreenSize})'`,
                }, userStyles),
        };

        screenEntries.forEach(([screen, size]) => {
            components[`@screen ${screen}`] = {
                [`${selector}::before`]: { content: `'${prefix}${screen} (${size})'` },
            };
        });

        addComponents(components);
    },
    {
        theme: {
            screens: {
                'xsm': '501px', // Chrome minimum screen size is 500px
                ...twTheme.screens,
            }
        }
    }
);

function sortScreenEntries(screens): ScreenEntry[] {
    const normalized = normalizeScreens(screens);
    const newScreens = extractScreenValues(normalized);
    newScreens.sort((a, b) => parseInt(a[1]) - parseInt(b[1]));
    return newScreens;

    type NormalizeScreenValue = {
        min: string;
        max: string | undefined;
        raw?: string;
    };

    type NormalizeScreen = {
        name: string;
        not: boolean;
        values: NormalizeScreenValue[];
    };

    function normalizeScreens(screens: any[], root = true): NormalizeScreen[] {
        if (Array.isArray(screens)) {
            return screens.map(
                (screen) => {
                    if (root && Array.isArray(screen)) {
                        throw new Error('The tuple syntax is not supported for `screens`.');
                    }

                    if (typeof screen === 'string') {
                        return { name: screen.toString(), not: false, values: [{ min: screen, max: undefined }] };
                    }

                    let [name, options] = screen;
                    name = name.toString();

                    if (typeof options === 'string') {
                        return { name, not: false, values: [{ min: options, max: undefined }] };
                    }

                    if (Array.isArray(options)) {
                        return { name, not: false, values: options.map((option) => resolveValue(option)) };
                    }

                    return { name, not: false, values: [resolveValue(options)] };
                }
            );
        }

        return normalizeScreens(Object.entries(screens ?? {}), false);

        function resolveValue({ 'min-width': _minWidth, min = _minWidth, max, raw }): NormalizeScreenValue {
            return { min, max, raw }; // it was: resolveValue({ 'min-width': _minWidth, min = _minWidth, max, raw } = {}) {
        }
    }

    function extractScreenValues(breakpoints: NormalizeScreen[] = []) {
        return breakpoints
            .flatMap((breakpoint) => breakpoint.values.map((brk) => [breakpoint.name, brk.min]))
            .filter((v) => v !== undefined) as ScreenEntry[];
    }
}

/*
// ------------------------------------- This is how it should be:

  .debug-screens::before{
    position: fixed;
    z-index: 2147483647;
    bottom: 0;
    left: 0;
    padding: .3333333em .5em;
    font-size: 12px;
    line-height: 1;
    font-family: sans-serif;
    background-color: #000;
    color: #fff;
    box-shadow: 0 0 0 1px #fff;
    content: 'screen: _'
  }

  @media (min-width: 420px){
    .debug-screens::before{
      content: 'screen: xs'
    }
  }
  
  @media (min-width: 640px){
    .debug-screens::before{
      content: 'screen: sm'
    }
  }
  
  @media (min-width: 768px){
    .debug-screens::before{
      content: 'screen: md'
    }
  }
  
  @media (min-width: 1024px){
    .debug-screens::before{
      content: 'screen: lg'
    }
  }
  
  @media (min-width: 1350px){
    .debug-screens::before{
      content: 'screen: xl'
    }
  }
  
  @media (min-width: 1536px){
    .debug-screens::before{
      content: 'screen: 2xl'
    }
  }
  
  @media (min-width: 1920px){
    .debug-screens::before{
      content: 'screen: 3xl'
    }
  }

// ------------------------------------- so we need to sort them by size and add min screens from tailwind.config.js:
            // screens: {
            //     smallest: '501px',
            // },
            screens: {
                xs: '420px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1350px',
                '2xl': '1536px',
                '3xl': '1920px',
            },

// ------------------------------------- custom screens from tailwind.config.js should override the default ones.
*/
