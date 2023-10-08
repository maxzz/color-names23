import { HTMLAttributes } from 'react';
import * as Prim from '@radix-ui/react-switch';
import { styled } from '@/stitches.config';
import { classNames } from '@/utils';

const blackA = {
    blackA7: '#00000080',
    blackA9: 'red',
};

const StyledSwitch = styled(Prim.Root, {
    //all: 'unset',
    // width: 42,
    // height: 25,
    //backgroundColor: blackA.blackA9,
    //borderRadius: '9999px',
    //position: 'relative',
    //boxShadow: `0 2px 10px ${blackA.blackA7}`,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    //'&:focus': { boxShadow: `0 0 0 2px black` },

    //'&[data-state="checked"]': { backgroundColor: 'rgb(156, 163, 175)' }, //bg-gray-400
});

const StyledThumb = styled(Prim.Thumb, {
    display: 'block',
    // width: 21,
    // height: 21,
    backgroundColor: 'white',
    borderRadius: '9999px',
    boxShadow: `0 2px 2px ${blackA.blackA7}`,
    transition: 'transform 100ms',
    transform: 'translateX(2px)',
    willChange: 'transform',
    '&[data-state="checked"]': { transform: 'translateX(100%)' },
    // '&[data-state="checked"]': { transform: 'translateX(19px)' },
});

// Exports
const Switch = StyledSwitch;
const SwitchThumb = StyledThumb;

// Your app...
// const Flex = styled('div', { display: 'flex' });
// const Label = styled('label', {
//     color: 'white',
//     fontSize: 15,
//     lineHeight: 1,
//     userSelect: 'none',
// });

// const LabeledSwitch = () => (
//     <Flex css={{ alignItems: 'center' }}>
//         <Label htmlFor="s1" css={{ paddingRight: 15 }}>
//             Auto
//         </Label>
//         <Switch defaultChecked id="s1">
//             <SwitchThumb />
//         </Switch>
//     </Flex>
// );
//#7b899d

type SetValueProps = {
    value: boolean;
    onChange: (checked: boolean) => void;
};

export function UISwitch({ value, onChange, className, ...rest }: SetValueProps & Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'>) {
    return (
        <Switch
            className={classNames(
                "relative ml-2 w-[46px] h-[28px] flex items-center data-state-checked:bg-primary-300 bg-primary-200/50 ring-primary-400/30",
                "focus:ring-offset-primary-50 focus:ring-primary-300 ring-1 focus:ring-2 focus:ring-offset-2 outline-none rounded-full shadow",
                className
            )}
            checked={value}
            onCheckedChange={onChange}
            {...rest}
        >
            {/* <Switch className="ml-2 w-[42px] h-6 flex items-center bg-gray-700 rounded-full relative shadow ring-2 ring-gray-400 focus:ring-gray-900"> */}
            <SwitchThumb className="mb-px w-[22px] h-[22px]" />
        </Switch>
    );
}

export function UISwitchWithLabel({ value, onChange, children, className, onLeft, ...rest }: { onLeft?: boolean; } & SetValueProps & HTMLAttributes<HTMLLabelElement>) {
    return (
        <label className={classNames("flex items-center md:flex-col md:text-[.65rem] md:pb-2 lg:flex-row lg:text-sm lg:pb-0 select-none", className)} {...rest}>
            {onLeft && <UISwitch value={value} onChange={onChange} />}
            <div className="">
                {children}
            </div>
            {!onLeft && <UISwitch value={value} onChange={onChange} />}
        </label>
    );
}
