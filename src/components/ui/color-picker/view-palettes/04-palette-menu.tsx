import { ButtonHTMLAttributes } from "react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn";
import { IconCheckbox, IconMenuBurger } from "@/components/ui/icons";

function Item({ label, paletteName, currentPaletteName }: { label: string; paletteName: string; currentPaletteName: string; }) {
    return (
        <DropdownMenuItem
            className="text-xs grid grid-cols-[16px,1fr] items-center gap-x-2"
            onClick={() => {}}
        >
            {paletteName === currentPaletteName && <IconCheckbox className="w-4 h-4" />}

            <div className="col-start-2">
                {label}
            </div>
        </DropdownMenuItem>
    );
}

export function PaletteMenu({ className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'} className="p-0.5 w-5 h-5 flex-none" {...rest}>
                    <IconMenuBurger />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" alignOffset={-10}>
                <Item label="Material UI" paletteName="M" currentPaletteName="M"/>
                <Item label="Tailwind CSS" paletteName="T" currentPaletteName="M"/>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}
