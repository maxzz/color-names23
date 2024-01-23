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
        <div className="-mx-4 px-4 py-4 bg-muted/50 flex items-center space-x-2">

            <Button className="flex-none" variant={"outline"} size={"icon"}>
                <IconMenuBurger className="w-4 h-4" />
            </Button>

            {/* test styles */}

            <div className="w-6"></div>
            <div className="text-[.55rem] text-center">theme styles</div>
            <PasteInput />

            {/* test 1 */}

            <div className="w-24"></div>
            <div className="text-[.55rem] text-center">without context</div>
            <div className="w-min flex flex-col space-y-2">
                <TestButtons />
            </div>

            {/* test 2 */}

            <div className="w-24"></div>
            <div className="text-[.55rem] text-center">with context</div>
            <div className="w-min flex flex-col space-y-2">
                <TestButtonsContext />
            </div>

        </div>
    );
}
