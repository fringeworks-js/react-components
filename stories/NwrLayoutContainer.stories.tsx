/** @jsxImportSource @emotion/react */
import {
  AlignHorizontal,
  AlignVertical,
  LayoutAdjust,
  LayoutType,
  Orientation,
} from '@niche-works/react-layout';
import type {
  AdjustProps,
  AlignProps,
  ChildSizeProps,
  OrientationProps,
  SpacingProps,
} from '@niche-works/react-layout/layouts';
import type { StyleProps } from '@niche-works/react-style-props';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
import type { ResizableProps } from 're-resizable';
import { Resizable } from 're-resizable';
import type { NwrLayoutContainerProps } from '../src/containers/NwrLayoutContainer';
import NwrLayoutContainer from '../src/containers/NwrLayoutContainer';
import _createContainerDecorator from './_createContainerDecorator';

const LAYOUT_OPTIONS = Object.values(LayoutType);

const ORIENTATION_OPTIONS = Object.values(Orientation);

const ALAGN_HORIZONTAL_OPTIONS = Object.values(AlignHorizontal);

const ALAGN_VERTICAL_OPTIONS = Object.values(AlignVertical);

const LAYOUT_ADJUST_OPTIONS = Object.values(LayoutAdjust);

const LAYOUT_ARG_TYPES: ArgTypes = {
  layout: {
    control: { type: 'select' },
    options: LAYOUT_OPTIONS,
  },
  scroll: { type: 'boolean' },
};

const ORIENTATION_ARG_TYPES: ArgTypes = {
  orientation: {
    control: { type: 'select' },
    options: ORIENTATION_OPTIONS,
  },
};

const ALIGN_ARG_TYPES: ArgTypes = {
  alignHorizontal: {
    control: { type: 'select' },
    options: ALAGN_HORIZONTAL_OPTIONS,
  },
  alignVertical: {
    control: { type: 'select' },
    options: ALAGN_VERTICAL_OPTIONS,
  },
};

const ADJUST_ARG_TYPES: ArgTypes = {
  adjustHorizontal: {
    control: { type: 'select' },
    options: LAYOUT_ADJUST_OPTIONS,
  },
  adjustVertical: {
    control: { type: 'select' },
    options: LAYOUT_ADJUST_OPTIONS,
  },
};

const CHILD_SIZE_ARG_TYPES: ArgTypes = {
  sizeHorizontal: {
    type: 'string',
  },
  sizeVertical: {
    type: 'string',
  },
};

const SPACING_ARG_TYPES: ArgTypes = {
  spacingAll: {
    type: 'string',
  },
  spacingHorizontal: {
    type: 'string',
  },
  spacingVertical: {
    type: 'string',
  },
};

const CHILD_COUNT_ARG_TYPES: ArgTypes = {
  countHorizontal: {
    type: 'string',
  },
  countVertical: {
    type: 'string',
  },
};

const GRID_TEMPLATE_ARG_TYPES: ArgTypes = {
  templateHorizontal: {
    type: 'string',
  },
  templateVertical: {
    type: 'string',
  },
};

const ARG_TYPES = {
  all: {
    ...LAYOUT_ARG_TYPES,
    ...ORIENTATION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...GRID_TEMPLATE_ARG_TYPES,
  },
  nosize: {
    ...LAYOUT_ARG_TYPES,
    ...ORIENTATION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...GRID_TEMPLATE_ARG_TYPES,
  },
  balance: {
    ...ORIENTATION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
  },
  matrix: {
    ...ORIENTATION_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...GRID_TEMPLATE_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
  },
  pack: {
    ...ORIENTATION_ARG_TYPES,
    ...SPACING_ARG_TYPES,
  },
  pin: {
    ...CHILD_SIZE_ARG_TYPES,
  },
  stack: {
    ...ORIENTATION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
  },
  tile: {
    ...ORIENTATION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
  },
};

const LAYOUT_PROPS = {
  scroll: true,
  childStyle: undefined,
};

const ORIENTATION_PROPS: OrientationProps = {
  orientation: 'horizontal',
};

const ALIGN_PROPS: AlignProps = {
  alignHorizontal: 'left',
  alignVertical: 'top',
};

const CHILD_SIZE_PROPS: ChildSizeProps = {
  sizeHorizontal: '160',
  sizeVertical: '80',
};

const ADJUST_PROPS: AdjustProps = {
  adjustHorizontal: 'none',
  adjustVertical: 'none',
};

const SPACING_PROPS: SpacingProps = {
  spacingAll: '8',
  spacingHorizontal: undefined,
  spacingVertical: undefined,
};

const CHILD_COUNT_PROPS: any = {
  countHorizontal: '4',
  countVertical: '3',
};

const GRID_TEMPLATE_PROPS = {
  templateHorizontal: undefined,
  templateVertical: undefined,
};

const CONTAINER_PROPS: StyleProps = {
  xPadding: '0',
};

const CONTAINER_PARAMS: any = {
  defaultSize: {
    width: 400,
    height: 400,
  },
};

