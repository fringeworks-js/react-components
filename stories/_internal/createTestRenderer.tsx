import type { CSSProperties } from 'react';
import createTestModel from '../_shared/createTestModel';
import type { LayoutName, TestStoryArgs } from '../_shared/types';
import LAYOUTS from './layouts';

export default function createTestRenderer(name: LayoutName) {
  const Component = LAYOUTS[name];
  return (args: TestStoryArgs) => {
    const { options, containerStyle, items } = createTestModel(args);
    return (
      <Component {...options} style={containerStyle as CSSProperties}>
        {items.map(({ label, style }) => (
          <div key={label} style={style as CSSProperties}>
            {label}
          </div>
        ))}
      </Component>
    );
  };
}
