/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
import {
  Adjust,
  AlignX,
  AlignY,
  Direction,
  LayoutType,
} from '@niche-works/react-layout';
import type { StyleProps } from '@niche-works/react-style-props';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
import type { ResizableProps } from 're-resizable';
import { Resizable } from 're-resizable';
import type { NwrLayoutContainerProps } from '../src/containers/NwrLayoutContainer';
import NwrLayoutContainer from '../src/containers/NwrLayoutContainer';
import _createContainerDecorator from './_createContainerDecorator';

const LAYOUT_OPTIONS = Object.values(LayoutType);

const ORIENTATION_OPTIONS = Object.values(Direction);

const ALAGN_HORIZONTAL_OPTIONS = Object.values(AlignX);

const ALAGN_VERTICAL_OPTIONS = Object.values(AlignY);

const LAYOUT_ADJUST_OPTIONS = Object.values(Adjust);

const LAYOUT_ARG_TYPES: ArgTypes = {
  layout: {
    control: { type: 'select' },
    options: LAYOUT_OPTIONS,
  },
  scroll: { type: 'boolean' },
};

const ORIENTATION_ARG_TYPES: ArgTypes = {
  direction: {
    control: { type: 'select' },
    options: ORIENTATION_OPTIONS,
  },
};

const ALIGN_ARG_TYPES: ArgTypes = {
  alignX: {
    control: { type: 'select' },
    options: ALAGN_HORIZONTAL_OPTIONS,
  },
  alignY: {
    control: { type: 'select' },
    options: ALAGN_VERTICAL_OPTIONS,
  },
};

const ADJUST_ARG_TYPES: ArgTypes = {
  adjustX: {
    control: { type: 'select' },
    options: LAYOUT_ADJUST_OPTIONS,
  },
  adjustY: {
    control: { type: 'select' },
    options: LAYOUT_ADJUST_OPTIONS,
  },
};

const CHILD_SIZE_ARG_TYPES: ArgTypes = {
  itemSizeX: {
    type: 'string',
  },
  itemSizeY: {
    type: 'string',
  },
};

const SPACING_ARG_TYPES: ArgTypes = {
  spacing: {
    type: 'string',
  },
  spacingX: {
    type: 'string',
  },
  spacingY: {
    type: 'string',
  },
};

const CHILD_COUNT_ARG_TYPES: ArgTypes = {
  itemCountX: {
    type: 'string',
  },
  itemCountY: {
    type: 'string',
  },
};

const GRID_TEMPLATE_ARG_TYPES: ArgTypes = {
  templateX: {
    type: 'string',
  },
  templateY: {
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

const ORIENTATION_PROPS = {
  direction: 'x',
};

const ALIGN_PROPS = {
  alignX: 'left',
  alignY: 'top',
};

const ITEM_SIZE_PROPS = {
  itemSizeX: 160,
  itemSizeY: 80,
};

const ADJUST_PROPS = {
  adjustX: 'none',
  adjustY: 'none',
};

const GAP_PROPS = {
  gap: 8,
  gapX: undefined,
  gapY: undefined,
};

const ITEM_COUNT_PROPS = {
  itemCountX: 4,
  itemCountY: 3,
};

const TRACKS_PROPS = {
  tracksX: undefined,
  tracksY: undefined,
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
    ...ITEM_SIZE_PROPS,
    ...TRACKS_PROPS,
    ...GAP_PROPS,
    ...ITEM_COUNT_PROPS,
    ...CONTAINER_PROPS,
  },
  nosize: {
    ...LAYOUT_PROPS,
    ...ORIENTATION_PROPS,
    ...ALIGN_PROPS,
    ...ADJUST_PROPS,
    ...TRACKS_PROPS,
    ...GAP_PROPS,
    ...ITEM_COUNT_PROPS,
    ...CONTAINER_PROPS,
  },
  balance: {
    ...ORIENTATION_PROPS,
    ...ALIGN_PROPS,
    ...ADJUST_PROPS,
    ...ITEM_SIZE_PROPS,
    ...GAP_PROPS,
    ...CONTAINER_PROPS,
  },
  matrix: {
    ...ORIENTATION_PROPS,
    ...ITEM_SIZE_PROPS,
    ...ITEM_COUNT_PROPS,
    ...TRACKS_PROPS,
    ...GAP_PROPS,
    ...CONTAINER_PROPS,
  },
  pin: {
    ...ITEM_SIZE_PROPS,
    ...CONTAINER_PROPS,
  },
  pack: {
    ...ORIENTATION_PROPS,
    ...GAP_PROPS,
    ...CONTAINER_PROPS,
  },
  stack: {
    ...ORIENTATION_PROPS,
    ...ALIGN_PROPS,
    ...ADJUST_PROPS,
    ...GAP_PROPS,
    ...ITEM_SIZE_PROPS,
    ...CONTAINER_PROPS,
  },
  tile: {
    ...ORIENTATION_PROPS,
    ...ALIGN_PROPS,
    ...ADJUST_PROPS,
    ...ITEM_SIZE_PROPS,
    ...GAP_PROPS,
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

const RESIZABLE_PROPS = [
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
  props: NwrLayoutContainerProps & ResizableProps & { itemCount: number },
) => {
  const { children, ...rest } = props;
  const resizableProps: ResizableProps = {};
  const containerProps = {} as NwrLayoutContainerProps;
  for (const prop in rest) {
    if (RESIZABLE_PROPS.includes(prop)) {
      (resizableProps as any)[prop] = (rest as any)[prop];
    } else {
      (containerProps as any)[prop] = (rest as any)[prop];
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
    itemCount: 12,
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
    itemCount: 12,
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
    layout: 'balance',
    ...ARGS.balance,
    itemCount: 12,
  },
  parameters: {
    ...CONTAINER_PARAMS,
  },
};

export const Pack: Story = {
  argTypes: ARG_TYPES.pack,
  args: {
    layout: 'pack',
    ...ARGS.pack,
    itemCount: 12,
  },
  parameters: {
    ...CONTAINER_PARAMS,
  },
};

export const Matrix: Story = {
  argTypes: ARG_TYPES.matrix,
  args: {
    layout: 'matrix',
    ...ARGS.matrix,
    itemCount: 12,
  } as any,
  parameters: {
    ...CONTAINER_PARAMS,
  },
};

export const Pin: Story = {
  argTypes: ARG_TYPES.pin,
  args: {
    layout: 'pin',
    ...ARGS.pin,
    itemCount: 12,
  },
  parameters: {
    ...CONTAINER_PARAMS,
  },
};

export const Stack: Story = {
  argTypes: ARG_TYPES.stack,
  args: {
    layout: 'stack',
    ...ARGS.stack,
    itemCount: 12,
  },
  parameters: {
    ...CONTAINER_PARAMS,
  },
};

export const Tile: Story = {
  argTypes: ARG_TYPES.tile,
  args: {
    layout: 'tile',
    ...ARGS.tile,
    itemCount: 12,
  },
  parameters: {
    ...CONTAINER_PARAMS,
  },
};
