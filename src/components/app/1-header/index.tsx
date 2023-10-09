import { HTMLAttributes } from 'react';
import { App3_Footer } from '../3-footer';
import { classNames } from '@/utils';
import { NavButtons } from './nav-buttons';
import { AppTitle } from './app-title';

const navButtonContainerClasses = "\
relative \
\
md:relative \
md:block \
md:py-8 \
md:top-auto \
md:right-auto \
md:h-auto \
md:mx-auto \
md:max-w-[50%] \
\
";

export function App1_Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="mt-4 md:mt-0 flex flex-col">

            <div className={classNames("flex-1 px-4 pt-12 pb-px bg-background border-muted-foreground/20 border-b md:border-b-0 border-r-0 md:border-r flex md:block md:flex-col items-center justify-between", className)} {...rest}>

                <div className="flex items-center justify-start md:justify-center">
                    <AppTitle />
                </div>

                <div className={navButtonContainerClasses}>
                    <NavButtons className="flex md:flex-col" />
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
