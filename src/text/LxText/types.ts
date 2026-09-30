import type { LxInlineProps } from '../../base/LxInline';
import type { LxWebFontBoundaryProps } from '../../boundaries/LxWebFontBoundary';

export type LxTextProps = Omit<LxWebFontBoundaryProps, 'children'> &
  Omit<LxInlineProps, 'children'> & {
    /**
     * 値
     */
    value?: string;
  };
