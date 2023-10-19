import { linkClasses } from "@/components/ui";
import { SortOrderSwitch } from "./sort-order-switch";
import { classNames } from "@/utils";

export function ColorListInfoPanel() {
    return (
        <div className="bg-muted">
            {/* <div className="mt-8 text-center">The 147 color keywords defined in SVG plus one more, as defined in the CSS Color Module Level 4</div> */}
            {/* <div className="mt-8 text-center">The color keywords defined in SVG plus one more as defined in the CSS level 4 color module</div> */}
            
            <div className="mt-8 text-center">
                Color keywords defined by
                {' '}
                <a className={classNames(linkClasses, "text-foreground/60")} href="http://dev.w3.org/csswg/css-color" target="_blank">
                    W3C CSS Color Module Level 4
                </a>
            </div>

            <div className="px-4 border-border border-b flex items-center justify-center space-x-2">
                <div className="text-sm">Sort by:</div>
                <SortOrderSwitch className="py-4" />
            </div>
        </div>
    );
}
