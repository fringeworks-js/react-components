import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Collapsible from './Collapsible';

describe('Collapsible', () => {
  it('details と summary にクラスを付け、利用者の className を重ねる', () => {
    render(
      <Collapsible
        summary="見出し"
        className="mine"
        partsProps={{ summary: { className: 'head' } }}
      />,
    );

    const summary = screen.getByText('見出し');
    expect(summary.classList).toContain('frg-collapsible-summary');
    expect(summary.classList).toContain('head');
    expect(summary.parentElement?.classList).toContain('frg-collapsible');
    expect(summary.parentElement?.classList).toContain('mine');
  });

  it('見出しを押すと開閉を通知する', () => {
    const onOpenChange = vi.fn();
    render(<Collapsible summary="見出し" onOpenChange={onOpenChange} />);

    fireEvent.click(screen.getByText('見出し'));

    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
  });
});
