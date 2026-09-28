import type { LxInlineProps } from '../../base/LxInline';
import type { LxFontBoundaryProps } from '../../boundaries/LxFontBoundary';

export type LxTextProps = Omit<LxFontBoundaryProps, 'children'> &
  Omit<LxInlineProps, 'children'> & {
    /**
     * 値
     */
    value?: string;
  };
