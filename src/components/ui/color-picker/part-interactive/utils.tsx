import { useRef, useEffect, useCallback, useLayoutEffect } from 'react';

/**
 * Saves incoming handler to the ref in order to avoid "useCallback hell"
 */
export function useEventCallback<T, K>(handler?: (value: T, event: K) => void): (value: T, event: K) => void {
    const callbackRef = useRef(handler);

    useEffect(() => {
        callbackRef.current = handler;
    });

    return useCallback(
        (value: T, event: K) => callbackRef.current?.(value, event), []
    );
}

/**
 * Check if an event was triggered by touch
 */
export function isTouch(event: MouseEvent | TouchEvent): event is TouchEvent {
    return 'touches' in event;
}

/**
 * Browsers introduced an intervention, making touch events passive by default.
 * This workaround removes `preventDefault` call from the touch handlers.
 * https://github.com/facebook/react/issues/19651
 */
export function preventDefaultMove(event: MouseEvent | TouchEvent): void {
    !isTouch(event) && event.preventDefault && event.preventDefault();
}

/**
 * 
 * Clamps a value between an upper and lower bound.
 * We use ternary operators because it makes the minified code
 * 2 times shorter then `Math.min(Math.max(a,b),c)`
 */
export function clamp(number: number, min = 0, max = 1): number {
    return number > max ? max : number < min ? min : number;
}

export type Interaction = {
    left: number;
    top: number;
    width: number;
    height: number;
    x: number;
    y: number;
};

/**
 * Returns a relative position of the pointer inside the node's bounding box
 */
export function getRelativePosition(node: HTMLDivElement, event: MouseEvent | TouchEvent): Interaction {
    const rect = node.getBoundingClientRect();

    // Get user's pointer position from `touches` array if it's a `TouchEvent`
    const pointer = isTouch(event) ? event.touches[0] : (event as MouseEvent);

    return {
        left: clamp((pointer.pageX - (rect.left + window.scrollX)) / rect.width),
        top: clamp((pointer.pageY - (rect.top + window.scrollY)) / rect.height),
        width: rect.width,
        height: rect.height,
        x: pointer.pageX - (rect.left + window.pageXOffset),
        y: pointer.pageY - (rect.top + window.pageYOffset),
    };
}
