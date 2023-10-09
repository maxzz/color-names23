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
        <div className="text-3xl tracking-tighter font-orgiginal uppercase scale-y-[1.2]" style={textShadow}>
            CSS Color Names 23
        </div>
    );
}
