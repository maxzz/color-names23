const plugin = require('tailwindcss/plugin');
const twColors = require('tailwindcss/colors');

module.exports = plugin(function ({ addComponents, theme }) {
    const deprecated = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray',];

    const colorGroups = Object // { slate: { '50': '#f8fafc', ... '900': '#0f172a' }, ... } // js preserve member order
        .keys(twColors)
        .reduce((acc, key) => {
            if (!deprecated.includes(key)) {
                const value = twColors[key];
                const isGroup = typeof value === 'object';
                if (isGroup) {
                    acc[key] = value;
                }
            }
            return acc;
        }, {});

    addComponents({
        '.all-tw-colors': {
            '--tm-tw-colors': JSON.stringify(colorGroups),
        },
    });
});
