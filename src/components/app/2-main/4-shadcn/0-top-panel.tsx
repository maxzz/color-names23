import { useSnapshot } from "valtio";
import { parseText } from "@/store";
import { Button, Textarea } from "@/components/ui/shadcn";
import { IconMenuBurger } from "@/components/ui/icons";

export function PasteArea() {
    const snap = useSnapshot(parseText, { sync: true });
    return (
        <div className="-mx-4 px-4 py-4 bg-muted/50 flex items-center space-x-2">
            <Button variant={"outline"} size={"icon"}>
                <IconMenuBurger className="w-4 h-4" />
            </Button>

            <Textarea
                value={snap.text}
                onChange={(e) => parseText.text = e.target.value}
                className="min-h-[36px] text-xs smallscroll resizer [&::-webkit-resizer]:rounded [&::-webkit-resizer]:[backgroundSize:80%_80%]"
                rows={1}
                placeholder="Paste theme vars here"
                spellCheck={false}
            />
        </div>
    );
}
