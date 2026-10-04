import type { ExecutionScopeProps } from '@niche-works/react-execution-controller/ExecutionScope';

/**
 * プロパティ
 */
export type LxExecutionScopeProps = ExecutionScopeProps;

/**
 * 固有のプロパティ
 */
export type LxExecutionScopeOwnProps = Omit<ExecutionScopeProps, 'children'>;
