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
    console.log("TestButtons render", open);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    function clickOutside() {
        console.log("TestButtons clickOutside", open);

        clearTimeout(timeoutRef.current!);
        timeoutRef.current = setTimeout(() => setOpen(false), 100);
    }

    return (
        <>
            <Button ref={anchorRef} className="flex-none relative" variant={"outline"} size={"icon"} onClick={() => {
                console.log("test1", open);

                parseText.text = test1;
                !open && setOpen(true);
            }}>0/0</Button>
            <Button className="flex-none relative" variant={"outline"} size={"icon"} onClick={() => (parseText.text = test2, setOpen(p => !p))}>1/0</Button>
            <Button className="flex-none relative" variant={"outline"} size={"icon"} onClick={() => (parseText.text = test3, setOpen(p => !p))}>3/0</Button>
            <Button className="flex-none relative" variant={"outline"} size={"icon"} onMouseDown={(event) => {
                parseText.text = test4;
                if (!open) event.preventDefault();
                // !open && setOpen(true);
                console.log("TestButtons onMouseDown", open);

                setOpen(p => !p);
                // setOpen(true);
            }}>3/1</Button>

            {open && anchorRef.current && <ShowPicker open={open} setOpen={clickOutside} anchorRef={anchorRef} />}
        </>
    );
}

function ShowPicker({ open, setOpen, anchorRef, className, ...rest }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, anchorRef: RefObject<HTMLButtonElement>; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="absolute">
            <Popover
                open={open}
                onOpenChange={(s) => {
                    console.log('Picker onOpenChange setOpen =', s);
                    setOpen(s);
                    //setOpen(p => !p);
                }}
                //onInteractOutside={() => { }}
            >
                {/* <Popover open={open} > */}
                {/* <Popover open={open} onOpenChange={setOpen}> */}
                <PopoverAnchor className="relative w-0 h-0" virtualRef={anchorRef} />
                <PopoverContent className={classNames("p-0 w-auto", className)} {...rest}>
                    <SaturationSelector />
                </PopoverContent>
            </Popover>
        </div>
    );
}
