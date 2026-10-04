import type { FrgInlineProps } from '../../base/FrgInline';
import type { FrgWebFontBoundaryProps } from '../../boundaries/FrgWebFontBoundary';

export type FrgTextProps = Omit<FrgWebFontBoundaryProps, 'children'> &
  Omit<FrgInlineProps, 'children'> & {
    /**
     * 値
     */
    value?: string;
  };
