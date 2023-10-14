module.exports = function ({ addComponents, theme }) {
    //https://github.com/jorenvanhee/tailwindcss-debug-screens
    //use: add class 'debug-screens' on any top element

    const screens = theme('screens'); // {sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px'}

    const userStyles = theme('debugScreens.style', {});
    const ignoredScreens = theme('debugScreens.ignore', ['dark']);
    const prefix = theme('debugScreens.prefix', 'screen: ');
    const selector = theme('debugScreens.selector', '.debug-screens');

    const defaultPosition = ['bottom', 'left'];
    const position = theme('debugScreens.position', defaultPosition);
    const positionY = position[0] || defaultPosition[0];
    const positionX = position[1] || defaultPosition[1];

    const screenEntries = Object.entries(screens);

    const components = {
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

    console.log('----------------------- screenEntries', screenEntries);
    console.log('----------------------- screens', screens);
    console.log('----------------------- normalizeScreens', JSON.stringify(normalizeScreens(screens), null, 4));
    console.log('----------------------- extractMinWidths', JSON.stringify(extractMinWidths(normalizeScreens(screens)), null, 4));

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
};

function normalizeScreens(screens, root = true) {
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

function extractMinWidths(breakpoints = []) {
    return breakpoints
      .flatMap((breakpoint) => breakpoint.values.map((breakpoint) => breakpoint.min))
      .filter((v) => v !== undefined)
}

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
