import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ButtonGroup from './ButtonGroup';

const options = [
  { value: 'copy', label: 'コピー' },
  { value: 'delete', label: '削除' },
];

describe('ButtonGroup', () => {
  it('既定では横に並べ、間隔は 8px', () => {
    render(<ButtonGroup options={options} aria-label="操作" />);

    const group = screen.getByRole('group', { name: '操作' });
    expect(group.classList).toContain('frg-buttongroup');
    expect(group.classList).toContain('frgs-layout-flow');
    expect(group.style.getPropertyValue('--frgs-layout-gapX')).toBe('8px');
  });

  it("direction が 'y' なら縦に並べ、間隔は 8px", () => {
    render(<ButtonGroup options={options} direction="y" />);

    const group = screen.getByRole('group');
    expect(group.classList).toContain('frgs-layout-stack');
    expect(group.style.getPropertyValue('--frgs-layout-gapY')).toBe('8px');
  });

  it('見た目を付けたボタンで描き、押されたボタンの値を通知する', () => {
    const onMainAction = vi.fn();
    render(<ButtonGroup options={options} onMainAction={onMainAction} />);

    const button = screen.getByRole('button', { name: '削除' });
    expect(button.classList).toContain('frg-button');

    fireEvent.click(button);

    expect(onMainAction).toHaveBeenCalledExactlyOnceWith('delete');
  });
});
