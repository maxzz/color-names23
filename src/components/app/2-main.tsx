import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { AppAtoms, SectionName } from '@/store';
import { Section1_ColorsByHue } from '../sections/1-colors-by-hue';
import { Section2_ColorsList } from '../sections/2-colors-list';
import { Section3_Tailwind } from '../sections/3-tailwind';
import { Experiments } from '../ui/experiments/Experiments';
import { classNames } from '@/utils';

export function App2_Main({ className }: HTMLAttributes<HTMLDivElement>) {
    const currentSection = useAtomValue(AppAtoms.currentSectionAtom);
    return (
        <div className={classNames("min-h-0 text-primary-900 bg-gradient-radial-to-tl from-slate-200 to-slate-50", className)}>
            {/* <Experiments /> */}

            {currentSection === SectionName.hue &&
                <div className="h-full flex flex-col">
                    <Section1_ColorsByHue className="flex-1 overflow-y-auto" style={{ overflow: 'overlay' }} />
                </div>
            }

            {currentSection === SectionName.list &&
                <div className="h-full flex flex-col">
                    <Section2_ColorsList className="flex-1" />
                </div>
            }

            {currentSection === SectionName.tailwind &&
                <div className="h-full flex flex-col">
                    <Section3_Tailwind className="flex-1" />
                </div>
            }

        </div>
    );
}
