import { cloneElement, HTMLAttributes, ReactNode, useState } from "react";
import { MountedTransition } from "./mounted-transition";
import { TransitionMessageCopied } from "./transition-message-copied";
import { ValueViewIcon } from "./label-w-copy-button";

type ValueWithCopyProps = {
    valueToCopy: string;
    children?: JSX.Element;
    copyNotice?: ReactNode;
};

export function ButtonCopyColor({ valueToCopy, children, copyNotice }: ValueWithCopyProps & HTMLAttributes<HTMLDivElement>) {
    const [isHovered, setIsHovered] = useState(false);
    const [showNotice, setShowNotice] = useState(false);
    return (
        <div
            className="flex items-center space-x-2 select-none"
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
            onClick={async () => { await navigator.clipboard.writeText(valueToCopy); setShowNotice(true); }}
        >
            {/* <TransitionMessageCopied /> */}

            {children
                ? cloneElement(children, { valueToCopy, isHovered })
                : <ValueViewIcon valueToCopy={valueToCopy} isHovered={isHovered} />
            }

            <MountedTransition show={showNotice} setShow={setShowNotice} >
                {copyNotice ? copyNotice : <TransitionMessageCopied />}
            </MountedTransition>
        </div>
    );
}
