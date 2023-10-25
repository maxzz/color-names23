import { Input } from "@/components/ui/shadcn";
import { CssVarNameValue } from "@/store/4-shadcn/types";

export function ColorInput({ color, colorSnap }: { color?: CssVarNameValue; colorSnap?: CssVarNameValue; }) {
    return (<>
        {color?.value && colorSnap?.value
            ? <Input value={colorSnap.value} onChange={(e) => { color.value = e.target.value; }} />
            : <div className=""></div>
        }
    </>);
}
