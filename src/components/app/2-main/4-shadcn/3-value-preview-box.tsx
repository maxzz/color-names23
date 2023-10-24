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

function ValuePreviewLength({ value, valueName, className, isBackOrFore, ...rest }: { value: string; valueName: string; isBackOrFore?: boolean; } & HTMLAttributes<HTMLDivElement>) {
    if (!isBackOrFore) {
        return <div className=""></div>;
    }
    return (
        <div className={classNames("relative", previewColorClasses, className)} {...rest}>
            {valueName === 'radius' &&
                <div className="absolute inset-1.5 border-l-2 border-t-2 border-muted-foreground bg-muted" style={{ borderTopLeftRadius: value }}></div>
            }
        </div>
    );
}

type ValuePreviewBoxProps = {
    value: string;
    valueName: string;
    isUndefined: boolean;
    isColor: boolean;
    isLength: boolean;
    isBackOrFore: boolean;
};


export function ValuePreviewBox({ valueName, value, isUndefined, isColor, isLength, isBackOrFore }: ValuePreviewBoxProps) {
    return (
        <div>
            {isColor && <ValuePreviewColor color={value} />}
            {isUndefined && <ValuePreviewUndefined />}
            {isLength && <ValuePreviewLength value={value} valueName={valueName} isBackOrFore={isBackOrFore} />}
        </div>
    );
}
