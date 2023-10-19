import { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { AppAtoms } from '@/store';
import { IconGithubLogo } from '@/components/ui/icons';
import { classNames } from '@/utils';
import { ThemeSwitch } from '../../ui/shadcn';
import { linkClasses } from '../../ui';
import { SectionName } from '@/store/types';

function LinkButton(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a className={linkClasses} target="_blank" {...props} />
    );
}

function Section1_HueLinks() {
    return (<>
        <LinkButton href="https://enes.in/sorted-colors" title="Mustafa Enes sorted-colors">Original project</LinkButton>
        <LinkButton href="https://maxzz.github.io/color-names" title="My sorted-colors take one">My initial project</LinkButton>
    </>);
}

function Section2_ColorListLinks() {
    return (<>
        <LinkButton href="https://meyerweb.com/eric/css/colors">Color equivalents table (meyerweb.com)</LinkButton>
    </>);
}

function Section3_TailwindLinks() {
    return (<>
        <LinkButton href="https://tailwindcss.com/docs/customizing-colors" title="Colors on Tailwind CSS website">Tailwind CSS palettes</LinkButton>
    </>);
}

function GitHubLink() {
    return (
        <LinkButton href="https://github.com/maxzz/color-names23" title="Open the project's source code on Github">
            <IconGithubLogo className="w-5 h-5 fill-primary-200 stroke-current hover:stroke-foreground stroke-[50] hover:stroke-[34] hover:scale-[1.5] transition-all" />
        </LinkButton>
    );
}

export function App3_Footer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const current = useAtomValue(AppAtoms.currentSectionAtom);
    return (
        <div className={classNames("px-2 py-2 text-sm text-muted-foreground bg-background flex items-center justify-between space-x-4", className)} {...rest}>

            <div className="flex items-center space-x-4">
                <GitHubLink />

                {current === SectionName.hue && <Section1_HueLinks />}
                {current === SectionName.list && <Section2_ColorListLinks />}
                {current === SectionName.tailwind && <Section3_TailwindLinks />}
            </div>

            <ThemeSwitch />
        </div>
    );
}
