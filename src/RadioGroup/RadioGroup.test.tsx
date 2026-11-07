import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RadioGroup from './RadioGroup';

const options = [
  { value: 's', label: 'S' },
  { value: 'm', label: 'M', disabled: true },
];

describe('RadioGroup', () => {
  it('既定では縦に並べ、間隔は 8px', () => {
    render(<RadioGroup options={options} aria-label="大きさ" />);

    const group = screen.getByRole('radiogroup', { name: '大きさ' });
    expect(group.classList).toContain('frg-radiogroup');
    expect(group.classList).toContain('frgs-layout-stack');
    expect(group.style.getPropertyValue('--frgs-layout-gapY')).toBe('8px');
  });

  it("direction が 'x' なら折り返して横に並べ、間隔は 16px", () => {
    render(<RadioGroup options={options} direction="x" />);

    const group = screen.getByRole('radiogroup');
    expect(group.classList).toContain('frgs-layout-flow');
    expect(group.style.getPropertyValue('--frgs-layout-gapX')).toBe('16px');
  });

  it('利用者の className・style を重ね、同じプロパティは利用者の値を優先する', () => {
    render(
      <RadioGroup
        options={options}
        className="mine"
        style={{ '--frgs-layout-gapY': '20px' } as never}
      />,
    );

    const group = screen.getByRole('radiogroup');
    expect(group.classList).toContain('frg-radiogroup');
    expect(group.classList).toContain('mine');
    expect(group.style.getPropertyValue('--frgs-layout-gapY')).toBe('20px');
  });

  it('見た目を付けたラジオボタンで描き、状態の属性を付ける', () => {
    render(<RadioGroup options={options} invalid />);

    const [s, m] = screen.getAllByRole('radio');
    expect(s?.className).toBe('frg-radio-input');
    expect(s?.closest('label')?.className).toBe('frg-radio');
    expect(s?.closest('label')?.hasAttribute('data-invalid')).toBe(true);
    expect(s?.closest('label')?.hasAttribute('data-disabled')).toBe(false);
    expect(m?.closest('label')?.hasAttribute('data-disabled')).toBe(true);
  });

  it('押すと選んだ値を通知する', () => {
    const onValueChange = vi.fn();
    render(<RadioGroup options={options} onValueChange={onValueChange} />);

    fireEvent.click(screen.getByLabelText('S'));

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('s');
  });

  it('ラジオボタンの直後に印を描き、選ぶと data-checked を付ける', () => {
    render(<RadioGroup options={options} />);
    const [s] = screen.getAllByRole('radio');
    const indicator = s!.nextElementSibling!;
    expect(indicator.className).toBe('frg-radio-indicator');
    expect(indicator.getAttribute('aria-hidden')).toBe('true');
    fireEvent.click(s!);
    expect(
      screen
        .getAllByRole('radio')[0]!
        .nextElementSibling!.hasAttribute('data-checked'),
    ).toBe(true);
  });

  it('partsProps.radio.design を、ラジオボタンの CSS 変数にする', () => {
    render(
      <RadioGroup
        options={options}
        partsProps={{
          radio: {
            design: { indicator: { backgroundColor: { checked: 'red' } } },
          },
        }}
      />,
    );
    const label = screen.getAllByRole('radio')[0]!.closest('label')!;
    expect(
      label.style.getPropertyValue(
        '--frg-radio-indicator-backgroundColor-checked',
      ),
    ).toBe('red');
  });
});
