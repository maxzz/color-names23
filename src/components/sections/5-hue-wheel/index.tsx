import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { ColorNamesWheel } from "@/components/ui/color-names-distribution/controlled";

// function HueWheel() {
//     return (
//         <div className="flex items-center justify-between">

//         </div>
//     );
// }

export function Section5_HueWheel({ className }: HTMLAttributes<HTMLUListElement>) {
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-hidden flex flex-col", className)}>
            {/* <div className="container max-w-md mx-auto flex flex-col space-y-4"> */}
            <ColorNamesWheel />
            {/* </div> */}
        </div>
    );
}
