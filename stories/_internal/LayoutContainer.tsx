/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType, CSSProperties } from 'react';
import type { ContainerModel } from '../_shared/createContainerModel';
import ResizableBox from './ResizableBox';

export type LayoutContainerProps = {
  /**
   * レイアウトを適用したコンポーネント
   */
  component: ComponentType<any>;

  /**
   * 描画内容
   */
  model: ContainerModel;
};

/**
 * 表示確認用のコンテナー
 */
export default function LayoutContainer(props: LayoutContainerProps) {
  const { component: Component, model } = props;
  const { options, resizable, containerStyle, items } = model;
  const { initialWidth, initialHeight } = resizable;

  return (
    <ResizableBox
      // argsで初期サイズが変わった場合は作り直す
      key={`${initialWidth}x${initialHeight}`}
      initialWidth={initialWidth}
      initialHeight={initialHeight}
      style={resizable.style}
    >
      <Component {...options} style={containerStyle as CSSProperties}>
        {items.map(({ label, style }) => (
          <div key={label} style={style as CSSProperties}>
            {label}
          </div>
        ))}
      </Component>
    </ResizableBox>
  );
}
