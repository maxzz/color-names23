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
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto flex flex-col", className)}>
            {/* overflow-hidden */}
            {/* <div className="container max-w-md mx-auto flex flex-col space-y-4"> */}
            <div className="flex-0">
                <ColorNamesWheel />
            </div>
            {/* </div> */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
        </div>
    );
}
