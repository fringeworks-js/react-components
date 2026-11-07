import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Switch from './Switch';

describe('Switch', () => {
  it('label と input に frg- のクラスを付け、role="switch" で描く', () => {
    render(<Switch className="extra">通知</Switch>);

    const input = screen.getByRole('switch', { name: '通知' });
    expect(input.className).toBe('frg-switch-input');
    expect(input.parentElement?.className).toBe('frg-switch extra');
  });

  it('disabled・invalid のとき、label に状態の属性を付ける', () => {
    render(<Switch disabled invalid />);
    const label = screen.getByRole('switch').parentElement!;

    expect(label.hasAttribute('data-disabled')).toBe(true);
    expect(label.hasAttribute('data-invalid')).toBe(true);
  });

  it('値と操作は react-primitives のまま', () => {
    const onValueChange = vi.fn();
    render(<Switch defaultValue onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(false);
  });

  it('<input> の直後に溝を描き、中につまみを置く。オンにすると data-checked を付ける', () => {
    render(<Switch />);
    const indicator = screen.getByRole('switch').nextElementSibling!;
    expect(indicator.className).toBe('frg-switch-indicator');
    expect(indicator.firstElementChild?.className).toBe('frg-switch-thumb');
    fireEvent.click(screen.getByRole('switch'));
    expect(
      screen
        .getByRole('switch')
        .nextElementSibling!.hasAttribute('data-checked'),
    ).toBe(true);
  });

  it('design の値を、<label> の CSS 変数にする（つまみは thumb）', () => {
    render(
      <Switch
        design={{ indicator: { width: 40 }, thumb: { backgroundColor: 'red' } }}
      />,
    );
    const label = screen.getByRole('switch').parentElement!;
    expect(label.style.getPropertyValue('--frg-switch-indicator-width')).toBe(
      '40px',
    );
    expect(
      label.style.getPropertyValue(
        '--frg-switch-thumb-backgroundColor-checked',
      ),
    ).toBe('red');
  });
});
