'use client';

import type {ComponentProps, ComponentPropsWithRef, Dispatch, ReactNode, SetStateAction} from 'react';
import {cloneElement, isValidElement, useMemo, useRef, useState} from 'react';
import type {Placement} from '@floating-ui/react';
import {FloatingFocusManager, useMergeRefs} from '@floating-ui/react';
import {FlowbiteFloatingArrowTheme} from "flowbite-react/lib/esm/components/Floating";
import {DeepPartial} from "flowbite-react/lib/esm/types";
import {mergeDeep} from "flowbite-react/lib/esm/helpers/merge-deep";
import {useBaseFLoating, useFloatingInteractions} from "flowbite-react/lib/esm/hooks/use-floating";
import {getArrowPlacement} from "flowbite-react/lib/esm/components/Floating/helpers";

export interface FlowbitePopoverTheme {
    arrow: Omit<FlowbiteFloatingArrowTheme, 'style'>;
    base: string;
    content: string;
}

export interface PopoverProps extends Omit<ComponentProps<'div'>, 'content' | 'style'> {
    arrow?: boolean;
    content: ReactNode;
    placement?: 'auto' | Placement;
    theme?: DeepPartial<FlowbitePopoverTheme>;
    trigger?: 'hover' | 'click';
    initialOpen?: boolean;
    open?: boolean;
    onOpenChange?: Dispatch<SetStateAction<boolean>>;
}

export function Popover({
                            children,
                            content,
                            theme: customTheme = {},
                            arrow = true,
                            trigger = 'click',
                            initialOpen,
                            open: controlledOpen,
                            onOpenChange: setControlledOpen,
                            placement: theirPlacement = 'bottom',
                            ...props
                        }: PopoverProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(Boolean(initialOpen));
    const arrowRef = useRef<HTMLDivElement>(null);
    const popoverTheme: FlowbitePopoverTheme = {
        base: 'absolute z-20 inline-block w-max max-w-[100vw] bg-white outline-none border border-gray-200 rounded-lg shadow-sm dark:border-gray-600 dark:bg-gray-800',
        content: 'z-10 overflow-hidden rounded-[7px]',
        arrow: {
            base: 'absolute h-2 w-2 z-0 rotate-45 mix-blend-lighten bg-white border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:mix-blend-color',
            placement: '-4px',
        },
    };
    const theme = mergeDeep(popoverTheme, customTheme);

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = setControlledOpen ?? setUncontrolledOpen;

    const floatingProps = useBaseFLoating({
        open,
        placement: theirPlacement,
        arrowRef,
        setOpen,
    });

    const {
        floatingStyles,
        context,
        placement,
        middlewareData: {arrow: {x: arrowX, y: arrowY} = {}},
        refs,
    } = floatingProps;

    const {getFloatingProps, getReferenceProps} = useFloatingInteractions({
        context,
        role: 'dialog',
        trigger,
    });

    const childrenRef = (children as ComponentPropsWithRef<'button'>).ref;
    const ref = useMergeRefs([context.refs.setReference, childrenRef]);

    if (!isValidElement(children)) {
        throw Error('Invalid target element');
    }

    const target = useMemo(() => {
        return cloneElement(
            children,
            getReferenceProps({
                ref,
                'data-testid': 'flowbite-popover-target',
                ...children?.props,
            }),
        );
    }, [children, ref, getReferenceProps]);

    return (
        <>
            {target}
            {open && (
                <FloatingFocusManager context={context} modal>
                    <div
                        className={theme.base}
                        ref={refs.setFloating}
                        data-testid="flowbite-popover"
                        {...props}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        <div className="relative">
                            {arrow && (
                                <div
                                    className={theme.arrow.base}
                                    data-testid="flowbite-popover-arrow"
                                    ref={arrowRef}
                                    style={{
                                        top: arrowY ?? ' ',
                                        left: arrowX ?? ' ',
                                        right: ' ',
                                        bottom: ' ',
                                        [getArrowPlacement({placement})]: theme.arrow.placement,
                                    }}
                                >
                                    &nbsp;
                                </div>
                            )}
                            <div className={theme.content}>{content}</div>
                        </div>
                    </div>
                </FloatingFocusManager>
            )}
        </>
    );
}