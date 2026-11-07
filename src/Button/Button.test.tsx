import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('frg-button のクラスを付け、利用者の className を重ねる', () => {
    render(<Button className="mine">保存</Button>);

    const button = screen.getByRole('button', { name: '保存' });
    expect(button.classList).toContain('frg-button');
    expect(button.classList).toContain('mine');
  });

  it('押すと value を onMainAction に渡す', () => {
    const onMainAction = vi.fn();
    render(
      <Button value="save" onMainAction={onMainAction}>
        保存
      </Button>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onMainAction).toHaveBeenCalledExactlyOnceWith('save');
  });

  it('design の値を、<button> の CSS 変数にする', () => {
    render(
      <Button design={{ backgroundColor: { hover: '#eee' }, paddingX: 20 }} />,
    );
    const button = screen.getByRole('button');
    expect(
      button.style.getPropertyValue('--frg-button-backgroundColor-hover'),
    ).toBe('#eee');
    expect(button.style.getPropertyValue('--frg-button-paddingX')).toBe('20px');
    expect(button.hasAttribute('design')).toBe(false);
  });
});
