import { classNames } from "@/utils";
import { IconClipboard } from "@/components/ui/icons";

const ValueViewIconClasses = "group px-1 py-1 font-semibold inline-flex items-center cursor-pointer";
const ValueViewIconActiveClasses = "text-foreground bg-background outline-border outline-1 outline rounded-[2px] shadow active:scale-y-[.95]";

export function ValueViewIcon({ valueToCopy, isHovered }: { valueToCopy?: string; isHovered?: boolean; }) {
    return (
        <div className={classNames(ValueViewIconClasses, isHovered && ValueViewIconActiveClasses,)}>
            <div className="group-active:scale-y-[1.2]">
                {valueToCopy}
            </div>

            <IconClipboard className={`ml-1 w-4 h-4 stroke-[1.5] text-muted-foreground ${isHovered ? "visible" : "invisible"}`} />
        </div>
    );
}
