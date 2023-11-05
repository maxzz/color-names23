import { useRef, useState, useCallback, useEffect, HTMLAttributes, forwardRef } from 'react';
import { isTouch, preventDefaultMove, getRelativePosition, Interaction, useEventCallback } from './react-drag-event-interactive-utils';
import { mergeRefs } from '@/utils';

export type InteractiveProps = HTMLAttributes<HTMLDivElement> & {
    prefixCls?: string;
    onMove?: (interaction: Interaction, event: MouseEvent | TouchEvent) => void;
    onDown?: (offset: Interaction, event: MouseEvent | TouchEvent) => void;
};

export const Interactive = forwardRef<HTMLDivElement, InteractiveProps>((props, ref) => {
    const {
        prefixCls = 'w-color-interactive',
        className,
        onMove,
        onDown,
        ...rest
    } = props;

    const container = useRef<HTMLDivElement>(null);
    const hasTouched = useRef(false);
    const [isDragging, setDragging] = useState(false);

    const onMoveCallback = useEventCallback<Interaction, MouseEvent | TouchEvent>(onMove);
    const onKeyCallback = useEventCallback<Interaction, MouseEvent | TouchEvent>(onDown);

    const isValid = (event: MouseEvent | TouchEvent): boolean => {
        // Prevent mobile browsers from handling mouse events (conflicting with touch ones).
        // If we detected a touch interaction before, we prefer reacting to touch events only.
        if (hasTouched.current && !isTouch(event)) {
            return false;
        }
        hasTouched.current = isTouch(event);
        return true;
    };

    const handleMove = useCallback(
        (event: MouseEvent | TouchEvent) => {
            preventDefaultMove(event);

            // If user moves the pointer outside of the window or iframe bounds and release it there,
            // `mouseup`/`touchend` won't be fired. In order to stop the picker from following the cursor
            // after the user has moved the mouse/finger back to the document, we check `event.buttons`
            // and `event.touches`. It allows us to detect that the user is just moving his pointer
            // without pressing it down.

            const isDown = isTouch(event) ? event.touches.length > 0 : event.buttons > 0;
            if (isDown && container.current) {
                onMoveCallback?.(getRelativePosition(container.current!, event), event);
            } else {
                setDragging(false);
            }
        }, [onMoveCallback],
    );

    const handleMoveEnd = useCallback(
        () => setDragging(false), []
    );

    const toggleDocumentEvents = useCallback(
        (state: boolean) => {
            const fn = state ? window.addEventListener : window.removeEventListener;
            fn(hasTouched.current ? 'touchmove' : 'mousemove', handleMove);
            fn(hasTouched.current ? 'touchend' : 'mouseup', handleMoveEnd);
        }, []
    );

    useEffect(
        () => {
            toggleDocumentEvents(isDragging);
            return () => {
                isDragging && toggleDocumentEvents(false);
            };
        }, [isDragging, toggleDocumentEvents]
    );

    const handleMoveStart = useCallback(
        (event: React.MouseEvent | React.TouchEvent) => {
            preventDefaultMove(event.nativeEvent);
            if (!isValid(event.nativeEvent)) return;
            onKeyCallback && onKeyCallback(getRelativePosition(container.current!, event.nativeEvent), event.nativeEvent);
            setDragging(true);
        }, [onKeyCallback],
    );

    return (
        <div
            ref={mergeRefs([container, ref])}
            className={[prefixCls, className || ''].filter(Boolean).join(' ')}
            style={{ ...rest.style, touchAction: 'none' }}
            tabIndex={0}
            onMouseDown={handleMoveStart}
            onTouchStart={handleMoveStart}
            {...rest}
        />
    );
});

Interactive.displayName = 'Interactive';
