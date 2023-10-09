import { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { AppAtoms, SectionName } from '@/store';
import { classNames } from '@/utils';
import { Button } from '@/components/ui/shadcn/button';

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
