import type { LooseDictionary } from '@fringeworks/types';
import { unsafeCast } from '@fringeworks/utils';
import type { ResizableProps } from 're-resizable/lib';
import { Resizable } from 're-resizable/lib';
import type {
  ComponentProps,
  ComponentPropsWithRef,
  ComponentRef,
  ComponentType,
  ElementType,
  ForwardedRef,
} from 'react';
import { forwardRef } from 'react';

export type WithResizableProps<P extends object = LooseDictionary> =
  ResizableProps & Omit<P, keyof ResizableProps>;

type FrgResizableProps<C extends ElementType> = ComponentProps<C> & {
  domRef?: ForwardedRef<ComponentRef<C>>;
};

/**
 * コンポーネントにリサイズ機能を付与します
 * @param Component
 * @returns
 */
export default function withResizable<C extends ElementType>(
  Component: C,
): ComponentType<ComponentPropsWithRef<C>> {
  const FrgResizable = (props: FrgResizableProps<C>) => {
    const { domRef, ...rest } = props;
    return <Component ref={domRef} {...unsafeCast(rest)} />;
  };

  return forwardRef<ComponentRef<C>, ComponentProps<C>>((props, ref) => {
    const resizableProps: ResizableProps = unsafeCast({
      domRef: ref,
      ...props,
    });

    return <Resizable as={FrgResizable} {...resizableProps} />;
  });
}
