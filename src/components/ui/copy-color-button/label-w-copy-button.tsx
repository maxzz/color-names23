import { classNames } from "@/utils";
import { IconClipboard } from "@/components/ui/icons/normal";

export function ValueViewIcon({ valueToCopy, isHovered }: { valueToCopy?: string; isHovered?: boolean; }) {
    return (
        <div
            className={classNames(
                "px-1 py-1",
                "inline-flex items-center cursor-pointer",
                isHovered && "px-1 py-1 bg-slate-100 text-primary-900 outline-slate-500 outline-1 outline rounded shadow active:scale-x-[.97]",
            )}
        >
            <div>
                {valueToCopy}
            </div>

            <div className={classNames("ml-1", isHovered ? "visible" : "invisible")}>
                <IconClipboard className="w-4 h-4 text-primary-500" />
            </div>
        </div>
    );
}
