import { Button } from "@/components/ui/shadcn";
import { parseText } from "@/store";
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { ShowPicker } from "./1-show-picker";
import { test1, test2, test3, test4 } from "./9-test-css-vars";

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

            {/* {open && anchorRef.current && (
                <ShowPicker open={open} setOpen={setOpen} anchorRef={anchorRef} />
            )} */}
        </>
    );
}
