import { Fragment, HTMLAttributes, SVGAttributes } from "react";
import { Input } from "@/components/ui/shadcn";
import { classNames } from "@/utils";
import { useSnapshot } from "valtio";
import { shadcnPalette } from "@/store/4-shadcn";
import { CssVarNameValue, ForeAndBack } from "@/store/4-shadcn/types";
import { IconNoColor } from "@/components/ui/icons";

const previewColorClasses = "flex-none aspect-square w-9 h-9 ring-border ring-2 ring-offset-1 rounded overflow-hidden";
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

function ValuePreviewLength({ className, isBackOrFore, ...rest }: { isBackOrFore?: boolean; } & HTMLAttributes<HTMLDivElement>) {
    // like radius
    if (!isBackOrFore) {
        return <div className=""></div>;
    }
    return (
        <div className={classNames("relative", previewColorClasses, className)} {...rest}>
            <div className="absolute inset-1.5 border-l-2 border-t-2 border-muted-foreground bg-muted" style={{ '--radius-value': '.5rem' }}></div>
        </div>
    );
}

function ValuePreviewBox({ color, both, isBackOrFore }: { color?: CssVarNameValue; both: ForeAndBack; isBackOrFore?: boolean; }) {
    const isUndefined = !color?.value && !isBackOrFore && (both.background?.isHsl || both.foreground?.isHsl);
    const isColor = color?.value && color?.isHsl;
    const isLength = color?.value && !color?.isHsl && isBackOrFore;
    return (
        <div>
            {isColor && <ValuePreviewColor color={color.value} />}
            {isUndefined && <ValuePreviewUndefined />}
            {isLength && <ValuePreviewLength isBackOrFore={isBackOrFore} />}
        </div>
    );
}

function ValueInputAndBox({ color, both, isBackOrFore }: { color?: CssVarNameValue; both: ForeAndBack; isBackOrFore?: boolean; }) {
    const isEmpty = !color?.value;
    return (<>
        {isBackOrFore
            ? (
                <div className="flex items-center space-x-2">
                    {!isEmpty && <Input value={color.value} onChange={(e) => { }} />}
                    <ValuePreviewBox color={color} both={both} isBackOrFore={isBackOrFore} />
                </div>
            ) : (
                <div className="ml-2 flex items-center space-x-2">
                    <ValuePreviewBox color={color} both={both} isBackOrFore={isBackOrFore} />
                    {!isEmpty && <Input value={color.value} onChange={(e) => { }} />}
                </div>
            )
        }
    </>);
}

function SingleColor({ foreAndBack }: { foreAndBack: ForeAndBack; }) {
    const notHsl = !foreAndBack.background?.isHsl && !foreAndBack.foreground?.isHsl;
    //TODO: add preview foregraound over background
    return (<>
        <div className="mr-4 text-sm text-foreground/70 dark:text-foreground/50 flex items-center">
            {foreAndBack.background?.name || foreAndBack.foreground?.name}
        </div>

        <ValueInputAndBox color={foreAndBack.background} both={foreAndBack} isBackOrFore={true} />
        <ValueInputAndBox color={foreAndBack.foreground} both={foreAndBack} />
    </>);
}

function Header() {
    return (<>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b">Name</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b text-right">Background</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b ml-2">Foreground</div>
    </>);
}

function Header2() {
    return (<>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b mt-4"></div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b mt-4 text-right">Length values</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b mt-4 ml-2"></div>
    </>);
}

export function Section4_Chadcn({ className }: HTMLAttributes<HTMLUListElement>) {
    const snap = useSnapshot(shadcnPalette);
    const items = snap.vars.vars;
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)}>
            <div className="container mx-auto max-w-xl grid grid-cols-[auto,1fr,1fr] gap-y-2">
                <Header />
                {items.map((foreAndBack, idx) => (
                    <Fragment key={`${idx}`}>
                        {(foreAndBack.background?.isHsl || foreAndBack.foreground?.isHsl) && <SingleColor foreAndBack={foreAndBack} />}
                    </Fragment>
                ))}

                <Header2 />
                {items.map((foreAndBack, idx) => (
                    <Fragment key={`${idx}-length`}>
                        {(!foreAndBack.background?.isHsl && !foreAndBack.foreground?.isHsl) && <SingleColor foreAndBack={foreAndBack} />}
                    </Fragment>
                ))}

            </div>
        </div>
    );
}
