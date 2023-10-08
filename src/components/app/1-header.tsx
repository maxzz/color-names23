import { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { AppAtoms, SectionName } from '@/store';
import { App3_Footer } from './3-footer';
import { classNames } from '@/utils';

const btnStyle = {
    "hi": {
        backgroundColor: "#11225d",
        boxShadow: "0px 0px 3px 3px #2c4083"
    }
};//text-[#347d84]

function LinkButton({ label, sectionName }: { label: string, sectionName: SectionName; }) {
    const [currentSection, setCurrentSection] = useAtom(AppAtoms.currentSectionAtom);
    const isActive = currentSection === sectionName;
    return (
        <li
            className={classNames(
                "px-2 py-1 text-sm text-center border-primary-500 border rounded select-none cursor-pointer active:scale-[.98] transition-colors",
                isActive ? "text-primary-300 bg-title border-primary-300" : "text-primary-500 hover:text-primary-300 hover:border-primary-300",
            )}
            style={isActive ? btnStyle.hi : {}}
            onClick={() => setCurrentSection(sectionName)}
        >
            {label}
        </li>
    );
}

function Links({ className }: HTMLAttributes<HTMLUListElement>) {
    return (
        <ul className={classNames("space-y-2", className)} >
            <LinkButton label="Hue groups" sectionName={SectionName.hue} />
            <LinkButton label="Named colors" sectionName={SectionName.list} />
            <LinkButton label="Tailwind" sectionName={SectionName.tailwind} />
        </ul>
    );
}

//const textShadow = { textShadow: '1px 1px red, -1px -1px white', 'WebkitTextStroke': '0.5px #f3e8ff', };
//const textShadow = { textShadow: 'red 1px 1px, #5f81f473 -1px -1px', 'WebkitTextStroke': '0.5px #232c49', };
const textShadow = {
    textShadow: "#347d84 1px 1px, #8c9cd475 -3px 0px 5px",
    WebkitTextStroke: "0.5px #000000",
    color: "rgb(102 116 161)",
};

export function App1_Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex flex-col">
            <div className={classNames(
                "flex-1 relative py-12 bg-title",
                //"border-primary-400 border-b",
                className,
            )} {...rest}>
                <div className="text-base flex items-center uppercase font-orgiginal" style={textShadow}>
                    <div className="mx-auto scale-y-[1.5]">CSS Color Names 23</div>
                </div>
                <div className={classNames(
                    "absolute h-full top-0 right-2 flex items-center",
                    "md:relative md:h-auto md:top-auto md:right-auto md:block",
                    "md:py-8 md:mx-auto md:max-w-[50%]",
                )}>
                    <Links className="" />
                </div>
            </div>
            <div className="hidden md:block">
                <App3_Footer />
            </div>
        </div>
    );
}

//TODO: We can simplify it, by always having footer and change width from full width to width of sidebar
//      or can have a global state with parent layot width
