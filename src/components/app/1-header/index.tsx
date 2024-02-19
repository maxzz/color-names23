import { HTMLAttributes } from 'react';
import { NavButtons } from './nav-buttons';
import { AppTitle } from './app-title';
import { App3_Footer } from '../3-footer';
import { classNames } from '@/utils';

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

const headerBorderClasses = "border-muted-foreground/20 border-b md:border-b-0 border-r-0 md:border-r";

export function App1_Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`py-2 md:mt-0 bg-popover ${headerBorderClasses} flex flex-col`}>

            <div className={classNames("flex-1 px-4 pb-px flex md:block md:flex-col items-center justify-between", className)} {...rest}>

                <div className="flex items-center justify-start md:justify-center">
                    <AppTitle />
                </div>

                <div className={navButtonContainerClasses}>
                    <NavButtons className="flex justify-end md:flex-col flex-wrap md:flex-nowrap" />
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
