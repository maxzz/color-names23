import { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/shadcn";
import { parseText } from "@/store";
import { ShowPicker } from "./1-show-picker";
import { ColorPickerProvider } from "./2-show-picker-context";

const test1 = ` `;

const test2 = `--primary: 0 100% 50%;
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

export function TestButtonsContext() {
    const anchorRef = useRef<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);

    const onColorChange = useCallback((color: string) => {
        console.log('onColorChange', color);
    }, []);

    const onFormatChange = useCallback((format: number) => {
        console.log('onFormatChange', format);
    }, []);

    return (
        <ColorPickerProvider onColorChange={onColorChange} onFormatChange={onFormatChange}>

            <TestButton label="0/0" testCaseString={test1} triggerRef={anchorRef} open={open} setOpen={setOpen} />
            <TestButton label="1/0" testCaseString={test2} triggerRef={anchorRef} open={open} setOpen={setOpen} />
            <TestButton label="3/0" testCaseString={test3} triggerRef={anchorRef} open={open} setOpen={setOpen} />
            <TestButton label="3/1" testCaseString={test4} triggerRef={anchorRef} open={open} setOpen={setOpen} />

            {open && anchorRef.current && (
                <ShowPicker open={open} setOpen={setOpen} anchorRef={anchorRef} />
            )}

        </ColorPickerProvider>
    );
}
