import { HTMLAttributes } from "react";
import { HuePicker, MessageHueColorCopied } from "@/components/ui/color-names-distribution";
import { classNames } from "@/utils";
import { ViewColorOverBackground } from "./view-color-over-background";
import { colorOverBackground } from "@/store";

export function PageHueWheel({ className }: HTMLAttributes<HTMLUListElement>) {
    return (
        <div className={classNames("p-4 max-w-4xl text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)}>
            {/* overflow-hidden */}
            {/* <div className="container max-w-md mx-auto flex flex-col space-y-4"> */}
            <div className="flex-0 relative">
                <ViewColorOverBackground className="absolute -left-1 -top-1" colorOverBackground={colorOverBackground} />
                <MessageHueColorCopied className="absolute right-2 top-2" />
                <HuePicker className="aspect-square" />
            </div>
            {/* </div> */}

            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at.
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae labore facilis sint eum a facere dignissimos tempora repellat dolore! Eligendi magnam praesentium sunt dolorum laudantium sequi mollitia possimus deserunt at. */}
        </div>
    );
}
