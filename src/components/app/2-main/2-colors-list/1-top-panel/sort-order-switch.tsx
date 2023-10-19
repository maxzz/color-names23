import { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react';
import { useAtom } from 'jotai';
import * as Prim from '@radix-ui/react-radio-group';
import { viewListAtoms } from '@/store';
import { SortBy } from '@/utils-color';
import { classNames } from '@/utils';

// function SortOrderSwitch({className}: HTMLAttributes<HTMLUListElement>) {
//     const [sortBy, setSortBy] = useAtom(viewListAtoms.sortByAtom);
//     const onChange = (event: ChangeEvent<HTMLInputElement>) => setSortBy(+event.target.value);
//     return (
//         <ul className={classNames("flex items-center space-x-2", className)}>
//             {/* <label className="flex items-center"><input className="form-radio mr-1" type="radio" onChange={onChange} checked={sortBy === SortBy.none} value={SortBy.none} name="sortby" />none</label> */}
//             <label className="flex items-center"><input className="form-radio mr-1" type="radio" onChange={onChange} checked={sortBy === SortBy.name} value={SortBy.name} name="sortby" />name</label>
//             <label className="flex items-center"><input className="form-radio mr-1" type="radio" onChange={onChange} checked={sortBy === SortBy.rgb} value={SortBy.rgb} name="sortby" />rgb</label>
//             <label className="flex items-center"><input className="form-radio mr-1" type="radio" onChange={onChange} checked={sortBy === SortBy.hsl} value={SortBy.hsl} name="sortby" />hsl</label>
//         </ul>
//     );
// }

// export function ColorListInfoPanel() {
//     return (
//         <div className="bg-primary-200">
//             <div className="mt-8 px-4 border-slate-700 border-b flex items-center justify-center space-x-4">
//                 <SortOrderSwitch className="p-4" />
//             </div>
//         </div>
//     );
// }

type StringNumberValue = { value: string | number | undefined; };
type FixValue<T> = Omit<T, 'value'> & StringNumberValue;

const Root = Prim.Root as ForwardRefExoticComponent<FixValue<Prim.RadioGroupProps> & RefAttributes<HTMLDivElement>>;
const Item = Prim.Item as ForwardRefExoticComponent<FixValue<Prim.RadioGroupItemProps> & RefAttributes<HTMLButtonElement>>;
const Indicator = Prim.Indicator;

function ItemCell({ label, value }: { label: string; } & StringNumberValue) {
    return (
        <label className="flex items-center space-x-1">
            <Item className="w-4 h-4 bg-primary-50 border-primary-400 border rounded-full flex items-center justify-center" value={value}>
                <Indicator className="w-2 h-2 bg-primary-600 rounded-full inline-block" />
            </Item>
            <div>{label}</div>
        </label>
    );
}

export function SortOrderSwitch({ className }: HTMLAttributes<HTMLDivElement>) {
    const [sortBy, setSortBy] = useAtom(viewListAtoms.sortByAtom);
    const onChange = (v: string) => setSortBy(+v);
    return (
        <Root className={classNames("text-sm flex items-center space-x-3", className)} aria-label="Sort order" value={sortBy} onValueChange={onChange}>
            <ItemCell label="RGB" value={SortBy.rgb} />
            <ItemCell label="HSL" value={SortBy.hsl} />
            <ItemCell label="Name" value={SortBy.name} />
        </Root>
    );
}
