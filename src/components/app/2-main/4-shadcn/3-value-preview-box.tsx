import { HTMLAttributes, SVGAttributes } from "react";
import { classNames } from "@/utils";
import { CssVarNameValue, ForeAndBack } from "@/store/4-shadcn/types";
import { IconNoColor } from "@/components/ui/icons";

const previewColorClasses = "flex-none aspect-square w-9 h-9 ring-border ring-offset-foreground/30 ring-2 ring-offset-1 rounded overflow-hidden";
const previewNoColorClasses = `${previewColorClasses} stroke-none bg-neutral-100 fill-neutral-400`;

function ValuePreviewUndefined({ className, ...rest }: SVGAttributes<SVGSVGElement>) {
    return (
        <IconNoColor className={classNames(previewNoColorClasses, className)} {...rest} />
    );
}

function ValuePreviewColor({ color, className, ...rest }: { color: string; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(previewColorClasses, className)} style={{ backgroundColor: `hsl(${color})` }} {...rest}></div>
    );
}

function ValuePreviewLength({ value, className, isBackOrFore, ...rest }: { value: string; isBackOrFore?: boolean; } & HTMLAttributes<HTMLDivElement>) {
    // like radius
    if (!isBackOrFore) {
        return <div className=""></div>;
    }
    return (
        <div className={classNames("relative", previewColorClasses, className)} {...rest}>
            <div className="absolute inset-1.5 border-l-2 border-t-2 border-muted-foreground bg-muted" style={{ borderTopLeftRadius: value }}></div>
        </div>
    );
}

export function ValuePreviewBox({ color, both, isBackOrFore }: { color?: CssVarNameValue; both: ForeAndBack; isBackOrFore?: boolean; }) {
    const isUndefined = !color?.value && !isBackOrFore && (both.b?.isHsl || both.f?.isHsl);
    const isColor = color?.value && color?.isHsl;
    const isLength = color?.value && !color?.isHsl && isBackOrFore;
    return (
        <div>
            {isColor && <ValuePreviewColor color={color.value} />}
            {isUndefined && <ValuePreviewUndefined />}
            {isLength && <ValuePreviewLength value={color.value} isBackOrFore={isBackOrFore} />}
        </div>
    );
}
