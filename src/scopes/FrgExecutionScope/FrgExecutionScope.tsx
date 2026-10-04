import ExecutionScope from '@fringeworks/react-execution-controller/ExecutionScope';
import type { FC } from 'react';
import type { FrgExecutionScopeProps } from './types';

/**
 * 子孫のコンポーネントで実行コントローラーを共有するコンポーネント
 * @param props
 * @returns
 */
const FrgExecutionScope: FC<FrgExecutionScopeProps> = (
  props: FrgExecutionScopeProps,
) => {
  return <ExecutionScope {...props} />;
};
FrgExecutionScope.displayName = 'FrgExecutionScope';
export default FrgExecutionScope;
