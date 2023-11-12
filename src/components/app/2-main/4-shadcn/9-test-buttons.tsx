import { Button, Popover, PopoverAnchor, PopoverContent, Textarea } from "@/components/ui/shadcn";
import { parseText } from "@/store";
import { SaturationSelector } from "@/components/ui/color-picker";
import { classNames } from "@/utils";
import { Dispatch, HTMLAttributes, RefObject, SetStateAction, useRef, useState } from "react";

const test1 = ` `;

const test2 = `--primary: 0 100% 50%;
`;

const test3 = `
--primary: 161 56% 35%;
--background: 159 65% 4%;
--foreground: 159 10% 97.5%;

 --primary: 0 100% 50%;
`;

const test4 = `
:root {
    --primary: 161 56% 35%;
    --background: 159 65% 4%;
    --foreground: 159 10% 97.5%;
}
.dark {
    --primary: 0 100% 50%;
}
`;

// export function TestButtons() {
//     return (
//         <>
//             <Button className="flex-none" variant={"outline"} size={"icon"} onClick={() => parseText.text = test1}>0/0</Button>
//             <Button className="flex-none" variant={"outline"} size={"icon"} onClick={() => parseText.text = test2}>1/0</Button>
//             <Button className="flex-none" variant={"outline"} size={"icon"} onClick={() => parseText.text = test3}>3/0</Button>
//             <Button className="flex-none" variant={"outline"} size={"icon"} onClick={() => parseText.text = test4}>3/1</Button>
//             <ShowPicker />
//         </>
//     );
// }

export function TestButtons() {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button className="flex-none relative" variant={"outline"} size={"icon"} onClick={() => parseText.text = test1} ref={anchorRef}>0/0</Button>
            <Button className="flex-none relative" variant={"outline"} size={"icon"} onClick={() => parseText.text = test2}>1/0</Button>
            <Button className="flex-none relative" variant={"outline"} size={"icon"} onClick={() => parseText.text = test3}>3/0</Button>
            <Button className="flex-none relative" variant={"outline"} size={"icon"}
                onMouseDown={(event) => {
                    event.preventDefault();

                    parseText.text = test4;
                    setOpen(p => !p);
                }}
            >3/1</Button>

            {open && anchorRef.current && <ShowPicker open={open} setOpen={setOpen} anchorRef={anchorRef} />}
        </>
    );
}

function ShowPicker({ open, setOpen, anchorRef, className, ...rest }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, anchorRef: RefObject<HTMLButtonElement>; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="absolute">
            <Popover open={open} onOpenChange={() => setTimeout(() => setOpen(false), 100)}>
                <PopoverAnchor className="relative w-0 h-0" virtualRef={anchorRef} />
                <PopoverContent className={classNames("p-0 w-auto", className)} {...rest}>
                    <SaturationSelector />
                </PopoverContent>
            </Popover>
        </div>
    );
}
