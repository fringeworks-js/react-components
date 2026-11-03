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
});
