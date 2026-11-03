import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CheckboxGroup from './CheckboxGroup';

const options = [
  { value: 'a', label: 'りんご' },
  { value: 'b', label: 'みかん' },
];

describe('CheckboxGroup', () => {
  it('既定では縦に並べ、間隔は 8px', () => {
    render(<CheckboxGroup options={options} aria-label="果物" />);

    const group = screen.getByRole('group', { name: '果物' });
    expect(group.classList).toContain('frg-checkboxgroup');
    expect(group.classList).toContain('frgs-layout-stack');
    expect(group.classList).toContain('frgs-layout-direction-y');
    expect(group.style.getPropertyValue('--frgs-layout-gapY')).toBe('8px');
  });

  it("direction が 'x' なら折り返して横に並べ、間隔は 16px", () => {
    render(<CheckboxGroup options={options} direction="x" />);

    const group = screen.getByRole('group');
    expect(group.classList).toContain('frgs-layout-flow');
    expect(group.classList).toContain('frgs-layout-direction-x');
    expect(group.style.getPropertyValue('--frgs-layout-gapX')).toBe('16px');
  });

  it('gap を指定できる', () => {
    render(<CheckboxGroup options={options} gap={4} />);

    expect(
      screen.getByRole('group').style.getPropertyValue('--frgs-layout-gapY'),
    ).toBe('4px');
  });

  it('利用者の className・style を重ね、同じプロパティは利用者の値を優先する', () => {
    render(
      <CheckboxGroup
        options={options}
        className="mine"
        style={{ '--frgs-layout-gapY': '20px', color: 'red' } as never}
      />,
    );

    const group = screen.getByRole('group');
    expect(group.classList).toContain('frg-checkboxgroup');
    expect(group.classList).toContain('mine');
    expect(group.style.getPropertyValue('--frgs-layout-gapY')).toBe('20px');
    expect(group.style.color).toBe('red');
  });

  it('見た目を付けたチェックボックスで描き、選んだ値を通知する', () => {
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup
        options={options}
        onValueChange={onValueChange}
        showSelectAll
        selectAllLabel="すべて"
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    for (const checkbox of checkboxes) {
      expect(checkbox.className).toBe('frg-checkbox-input');
    }

    fireEvent.click(screen.getByLabelText('すべて'));

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(['a', 'b']);
  });

  it('すべて選ぶのチェックボックスにだけ、見分けるクラスを付ける', () => {
    render(
      <CheckboxGroup options={options} showSelectAll selectAllLabel="すべて" />,
    );

    const labels = screen
      .getAllByRole('checkbox')
      .map((checkbox) => checkbox.closest('label'));
    expect(labels[0]?.className).toBe(
      'frg-checkbox frg-checkboxgroup-selectall',
    );
    expect(labels[1]?.className).toBe('frg-checkbox');
    expect(labels[2]?.className).toBe('frg-checkbox');
  });
});
