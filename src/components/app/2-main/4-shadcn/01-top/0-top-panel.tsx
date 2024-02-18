import { useSnapshot } from "valtio";
import { parseText } from "@/store";
import { Button, Textarea } from "@/components/ui/shadcn";
import { IconMenuBurger } from "@/components/ui/icons";
import { TestButtons } from "./8-test-buttons";
import { TestButtonsContext } from "./9-test-buttons-context";

function PasteInput() {
    const snap = useSnapshot(parseText, { sync: true });
    return (
        <Textarea
            value={snap.text}
            onChange={(e) => parseText.text = e.target.value}
            className="self-stretch min-h-[36px] text-xs smallscroll resizer [&::-webkit-resizer]:rounded [&::-webkit-resizer]:[backgroundSize:80%_80%]"
            rows={1}
            placeholder="Paste theme vars here"
            spellCheck={false}
        />
    );
}

export function TopPanel() {
    return (
        <div className="-mx-4 px-4 py-4 bg-muted/50 select-none grid grid-cols-[auto,1fr,auto,auto] gap-2">

            <Button className="mt-[13px]" variant={"outline"} size={"icon"}>
                <IconMenuBurger className="w-4 h-4" />
            </Button>

            {/* test styles */}

            <div className="">
                <div className="text-[.55rem]">theme styles</div>
                <PasteInput />
            </div>
            {/* test 1 */}

            <div className="flex flex-col items-center">
                <div className="text-[.55rem] text-center">without context</div>
                <div className="w-min flex flex-col space-y-1">
                    <TestButtons />
                </div>
            </div>

            {/* test 2 */}

            <div className="flex flex-col items-center">
                <div className="text-[.55rem] text-center">with context</div>
                <div className="w-min flex flex-col space-y-1">
                    <TestButtonsContext />
                </div>
            </div>

        </div>
    );
}

//TODO: fix popup size for light theme
