import { useSnapshot } from "valtio";
import { parseText } from "@/store";
import { Textarea } from "@/components/ui/shadcn";

export function PasteArea() {
    const snap = useSnapshot(parseText, { sync: true });
    return (<>
        <Textarea
            value={snap.text}
            onChange={(e) => parseText.text = e.target.value}
            className="min-h-[36px] text-xs smallscroll resizer [&::-webkit-resizer]:rounded [&::-webkit-resizer]:[backgroundSize:80%_80%]"
            rows={1}
            placeholder="Paste theme vars here"
            spellCheck={false}
        />

        {/* <TextareaAutoGrow
            value={snap.text}
            onChange={(e) => parseText.text = e.target.value}
            rows={1}
            className="min-h-0"
            
            placeholder="Paste theme vars here"
            spellCheck={false}
        /> */}
    </>);
}
