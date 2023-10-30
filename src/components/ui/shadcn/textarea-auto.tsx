import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils";
import { Textarea } from "./textarea";

// https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas
const containerClasses = '\
after:![content:attr(data-replicated)_"_"] \
after:whitespace-pre \
after:border-transparent \
after:invisible \
after:[grid-area:1/1/2/2] \
grid';
const textareaClasses = "resize-none overflow-hidden [grid-area:1/1/2/2]";

// These are for container padding, font, and border adjustments
export const textareaPaddingFontClasses = 'after:px-3 after:py-2 after:text-sm after:border';

// These are for debugging
export const textareaPaddingFontDebugClasses = "after:text-red-500 after:visible after:pointer-events-none";

export function AutoGrowTextarea({ textareaPaddingFont = textareaPaddingFontClasses, className, value, ...rest }: { textareaPaddingFont?: string; } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div className={cn(containerClasses, textareaPaddingFont)} data-replicated={value}>
            <Textarea className={cn(textareaClasses, className)} value={value} {...rest} />
        </div>
    );
}
