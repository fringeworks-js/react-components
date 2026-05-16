import type { LooseDictionary } from '@niche-works/types';
import { unsafeCast } from '@niche-works/utils';
import type { ResizableProps } from 're-resizable/lib';
import { Resizable } from 're-resizable/lib';
import type { ComponentType, ForwardedRef } from 'react';
import { forwardRef } from 'react';

export type WithResizableProps<P extends object = LooseDictionary> =
  ResizableProps & Omit<P, keyof ResizableProps>;

type NwrResizableProps<
  P extends object = LooseDictionary,
  T extends Element = Element,
> = P & {
  domRef?: ForwardedRef<T>;
};

export default function withResizable<
  P extends object = LooseDictionary,
  T extends Element = Element,
>(Component: ComponentType<P>) {
  const NwrResizable = (props: NwrResizableProps<P, T>) => {
    const { domRef, ...rest } = props;
    return <Component ref={domRef} {...unsafeCast(rest)} />;
  };

  return forwardRef<T, WithResizableProps<P>>((props, ref) => {
    const resizableProps: ResizableProps = unsafeCast({
      domRef: ref,
      ...props,
    });

    return <Resizable as={NwrResizable} {...resizableProps} />;
  });
}
