import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { MaterialPaletteShades, materialPalette } from "./material-palette";

export function PaletteSelector({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("flex space-x-2", className)} {...rest}>
            
            <div className="flex-1 flex flex-wrap">
                {materialPalette.colors.map((color, idx) => (
                    <div
                        className={classNames("m-1 w-4 h-4 rounded")}
                        // style={{ background: MaterialPaletteShades.get(color) || ''}}
                        style={{ background: color}}
                        key={idx}
                    />
                ))}
            </div>

            <div className="flex-none">dropdown</div>
        </div>
    );
}
