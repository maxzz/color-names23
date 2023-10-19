import { HTMLAttributes } from "react";
import { HuePicker, MessageHueColorCopied } from "@/components/ui/color-names-distribution/controlled";
import { classNames } from "@/utils";

export function PageHueWheel({ className }: HTMLAttributes<HTMLUListElement>) {
    return (
        <div className={classNames("text-foreground bg-background border-muted border-b overflow-auto flex flex-col", className)}>
            {/* overflow-hidden */}
            {/* <div className="container max-w-md mx-auto flex flex-col space-y-4"> */}
            <div className="flex-0 relative">
                <MessageHueColorCopied className="absolute top-2 right-2" />
                <HuePicker />
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
