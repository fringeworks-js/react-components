import type { ExecutionScopeProps } from '@fringeworks/react-execution-controller/ExecutionScope';

/**
 * プロパティ
 */
export type FrgExecutionScopeProps = ExecutionScopeProps;

/**
 * 固有のプロパティ
 */
export type FrgExecutionScopeOwnProps = Omit<ExecutionScopeProps, 'children'>;
