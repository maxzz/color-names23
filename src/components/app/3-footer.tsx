import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { AppAtoms, SectionName } from '@/store';
import { IconGithubLogo } from '@/components/ui/icons/normal';
import { classNames } from '@/utils';

function Section1_HueLinks() {
    return (<>
        <a className="hover:text-primary-400 hover:underline" href="https://enes.in/sorted-colors" target="_blank" title="Mustafa Enes sorted-colors">
            original
        </a>

        <a className="hover:text-primary-400 hover:underline" href="https://maxzz.github.io/color-names" target="_blank" title="My sorted-colors take one">
            prev
        </a>
    </>);
}

function Section2_ColorListLinks() {
    return (<>
        <a className="hover:text-primary-400 hover:underline" href="https://meyerweb.com/eric/css/colors" target="_blank" title="Color equivalents table">
            meyerweb
        </a>
    </>);
}

function Section3_TailwindLinks() {
    return (<>
        <a className="hover:text-primary-400 hover:underline" href="https://tailwindcss.com/docs/customizing-colors" target="_blank" title="Colors on Tailwind CSS website">
            Tailwind palettes
        </a>
    </>);
}

function GitHubLink() {
    return (
        <a href="https://github.com/maxzz/color-names22" target="_blank">
            <IconGithubLogo
                className="w-5 h-5 fill-primary-200 stroke-[50] stroke-current hover:stroke-primary-200 hover:scale-[1.5] hover:stroke-[34] transition-all"
                title="Open the source code of the project on Github"
            />
        </a>
    );
}

export function App3_Footer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const currentSection = useAtomValue(AppAtoms.currentSectionAtom);
    return (
        <div className={classNames(
            "px-4 py-2 text-sm flex items-center justify-end space-x-4 bg-title text-primary-400/75",
            //"border-primary-400 border-t shadow-[0px_-1px_2px_1px_#b69a7950]",
            className,
        )} {...rest}>
            {currentSection === SectionName.hue && <Section1_HueLinks />}
            {currentSection === SectionName.list && <Section2_ColorListLinks />}
            {currentSection === SectionName.tailwind && <Section3_TailwindLinks />}
            <GitHubLink />
        </div>
    );
}
