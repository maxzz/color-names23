import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { AppAtoms, SectionName } from '@/store';
import { Section1_ColorsByHue } from '../sections/1-colors-by-hue';
import { Section2_ColorsList } from '../sections/2-colors-list';
import { Section3_Tailwind } from '../sections/3-tailwind';
import { Section4_Chadcn } from '../sections/4-shadcn';
import { Section5_HueWheel } from '../sections/5-hue-wheel';
import { classNames } from '@/utils';

export function App2_Main({ className }: HTMLAttributes<HTMLDivElement>) {
    const current = useAtomValue(AppAtoms.currentSectionAtom);
    return (
        <div className={classNames("min-h-0 text-foreground bg-background", className)}>

            {current === SectionName.hue &&
                <div className="h-full flex flex-col">
                    <Section1_ColorsByHue className="flex-1 overflow-y-auto" style={{ overflow: 'overlay' }} />
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

            {/* {current === SectionName.hueWheel &&
                <div className="h-full flex flex-col">
                    <Section5_HueWheel className="flex-1" />
                </div>
            } */}

        </div>
    );
}
