import { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { viewHueAtoms } from '@/store';
import { classNames } from '@/utils';
import { Button } from '@/components/ui/shadcn';
import { IconMovingLock } from '@/components/ui/icons';

export function LockButton({ className, ...rest }: HTMLAttributes<HTMLButtonElement>) {
    const [locked, setLocked] = useAtom(viewHueAtoms.lockedAtom);
    return (
        <Button
            variant={'ghost'}
            size={'sm'}
            className={classNames("px-0 h-auto rounded-none self-center overflow-hidden flex", className)}
            title="Lock/Unlock inactive colors saturation"
            onClick={() => setLocked((v) => !v)}
            {...rest}
        >
            <IconMovingLock className="w-3 h-3" closed={locked} />
        </Button>
    );
}
