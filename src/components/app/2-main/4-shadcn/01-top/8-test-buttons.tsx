import { Button } from "@/components/ui/shadcn";
import { parseText } from "@/store";
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { ShowPicker } from "./1-show-picker";

const test1 = ` `;

// const test2 = `--primary: 0 100% 50%;
// `;

const test2 = `addBase({
    ":root": {
        "--background": "0 0% 100%",
        "--foreground": "222.2 47.4% 11.2%",
        "--muted": "210 40% 96.1%",
        "--muted-foreground": "215.4 16.3% 46.9%",
        "--accent": "210 40% 96.1%",
        "--accent-foreground": "222.2 47.4% 11.2%",
        "--primary": "222.2 47.4% 11.2%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 40% 96.1%",
        "--secondary-foreground": "222.2 47.4% 11.2%",
        "--destructive": "0 100% 50%",
        "--destructive-foreground": "210 40% 98%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 47.4% 11.2%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 47.4% 11.2%",
        "--input": "214.3 31.8% 91.4%",
        "--border": "214.3 31.8% 91.4%",
        "--ring": "215 20.2% 65.1%",
        "--radius": "0.5rem"
    },
    ".dark": {
        "--background": "224 71% 4%",
        "--foreground": "213 31% 91%",
        "--muted": "223 47% 11%",
        "--muted-foreground": "215.4 16.3% 56.9%",
        "--accent": "216 34% 17%",
        "--accent-foreground": "210 40% 98%",
        "--primary": "210 40% 98%",
        "--primary-foreground": "222.2 47.4% 1.2%",
        "--secondary": "222.2 47.4% 11.2%",
        "--secondary-foreground": "210 40% 98%",
        "--destructive": "0 63% 31%",
        "--destructive-foreground": "210 40% 98%",
        "--popover": "224 71% 4%",
        "--popover-foreground": "215 20.2% 65.1%",
        "--card": "224 71% 4%",
        "--card-foreground": "213 31% 91%",
        "--input": "216 34% 17%",
        "--border": "216 34% 17%",
        "--ring": "216 34% 17%",
        "--radius": "0.5rem"
    }
});
`;

const test3 =
    `--primary: 161 56% 35%;
--background: 159 65% 4%;
--foreground: 159 10% 97.5%;

 --primary: 0 100% 50%;
`;

const test4 =
    `:root {
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

type TestButtonProps = {
    label: string;
    testCaseString: string;
    triggerRef: MutableRefObject<HTMLElement | null>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

function TestButton({ label, testCaseString, triggerRef, open, setOpen }: TestButtonProps) {

    function onMouseDown(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.preventDefault();

        const isPicker = event.currentTarget.classList.contains('c-picker');
        const isSameAnchor = triggerRef.current === event.currentTarget;
        triggerRef.current = event.currentTarget;

        console.log(`isPicker=${isPicker} isSameAnchor=${isSameAnchor} open=${open} event.currentTarget='${event.currentTarget.innerText}'`);

        if (!isPicker || isSameAnchor) {
            console.log('1: (!isPicker || isSameAnchor)');

            setOpen(p => !p);
        } else if (isPicker && !open) {
            console.log('2: (isPicker && !open)');

            setOpen(true);
        } else if (isPicker && open) {
            console.log('3: (isPicker && open)');

            setTimeout(() => {
                setOpen(true);
            }, 200);
        }

        parseText.text = testCaseString;
    }

    return (
        <Button className="c-picker flex-none relative" variant={"outline"} size={"icon"} onMouseDown={onMouseDown}>
            {label}
        </Button>
    );
}

export function TestButtons() {
    const anchorRef = useRef<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);
    return (
        <>
            <TestButton label="0/0" testCaseString={test1} triggerRef={anchorRef} open={open} setOpen={setOpen} />
            <TestButton label="1/0" testCaseString={test2} triggerRef={anchorRef} open={open} setOpen={setOpen} />
            <TestButton label="3/0" testCaseString={test3} triggerRef={anchorRef} open={open} setOpen={setOpen} />
            <TestButton label="3/1" testCaseString={test4} triggerRef={anchorRef} open={open} setOpen={setOpen} />

            {open && anchorRef.current && (
                <ShowPicker open={open} setOpen={setOpen} anchorRef={anchorRef} />
            )}
        </>
    );
}
