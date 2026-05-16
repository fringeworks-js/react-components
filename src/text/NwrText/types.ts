import type { NwrInlineProps } from '../../base/NwrInline';
import type { NwrFontBoundaryProps } from '../../boundaries/NwrFontBoundary';

export type NwrTextProps = Omit<NwrFontBoundaryProps, 'children'> &
  Omit<NwrInlineProps, 'children'> & {
    /**
     * 値
     */
    value?: string;
  };
