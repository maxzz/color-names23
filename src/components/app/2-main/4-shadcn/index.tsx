import { HTMLAttributes } from "react";
import { Input } from "@/components/ui/shadcn";
import { classNames } from "@/utils";
import { useSnapshot } from "valtio";
import { shadcnPalette } from "@/store/4-shadcn";
import { ForeAndBack } from "@/store/4-shadcn/types";
import { IconNoColor } from "@/components/ui/icons";

const previewColorClasses = "flex-none aspect-square w-9 h-9 ring-border ring-2 ring-offset-1 rounded overflow-hidden";
const previewNoColorClasses = `${previewColorClasses} stroke-none bg-neutral-100 fill-neutral-400`;

function ColorPreview({ color }: { color?: string; }) {
    return (<>
        {color
            ? <div className={previewColorClasses} style={{ backgroundColor: `hsl(${color})` }}></div>
            : <IconNoColor className={previewNoColorClasses} />
        }
    </>);
}

function SingleColor({ foreAndBack }: { foreAndBack: ForeAndBack; }) {
    const notHsl = !foreAndBack.background?.isHsl && !foreAndBack.foreground?.isHsl;
    return (<>
        <div className="mr-4 text-sm text-foreground/70 dark:text-foreground/50 flex items-center">
            {foreAndBack.background?.name || foreAndBack.foreground?.name}
        </div>

        {!notHsl && (<>
        {/* TODO: but we need input */}
            {foreAndBack.background
                ? (
                    <div className="flex items-center space-x-2">
                        <Input value={foreAndBack.background.value} onChange={(e) => { }} />
                        {foreAndBack.background.isHsl && <ColorPreview color={foreAndBack.background?.value} />}
                    </div>
                )
                : <ColorPreview />
            }

            {foreAndBack.foreground
                ? (
                    <div className="flex items-center space-x-2">
                        {foreAndBack.foreground.isHsl && <ColorPreview color={foreAndBack.foreground?.value} />}
                        <Input value={foreAndBack.foreground.value} onChange={(e) => { }} />
                    </div>
                )
                : <ColorPreview />
            }

        </>)}
    </>);
}

function Header() {
    return (<>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b">Name</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b text-right">Background</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b">Foreground</div>
    </>
    );
}

export function Section4_Chadcn({ className }: HTMLAttributes<HTMLUListElement>) {
    const snap = useSnapshot(shadcnPalette);
    const items = snap.vars.vars;
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)}>
            <div className="container mx-auto max-w-xl grid grid-cols-[auto,1fr,1fr] gap-x-2 gap-y-2">
                <Header />
                {items.map((foreAndBack, idx) => (
                    <SingleColor foreAndBack={foreAndBack} key={idx} />
                ))}
            </div>
        </div>
    );
}
