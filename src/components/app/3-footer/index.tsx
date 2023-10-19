import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { SectionName } from '@/store/types';
import { AppAtoms } from '@/store';
import { Link } from '@/components/ui';
import { ThemeSwitch } from '@/components/ui/shadcn';
import { IconGithubLogo } from '@/components/ui/icons';
import { classNames } from '@/utils';

function Section1_HueLinks() {
    return (<>
        <Link href="https://enes.in/sorted-colors" title="Mustafa Enes sorted-colors">Original project</Link>
        <Link href="https://maxzz.github.io/color-names" title="My sorted-colors take one">My initial project</Link>
    </>);
}

function Section2_ColorListLinks() {
    return (<>
        <Link href="https://meyerweb.com/eric/css/colors">Color equivalents table (meyerweb.com)</Link>
    </>);
}

function Section3_TailwindLinks() {
    return (<>
        <Link href="https://tailwindcss.com/docs/customizing-colors" title="Colors on Tailwind CSS website">Tailwind CSS palettes</Link>
    </>);
}

function GitHubLink() {
    return (
        <Link href="https://github.com/maxzz/color-names23" title="Open the project's source code on Github">
            <IconGithubLogo className="w-5 h-5 fill-primary-200 stroke-current hover:stroke-foreground stroke-[50] hover:stroke-[34] hover:scale-[1.5] transition-all" />
        </Link>
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
