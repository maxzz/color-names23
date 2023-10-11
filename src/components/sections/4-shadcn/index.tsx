import { HTMLAttributes } from "react";
import { Input, Label } from "@/components/ui/shadcn";
import { classNames } from "@/utils";

function SingleColor({ label, color }: { label: string; color: string; }) {
    return (
        <Label>
            <div className="pb-1 text-foreground/70 dark:text-foreground/50">
                {label}
            </div>
            <Input />
        </Label>
    );
}

function PairColors({ color1, color2 }: { color1: string; color2: string; }) {
    return (
        <div className="flex items-center justify-between">
            <SingleColor label="text" color="red" />
            <SingleColor label="background" color="red" />
        </div>
    );
}

export function Section4_Chadcn({ className }: HTMLAttributes<HTMLUListElement>) {
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-hidden flex flex-col", className)}>
            <div className="container max-w-md mx-auto flex flex-col space-y-4">
                <PairColors color1="red" color2="red" />
            </div>
        </div>
    );
}
