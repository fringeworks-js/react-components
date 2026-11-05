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
});
