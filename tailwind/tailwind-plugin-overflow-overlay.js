const plugin = require('tailwindcss/plugin');

// Don't use plugin: tailwind cannot have two overlays: auto and overlay at the same time and will break for Firefox. Use index.css instead.

module.exports = plugin(function ({ addUtilities, addVariant }) {
    const utils = {
        '.overflow-overlay': {
            'overflow': 'auto',
            'overflow': 'overlay',
        },
        '.overflow-y-overlay': {
            'overflow-y': 'auto',
            'overflow-y': 'overlay',
        },
        '.overflow-x-overlay': {
            'overflow-x': 'auto',
            'overflow-x': 'overlay',
        }
    };
    addUtilities(utils);

    const smallscroll = {
        /* Firefox scrollbars */
        ".smallscroll": {
            "--sb-width": "8px",
            "--sb-radius": "4px",
            "--sb-color": "#666b7a",
            scrollbarColor: "var(--sb-color) transparent",
            scrollbarWidth: "thin",
        },

        /* Chrome scrollbars */
        ".smallscroll::-webkit-scrollbar": {
            width: "var(--sb-width)",
            height: "var(--sb-width)",
            backgroundColor: "transparent"
        },

        ".smallscroll::-webkit-scrollbar-thumb": {
            backgroundColor: "var(--sb-color)",
            borderRadius: "var(--sb-radius)"
        },

        ".smallscroll::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
            // backgroundColor: "red",
            // borderRadius: "var(--sb-radius)"
            // borderRadius: "4px"
        },

        ".overflow-overlay": {
            overflow: 'auto',
            overflow: 'overlay',
        },

        "@supports (overflow: overlay)": {
            ".overflow-overlay": {
                overflow: "overlay",
            }
        }
    };
    addUtilities(smallscroll);


    // try {
    //     addVariant('resizer', ({ modifySelectors, separator }) => {
    //         modifySelectors(({ className }) => {
    //             return `.${e(`textarea-resizer${separator}${className}`)}::-webkit-scrollbar-button`;
    //         });
    //     });

    // } catch (error) {
    //     console.log(error);        
    // }

    // addVariant("scrollbar-button", ({ modifySelectors, separator }) => {
    //     modifySelectors(({ className }) => {
    //         return `.${e(
    //             `scrollbar-button${separator}${className}`
    //         )}::-webkit-scrollbar-button`;
    //     });
    // });

    // // Add scrollbar class
    // addUtilities({
    //     ".scrollbar-rounded": {
    //         "&::-webkit-scrollbar-button": {
    //             width: '10px',
    //             height: '10px',
    //             display: 'block',
    //         },
    //     }
    // });

    const resize = {
        ".resize-color": {
            "&::-webkit-resizer": {
                // border: "2px solid black",
                // background: "red",
                // boxShadow: "0 0 5px 5px blue",
                // outline: "2px solid yellow"

                // background: '#0000',
                //background: 'red',
                //borderRadius: '5px',
                //padding: '0px 0px 2px 2px',

                // '--resizer-color': 'green',
                // background: 'var(--resizer-color)',

                /*
                overflow: 'hidden',
                borderRadius: '5px',
                borderRadius: '1px',
                transform: 'translate(-50%, -50%)',

                color: 'red',
                background: 'var(--resizer-color, hsl(var(--background)))',
                */

                //backgroundImage: 'url("../src/assets/resizer-inactive.png")',
                backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsSAAALEgHS3X78AAAAIGNIUk0AAG11AABzoAAA9q8AAIWZAABumgAA57sAADF9AAAXvQF2CngAAABESURBVHjajM67DQAgDENBw6x0WZDtHi3KR4klF5ausAAVvf8u0TGjgwFlMEUeepR+DCj72CJAC9AkW8OM4QMAAP//AwD5ltVB1vqf0gAAAABJRU5ErkJggg==")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom right',
                backgroundSize: '90% 90%',
            }
        }
    };
    addUtilities(resize);

});
