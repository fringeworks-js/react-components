import type { LooseRecord } from '@niche-works/types';
import type { ResizableProps } from 're-resizable/lib';
import { Resizable } from 're-resizable/lib';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

export type WidthResizableProps<P extends object = LooseRecord> =
  ResizableProps & Omit<P, keyof ResizableProps>;

type NwrResizableProps<
  P extends object = LooseRecord,
  T extends Element = Element,
> = P & {
  domRef?: ForwardedRef<T>;
};

export default function withResizable<
  P extends object = LooseRecord,
  T extends Element = Element,
>(Component: any) {
  const NwrResizable = (props: NwrResizableProps<P, T>) => {
    const { domRef, ...rest } = props;
    return <Component ref={domRef} {...rest} />;
  };

  return forwardRef<T, WidthResizableProps<P>>((props, ref) => {
    const resizableProps: any = {
      domRef: ref,
      ...props,
    };

    return <Resizable as={NwrResizable} {...resizableProps} />;
  });
}
