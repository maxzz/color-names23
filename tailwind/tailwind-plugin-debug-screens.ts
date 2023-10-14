import plugin from 'tailwindcss/plugin';
import twTheme from 'tailwindcss/defaultTheme';

module.exports = plugin(
    function ({ addComponents, theme }) {
        //https://github.com/jorenvanhee/tailwindcss-debug-screens
        //use: add class 'debug-screens' on any top element

        const screens = theme('screens')!; // {sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px'}

        const userStyles = theme('debugScreens.style', {});
        const ignoredScreens = theme('debugScreens.ignore', ['dark']);
        const prefix = theme('debugScreens.prefix', 'screen: ');
        const selector = theme('debugScreens.selector', '.debug-screens');

        const defaultPosition = ['bottom', 'left'];
        const position = theme('debugScreens.position', defaultPosition);
        const positionY = position[0] || defaultPosition[0];
        const positionX = position[1] || defaultPosition[1];

        //const screenEntries = Object.entries(screens);
        const screenEntries = sortScreenEntries(screens);

        const components: any = {
            [`${selector}::before`]: Object.assign({
                position: 'fixed',
                zIndex: '2147483647',
                [positionY]: '6px',
                [positionX]: '4px',
                padding: '.5em',
                fontSize: '12px',
                lineHeight: '1',
                fontFamily: 'sans-serif',
                borderRadius: '3px',
                border: '1px solid #b1b1b1',
                backgroundColor: '#0008',
                color: '#ddd',
                boxShadow: '0 0 2px 2px #fff5',
                content: `'${prefix}${screenEntries?.[0]?.[0] ? `less then ${screenEntries?.[0]?.[0]} (${screenEntries?.[0]?.[1]})` : '_'}'`,
            }, userStyles),
        };

        //console.log('----------------------- screenEntries', screenEntries);
        // console.log('----------------------- screens', screens);
        // console.log('----------------------- normalizeScreens', JSON.stringify(normalizeScreens(screens), null, 4));
        //console.log('----------------------- extractMinWidths', JSON.stringify(extractMinWidths(normalizeScreens(screens)), null, 4));
        // console.log('----------------------- extractMinWidths2', JSON.stringify(Object.fromEntries(extractMinWidths2(normalizeScreens(screens))), null, 4));
        //console.log('----------------------- sortScreenEntries', JSON.stringify(Object.fromEntries(sortScreenEntries(screens)), null, 4));
        //console.log('----------------------- screenEntries', JSON.stringify(screenEntries), null, 4);

        function sortScreenEntries(screens) {
            const normalized = normalizeScreens(screens);
            const newScreens = extractMinWidths2(normalized);
            //newScreens.push(['xsm', '501px']); // This smallest screen allowed by Chrome.
            newScreens.push(['sm0', '501px']); // This smallest screen allowed by Chrome.
            console.log('----------------------- newScreens', JSON.stringify(newScreens, null, 4));
            newScreens.sort((a, b) => parseInt(a[1]) - parseInt(b[1]));
            return newScreens;
        }

        screenEntries
            .filter(([screen]) => !ignoredScreens.includes(screen))
            .forEach(([screen, size]) => {
                components[`@screen ${screen}`] = {
                    [`${selector}::before`]: {
                        content: `'${prefix}${screen} (${size})'`,
                    },
                };
            });

        addComponents(components);
    },
    {
        theme: {
            // debugScreens: {
                screens: {
                    'sm0': '501px',
                    ...twTheme.screens,
                }
            // }
        }
    }
);

function resolveValue({ 'min-width': _minWidth, min = _minWidth, max, raw }) {
    return { min, max, raw };
}

function normalizeScreens(screens, root = true): { name: any; not: boolean; values: any[]; }[] {
    if (Array.isArray(screens)) {
        return screens.map((screen) => {
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
        });
    }

    return normalizeScreens(Object.entries(screens ?? {}), false);
}

function extractMinWidths(breakpoints: any[] = []) {
    return breakpoints
        .flatMap((breakpoint) => breakpoint.values.map((breakpoint) => breakpoint.min))
        .filter((v) => v !== undefined);
}

function extractMinWidths2(breakpoints: any[] = []) {
    return breakpoints
        .flatMap((breakpoint) => breakpoint.values.map((brk) => [breakpoint.name, brk.min]))
        .filter((v) => v !== undefined);
}

/*
console.log('----------------------- extractMinWidths2', JSON.stringify(extractMinWidths2(normalizeScreens(screens)), null, 4));

function extractMinWidths2(breakpoints = []) {
    return breakpoints
      .flatMap((breakpoint) => breakpoint.values.map((brk) => [breakpoint.name, brk.min]))
      .filter((v) => v !== undefined)
}

----------------------- extractMinWidths2 [
    [
        "sm",
        "640px"
    ],
    [
        "md",
        "768px"
    ],
    [
        "lg",
        "1024px"
    ],
    [
        "xl",
        "1350px"
    ],
    [
        "2xl",
        "1536px"
    ],
    [
        "xs",
        "420px"
    ],
    [
        "3xl",
        "1920px"
    ]
]
*/

/*
----------------------- screenEntries [
[ 'sm', '640px' ],
[ 'md', '768px' ],
[ 'lg', '1024px' ],
[ 'xl', '1350px' ],
[ '2xl', '1536px' ],
[ 'xs', '420px' ],
[ '3xl', '1920px' ]
]
----------------------- screens {
sm: '640px',
md: '768px',
lg: '1024px',
xl: '1350px',
'2xl': '1536px',
xs: '420px',
'3xl': '1920px'
}
----------------------- normalizeScreens [
  {
      "name": "sm",
      "not": false,
      "values": [
          {
              "min": "640px"
          }
      ]
  },
  {
      "name": "md",
      "not": false,
      "values": [
          {
              "min": "768px"
          }
      ]
  },
  {
      "name": "lg",
      "not": false,
      "values": [
          {
              "min": "1024px"
          }
      ]
  },
  {
      "name": "xl",
      "not": false,
      "values": [
          {
              "min": "1350px"
          }
      ]
  },
  {
      "name": "2xl",
      "not": false,
      "values": [
          {
              "min": "1536px"
          }
      ]
  },
  {
      "name": "xs",
      "not": false,
      "values": [
          {
              "min": "420px"
          }
      ]
  },
  {
      "name": "3xl",
      "not": false,
      "values": [
          {
              "min": "1920px"
          }
      ]
  }
]
----------------------- extractMinWidths [
  "640px",
  "768px",
  "1024px",
  "1350px",
  "1536px",
  "420px",
  "1920px"
]
*/

/*
// ------------------------------------- This is the problem in the generated css (search for 2147483647):

@media (min-width: 640px) {

  .debug-screens::before {
    content: 'screen: sm (640px)';
  }
}
@media (min-width: 768px) {

  .debug-screens::before {
    content: 'screen: md (768px)';
  }
}
@media (min-width: 1024px) {

  .debug-screens::before {
    content: 'screen: lg (1024px)';
  }
}
@media (min-width: 1280px) {

  .debug-screens::before {
    content: 'screen: xl (1280px)';
  }
}
@media (min-width: 1536px) {

  .debug-screens::before {
    content: 'screen: 2xl (1536px)';
  }
}
@media (min-width: 501px) {

  .debug-screens::before {
    content: 'screen: smallest (501px)';
  }
}

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

// ------------------------------------- custome screens from tailwind.config.js should override the default ones.
*/
