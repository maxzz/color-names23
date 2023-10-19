import { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { viewHueAtoms } from '@/store';
import { classNames } from '@/utils';
import { Button } from '@/components/ui/shadcn';
import { IconMovingLock } from '@/components/ui/icons';

export function LockButton({ className }: HTMLAttributes<HTMLDivElement>) {
    const [locked, setLocked] = useAtom(viewHueAtoms.lockedAtom);
    return (
        <Button
            variant={'ghost'}
            size={'sm'}
            className={classNames("px-0 h-auto rounded-none self-center overflow-hidden flex", className)}
            onClick={() => setLocked((v) => !v)}
            title="Lock/Unlock inactive colors saturation"
        >
            <IconMovingLock className="w-4 h-4" open={locked} />
        </Button>
    );
}
