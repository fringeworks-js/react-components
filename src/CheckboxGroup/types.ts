import type { CheckboxGroupProps as CheckboxGroupPrimitiveProps } from '@fringeworks/react-primitives';
import type { ReactElement } from 'react';
import type { GroupLayoutProps } from '../_internal/_groupLayout';
import type CheckboxIndicator from '../Checkbox/_CheckboxIndicator';
import type {
  CheckboxComponent,
  CheckboxIndicatorComponent,
} from '../Checkbox/types';

/**
 * CheckboxGroup のプロパティ
 *
 * @template V 値の型
 * @template I チェックボックスに組み込んだ印（`withCheckboxGroupIndicator` で作ったものは、渡した印）
 */
export type CheckboxGroupProps<
  V,
  I extends CheckboxIndicatorComponent = typeof CheckboxIndicator,
> = CheckboxGroupPrimitiveProps<V, { Checkbox: CheckboxComponent<I> }> &
  GroupLayoutProps;

/**
 * 見た目を付けたチェックボックスグループ（`CheckboxGroup`、`withCheckboxGroupIndicator` で作ったもの）
 *
 * @template I チェックボックスに組み込んだ印
 */
export type CheckboxGroupComponent<
  I extends CheckboxIndicatorComponent = typeof CheckboxIndicator,
> = {
  <V>(props: CheckboxGroupProps<V, I>): ReactElement;

  displayName?: string;
};
