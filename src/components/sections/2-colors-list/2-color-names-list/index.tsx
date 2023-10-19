import { Fragment } from 'react';
import { useAtomValue } from 'jotai';
import { viewListAtoms } from '@/store';
import { formatHSLMono } from '@/utils-color';

const col1Classes = "leading-5 px-1 text-right bg-muted text-foreground/50";
const col2Classes = "leading-5 font-semibold";
const col3Classes = "leading-5 px-2 whitespace-pre bg-muted text-foreground/70";
const col4Classes = "leading-5 font-semibold";

export function ColorNamesList() {
    const colorList = useAtomValue(viewListAtoms.colorListAtom);
    return (
        <div className="text-xs font-mono grid grid-cols-[auto,auto,auto,auto,minmax(20px,1fr)] gap-x-2">
            {colorList.map((color, idx) => (
                <Fragment key={color.name}>
                    <div className={col1Classes}>{idx}</div>
                    <div className={col2Classes}>{color.hex}</div>
                    <div className={col3Classes}>{formatHSLMono(color.hsl)}</div>
                    <div className={col4Classes}>{color.name}</div>
                    <div style={{ backgroundColor: color.name }} title={color.name} />
                </Fragment>
            ))}
        </div>
    );
}
