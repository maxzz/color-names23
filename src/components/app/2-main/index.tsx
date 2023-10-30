import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { AppAtoms, SectionName } from '@/store';
import { Section1_ColorsByHue } from './1-colors-by-hue';
import { Section2_ColorsList } from './2-colors-list';
import { Section3_Tailwind } from './3-tailwind';
import { Section4_Chadcn } from './4-shadcn';
import { classNames } from '@/utils';

export function App2_Main({ className }: HTMLAttributes<HTMLDivElement>) {
    const current = useAtomValue(AppAtoms.currentSectionAtom);
    return (
        <div className={classNames("min-h-0 text-foreground bg-background", className)}>

            {current === SectionName.hue &&
                <div className="h-full flex flex-col">
                    <Section1_ColorsByHue className="flex-1 overflow-overlay smallscroll" />
                </div>
            }

            {current === SectionName.list &&
                <div className="h-full flex flex-col">
                    <Section2_ColorsList className="flex-1" />
                </div>
            }

            {current === SectionName.tailwind &&
                <div className="h-full flex flex-col">
                    <Section3_Tailwind className="flex-1" />
                </div>
            }

            {current === SectionName.shadcn &&
                <div className="h-full flex flex-col">
                    <Section4_Chadcn className="flex-1" />
                </div>
            }

        </div>
    );
}
