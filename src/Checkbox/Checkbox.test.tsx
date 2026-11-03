import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('label と input に frg- のクラスを付ける', () => {
    render(<Checkbox className="extra">りんご</Checkbox>);

    const input = screen.getByLabelText('りんご');
    expect(input.className).toBe('frg-checkbox-input');
    expect(input.parentElement?.className).toBe('frg-checkbox extra');
  });

  it('disabled・invalid のとき、label に状態の属性を付ける', () => {
    const { rerender } = render(<Checkbox disabled invalid />);
    const label = screen.getByRole('checkbox').parentElement!;

    expect(label.hasAttribute('data-disabled')).toBe(true);
    expect(label.hasAttribute('data-invalid')).toBe(true);

    rerender(<Checkbox />);

    expect(label.hasAttribute('data-disabled')).toBe(false);
    expect(label.hasAttribute('data-invalid')).toBe(false);
  });

  it('partsProps.input のクラスを重ね、値と操作は react-primitives のまま', () => {
    const onValueChange = vi.fn();
    render(
      <Checkbox
        onValueChange={onValueChange}
        partsProps={{ input: { className: 'mine' } }}
      />,
    );

    const input = screen.getByRole('checkbox');
    expect(input.className).toBe('frg-checkbox-input mine');

    fireEvent.click(input);

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(true);
  });
});
