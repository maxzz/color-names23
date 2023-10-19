import { useAtomValue, useSetAtom } from 'jotai';
import { viewHueAtoms } from '@/store';
import './color-neighbors-grid.css';

export function PageColorNeighborsGrid() {
    const colorsGroups = useAtomValue(viewHueAtoms.colorGroupsAtom);
    const setGlobalColor = useSetAtom(viewHueAtoms.colorAtom);
    return (
        <div className="place-self-center relative w-3/4 max-w-[42rem] aspect-square">
            <div className="w-full h-full grid border border-slate-200 shadow-md">

                {colorsGroups.map((group, groupIdx) => (
                    <div className="grid grid-flow-col" key={groupIdx}>
                        {group.map((color, colorIdx) => (
                            <button
                                className="hover:scale-[1.02] hover:shadow-md hover:border-slate-500 hover:border transition-transform"
                                style={{
                                    backgroundColor: color.name,
                                    color: color.dark ? 'white' : 'black',
                                }}
                                key={colorIdx}
                                onClick={() => setGlobalColor(color)}
                            >
                                {color.name}
                            </button>
                        ))}
                    </div >
                ))}

            </div>
            <div className="axis axis-lightness">lightness</div>
            <div className="axis axis-saturation">saturation</div>
        </div>
    );
}

// :root {
//     --content-width: max(340px, min(80vmin, 800px));
//     --font-size: max(14px, min(3vmin, 20px));
// }

// body {
//     font: normal var(--font-size)/1.4 helvetica, sans-serif;
// }

// .chart-container {
//     position: relative;
//     width: var(--content-width);
//     height: var(--content-width);
// }
