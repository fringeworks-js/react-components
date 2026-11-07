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

  describe('印', () => {
    const getIndicator = () =>
      screen.getByRole('checkbox').nextElementSibling as HTMLElement;

    it('<input> の直後に印を描き、状態を属性で付ける', () => {
      render(<Checkbox invalid>りんご</Checkbox>);
      const indicator = getIndicator();
      expect(indicator.className).toBe('frg-checkbox-indicator');
      expect(indicator.getAttribute('aria-hidden')).toBe('true');
      expect(indicator.hasAttribute('data-checked')).toBe(false);
      expect(indicator.hasAttribute('data-invalid')).toBe(true);
      expect(indicator.querySelector('svg')).toBeNull();
    });

    it('チェックすると、data-checked を付けて印（✓）を描く', () => {
      render(<Checkbox />);
      fireEvent.click(screen.getByRole('checkbox'));
      const indicator = getIndicator();
      expect(indicator.hasAttribute('data-checked')).toBe(true);
      expect(indicator.querySelector('path')?.getAttribute('d')).toBe(
        'M4 8.5l2.5 2.5L12 5.5',
      );
    });

    it('不確定はチェックより優先して、横線を描く', () => {
      render(<Checkbox defaultValue indeterminate />);
      const indicator = getIndicator();
      expect(indicator.hasAttribute('data-indeterminate')).toBe(true);
      expect(indicator.querySelector('path')?.getAttribute('d')).toBe('M4 8h8');
    });

    it('partsProps.indicator のクラスを重ねる', () => {
      render(<Checkbox partsProps={{ indicator: { className: 'mark' } }} />);
      expect(getIndicator().className).toBe('frg-checkbox-indicator mark');
    });
  });

  describe('design', () => {
    it('design の値を、<label> の style に CSS 変数として設定する', () => {
      render(
        <Checkbox
          design={{
            gap: 8,
            indicator: {
              size: 20,
              backgroundColor: { checked: 'var(--brand-accent)' },
            },
          }}
        />,
      );
      const label = screen.getByRole('checkbox').parentElement!;
      expect(label.style.getPropertyValue('--frg-checkbox-gap')).toBe('8px');
      expect(
        label.style.getPropertyValue('--frg-checkbox-indicator-size'),
      ).toBe('20px');
      expect(
        label.style.getPropertyValue(
          '--frg-checkbox-indicator-backgroundColor-checked',
        ),
      ).toBe('var(--brand-accent)');
      expect(
        label.style.getPropertyValue(
          '--frg-checkbox-indicator-backgroundColor',
        ),
      ).toBe('');
    });

    it('style で同じ変数を指定したら、そちらを優先する', () => {
      render(
        <Checkbox
          design={{ gap: 8 }}
          style={{ '--frg-checkbox-gap': '2px', color: 'red' } as never}
        />,
      );
      const label = screen.getByRole('checkbox').parentElement!;
      expect(label.style.getPropertyValue('--frg-checkbox-gap')).toBe('2px');
      expect(label.style.color).toBe('red');
    });

    it('design を DOM の属性に落とさない', () => {
      render(<Checkbox design={{ gap: 8 }} />);
      const label = screen.getByRole('checkbox').parentElement!;
      expect(label.hasAttribute('design')).toBe(false);
      expect(screen.getByRole('checkbox').hasAttribute('design')).toBe(false);
    });
  });
});
