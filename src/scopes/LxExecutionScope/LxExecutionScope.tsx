import ExecutionScope from '@fringeworks/react-execution-controller/ExecutionScope';
import type { FC } from 'react';
import type { LxExecutionScopeProps } from './types';

/**
 * 子孫のコンポーネントで実行コントローラーを共有するコンポーネント
 * @param props
 * @returns
 */
const LxExecutionScope: FC<LxExecutionScopeProps> = (
  props: LxExecutionScopeProps,
) => {
  return <ExecutionScope {...props} />;
};
LxExecutionScope.displayName = 'LxExecutionScope';
export default LxExecutionScope;
