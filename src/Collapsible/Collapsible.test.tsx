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

  it('見出しの前に開閉の印を描き、開くと data-open を付ける', () => {
    render(<Collapsible summary="見出し">中身</Collapsible>);
    const summary = screen.getByText('見出し');
    const indicator = summary.firstElementChild!;
    expect(indicator.className).toBe('frg-collapsible-indicator');
    expect(indicator.hasAttribute('data-open')).toBe(false);
    fireEvent.click(summary);
    expect(
      screen.getByText('見出し').firstElementChild!.hasAttribute('data-open'),
    ).toBe(true);
  });

  it('design の値を、<details> の CSS 変数にする', () => {
    render(
      <Collapsible
        summary="見出し"
        design={{ gap: 12, indicator: { color: 'red' } }}
      />,
    );
    const details = screen.getByText('見出し').parentElement!;
    expect(details.style.getPropertyValue('--frg-collapsible-gap')).toBe(
      '12px',
    );
    expect(
      details.style.getPropertyValue('--frg-collapsible-indicator-color'),
    ).toBe('red');
  });
});