const ARGS: Record<string, Record<string, any>> = {
  all: {
    ...LAYOUT_PROPS,
    ...ORIENTATION_PROPS,
    ...ALIGN_PROPS,
    ...ADJUST_PROPS,
    ...CHILD_SIZE_PROPS,
    ...GRID_TEMPLATE_PROPS,
    ...SPACING_PROPS,
    ...CHILD_COUNT_PROPS,
    ...CONTAINER_PROPS,
  },
  nosize: {
    ...LAYOUT_PROPS,
    ...ORIENTATION_PROPS,
    ...ALIGN_PROPS,
    ...ADJUST_PROPS,
    ...GRID_TEMPLATE_PROPS,
    ...SPACING_PROPS,
    ...CHILD_COUNT_PROPS,
    ...CONTAINER_PROPS,
  },
  balance: {
    ...ORIENTATION_PROPS,
    ...ALIGN_PROPS,
    ...ADJUST_PROPS,
    ...CHILD_SIZE_PROPS,
    ...SPACING_PROPS,
    ...CONTAINER_PROPS,
  },
  matrix: {
    ...ORIENTATION_PROPS,
    ...CHILD_SIZE_PROPS,
    ...CHILD_COUNT_PROPS,
    ...GRID_TEMPLATE_PROPS,
    ...SPACING_PROPS,
    ...CONTAINER_PROPS,
  },
  pin: {
    ...CHILD_SIZE_PROPS,
    ...CONTAINER_PROPS,
  },
  pack: {
    ...ORIENTATION_PROPS,
    ...SPACING_PROPS,
    ...CONTAINER_PROPS,
  },
  stack: {
    ...ORIENTATION_PROPS,
    ...ALIGN_PROPS,
    ...ADJUST_PROPS,
    ...SPACING_PROPS,
    ...CHILD_SIZE_PROPS,
    ...CONTAINER_PROPS,
  },
  tile: {
    ...ORIENTATION_PROPS,
    ...ALIGN_PROPS,
    ...ADJUST_PROPS,
    ...CHILD_SIZE_PROPS,
    ...SPACING_PROPS,
    ...CONTAINER_PROPS,
  },
};

const ENABLED_ARGS: Record<string, Record<string, any>> = {};
for (const layout in ARGS) {
  ENABLED_ARGS[layout] = {};
  for (const arg in ARGS[layout]) {
    ENABLED_ARGS[layout][arg] = true;
  }
}

var RESIZABLE_PROPS = [
  'as',
  'ref',
  'style',
  'className',
  'grid',
  'gridGap',
  'snap',
  'bounds',
  'boundsByDirection',
  'size',
  'defaultSize',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'lockAspectRatio',
  'lockAspectRatioExtraWidth',
  'lockAspectRatioExtraHeight',
  'enable',
  'handleStyles',
  'handleClasses',
  'handleWrapperStyle',
  'handleWrapperClass',
  'onResizeStart',
  'onResize',
  'onResizeStop',
  'handleComponent',
  'scale',
  'resizeRatio',
  'snapGap',
];

const CzResizableLayoutContainer = (
  props: NwrLayoutContainerProps & ResizableProps & { childCount: number },
) => {
  const { children, ...rest } = props;
  const resizableProps: ResizableProps = {};
  const containerProps: NwrLayoutContainerProps = {};
  for (const prop in rest) {
    if (RESIZABLE_PROPS.includes(prop)) {
      // @ts-ignore
      resizableProps[prop] = rest[prop];
    } else {
      // @ts-ignore
      containerProps[prop] = rest[prop];
    }
  }

  return (
    <Resizable {...resizableProps}>
      <NwrLayoutContainer
        {...containerProps}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </NwrLayoutContainer>
    </Resizable>
  );
};

const meta = {
  title: 'NwrLayoutContainer',
  component: CzResizableLayoutContainer,
  tags: ['layout'],
  decorators: _createContainerDecorator({
    defaultProps: {
      style: { backgroundColor: 'rgba(128, 128, 128, 0.1)' },
    },
    ENABLED_ARGS,
  }),
} satisfies Meta<typeof CzResizableLayoutContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: ARG_TYPES.all,
  args: {
    layout: 'stack',
    ...ARGS.all,
    childCount: 12,
  },
  parameters: {
    randSize: true,
    ...CONTAINER_PARAMS,
  },
};

export const NoSize: Story = {
  argTypes: ARG_TYPES.nosize,
  args: {
    layout: 'stack',
    ...ARGS.nosize,
    childCount: 12,
  },
  parameters: {
    randSize: true,
    randPos: true,
    ...CONTAINER_PARAMS,
  },
};

export const Balance: Story = {
  argTypes: ARG_TYPES.balance,
  args: {
    ...ARGS.balance,
    childCount: 12,
  },
  parameters: {
    defaultLayout: 'balance',
    ...CONTAINER_PARAMS,
  },
};

export const Pack: Story = {
  argTypes: ARG_TYPES.pack,
  args: {
    ...ARGS.pack,
    childCount: 12,
  },
  parameters: {
    defaultLayout: 'pack',
    ...CONTAINER_PARAMS,
  },
};

export const Matrix: Story = {
  argTypes: ARG_TYPES.matrix,
  args: {
    ...ARGS.matrix,
    childCount: 12,
  },
  parameters: {
    defaultLayout: 'matrix',
    ...CONTAINER_PARAMS,
  },
};

export const Pin: Story = {
  argTypes: ARG_TYPES.pin,
  args: {
    ...ARGS.pin,
    childCount: 12,
  },
  parameters: {
    defaultLayout: 'pin',
    ...CONTAINER_PARAMS,
  },
};

export const Stack: Story = {
  argTypes: ARG_TYPES.stack,
  args: {
    ...ARGS.stack,
    childCount: 12,
  },
  parameters: {
    defaultLayout: 'stack',
    ...CONTAINER_PARAMS,
  },
};

export const Tile: Story = {
  argTypes: ARG_TYPES.tile,
  args: {
    ...ARGS.tile,
    childCount: 12,
  },
  parameters: {
    defaultLayout: 'tile',
    ...CONTAINER_PARAMS,
  },
};
