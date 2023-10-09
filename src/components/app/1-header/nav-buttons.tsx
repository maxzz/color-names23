import { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { AppAtoms, SectionName } from '@/store';
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

export function NavButtons({ className }: HTMLAttributes<HTMLUListElement>) {
    return (
        <ul className={classNames("space-y-2", className)} >
            <LinkButton label="Hue groups" sectionName={SectionName.hue} />
            <LinkButton label="Named colors" sectionName={SectionName.list} />
            <LinkButton label="Tailwind" sectionName={SectionName.tailwind} />
        </ul>
    );
}
