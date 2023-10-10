import { HTMLAttributes } from 'react';
import { App3_Footer } from '../3-footer';
import { classNames } from '@/utils';
import { NavButtons } from './nav-buttons';
import { IconPalette } from '@/components/ui/icons/normal';

//const textShadow = { textShadow: '1px 1px red, -1px -1px white', 'WebkitTextStroke': '0.5px #f3e8ff', };
//const textShadow = { textShadow: 'red 1px 1px, #5f81f473 -1px -1px', 'WebkitTextStroke': '0.5px #232c49', };
const textShadow = {
    textShadow: "#347d84 1px 1px, #8c9cd475 -3px 0px 5px",
    WebkitTextStroke: "0.5px #000000",
    color: "rgb(102 116 161)",
};

export function AppTitle() {
    return (
        <div className="text-foreground/50 font-orgiginal flex items-center space-x-1">
            <IconPalette className="w-5 h-5 stroke-1" />

            <div className="tracking-tighter flex items-end gap-0.5 scale-y-[1] md:scale-y-[1.5]">
                <div className="pb-0.5 md:pb-0 text-base md:text-3xl lowercase md:uppercase">
                    Web Colors
                </div>
                <div className="pb-2 md:pb-0 text-sm md:text-3xl -translate-y-0.5 md:translate-y-0  scale-[0.7] md:scale-y-[1]">
                    23
                </div>
            </div>
        </div>
    );
}
