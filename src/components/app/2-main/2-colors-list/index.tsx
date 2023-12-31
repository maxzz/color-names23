import { HTMLAttributes } from 'react';
import { ColorListInfoPanel } from './1-top-panel';
import { ColorNamesList } from './2-color-names-list';
import { classNames } from '@/utils';

export function Section2_ColorsList({ className }: HTMLAttributes<HTMLUListElement>) {
    return (
        <div className={classNames("flex flex-col bg-background overflow-hidden", className)}>
            <ColorListInfoPanel />
            <div className="h-full overflow-overlay smallscroll">
                <div className="pl-4 pr-8 py-4 lg:pl-12 lg:pr-16 xl:pl-16 xl:pr-20 2xl:pl-[9rem] 2xl:pr-[12rem]">
                    <ColorNamesList />
                </div>
            </div>
        </div>
    );
}

//TODO: color index and sorted map indices are now different but should be preserved or removed at all.

//scrollbar-gutter: stable both-edges
//font-size: calc(16px + (32 - 16) * (100vw - 320px) / (1280 - 320)); //https://codepen.io/jkantner/pen/eYygqJm
//dark/light https://codepen.io/jkantner/pen/eYygqJm

//TODO: 10.28.23 add only triple colors like on https://www.msfw.com/services/contrastratiocalculator 
