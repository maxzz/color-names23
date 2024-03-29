import { ButtonHTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn";
import { IconCheckbox, IconMenuBurger } from "@/components/ui/icons";
import { formatPickerState } from "../ui-state-format";
import { formatList } from "../types";

function Item({ label, formatIdx, currentFormatIdx }: { label: string; formatIdx: number; currentFormatIdx: number; }) {
    return (
        <DropdownMenuItem
            className="text-xs grid grid-cols-[16px,1fr] items-center gap-x-2"
            onClick={() => {
                formatPickerState.formatIdx = formatIdx;
            }}
        >
            {formatIdx === currentFormatIdx && <IconCheckbox className="w-4 h-4" />}

            <div className="col-start-2">
                {label}
            </div>
        </DropdownMenuItem>
    );
}

export function FormatMenu({ className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { formatIdx } = useSnapshot(formatPickerState);
    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'} className="p-0.5 w-5 h-5 flex-none" {...rest}>
                    <IconMenuBurger />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" alignOffset={-10}>
                {
                    formatList.map((format, idx) => (
                        <Item label={format.name} formatIdx={idx} currentFormatIdx={formatIdx} key={idx} />
                    ))
                }
            </DropdownMenuContent>

        </DropdownMenu>
    );
}
