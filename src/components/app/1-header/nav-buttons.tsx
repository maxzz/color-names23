import { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { AppAtoms, SectionName } from '@/store';
import { classNames } from '@/utils';
import { Button } from '@/components/ui/shadcn/button';

// const btnStyle = {
//     highlight: {
//         backgroundColor: "#11225d",
//         boxShadow: "0px 0px 3px 3px #2c4083"
//     }
// };//text-[#347d84]
//
// function LinkButton({ label, sectionName }: { label: string, sectionName: SectionName; }) {
//     const [currentSection, setCurrentSection] = useAtom(AppAtoms.currentSectionAtom);
//     const isActive = currentSection === sectionName;
//     return (
//         <li
//             className={classNames(
//                 "px-2 py-1 text-sm text-center border-primary-500 border rounded select-none cursor-pointer active:scale-[.98] transition-colors",
//                 isActive
//                     ? "text-foreground bg-title border-primary-300"
//                     : "text-foreground hover:text-primary-300 hover:border-primary-300",
//             )}
//             style={isActive ? btnStyle.highlight : {}}
//             onClick={() => setCurrentSection(sectionName)}
//         >
//             {label}
//         </li>
//     );
// }

function LinkButton({ label, sectionName }: { label: string, sectionName: SectionName; }) {
    const [currentSection, setCurrentSection] = useAtom(AppAtoms.currentSectionAtom);
    const isActive = currentSection === sectionName;
    return (
        <Button className={classNames(isActive ? "bg-accent" : "")} variant="outline" size="sm" onClick={() => setCurrentSection(sectionName)}>
            {label}
        </Button>
    );
}

export function NavButtons({ className }: HTMLAttributes<HTMLUListElement>) {
    return (
        <div className={classNames("space-x-1 md:space-x-0 md:space-y-2", className)} >
            <LinkButton label="Hue groups" sectionName={SectionName.hue} />
            <LinkButton label="Named colors" sectionName={SectionName.list} />
            <LinkButton label="Tailwind" sectionName={SectionName.tailwind} />
            <LinkButton label="chadcn" sectionName={SectionName.shadcn} />
        </div>
    );
}
