import { HTMLAttributes } from 'react';
import { App3_Footer } from '../3-footer';
import { classNames } from '@/utils';
import { NavButtons } from './nav-buttons';

//const textShadow = { textShadow: '1px 1px red, -1px -1px white', 'WebkitTextStroke': '0.5px #f3e8ff', };
//const textShadow = { textShadow: 'red 1px 1px, #5f81f473 -1px -1px', 'WebkitTextStroke': '0.5px #232c49', };
const textShadow = {
    textShadow: "#347d84 1px 1px, #8c9cd475 -3px 0px 5px",
    WebkitTextStroke: "0.5px #000000",
    color: "rgb(102 116 161)",
};

export function AppTitle() {
    return (
        <div className="tracking-tighter font-orgiginal text-blue-200/50 flex items-end gap-0.5 scale-y-[1] md:scale-y-[1.5]">
            <div className="pb-0.5 md:pb-0 text-base md:text-3xl lowercase md:uppercase">
                CSS Color Names
            </div>
            <div className="pb-2 md:pb-0 text-sm md:text-3xl -translate-y-0.5 md:translate-y-0  scale-[0.7] md:scale-y-[1]" style={textShadow}>
                23
            </div>
        </div>
    );
}
