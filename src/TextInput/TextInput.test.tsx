import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TextInput from './TextInput';

describe('TextInput', () => {
  it('frg-textinput のクラスを付け、利用者の className を重ねる', () => {
    render(<TextInput className="mine" />);

    const input = screen.getByRole('textbox');
    expect(input.classList).toContain('frg-textinput');
    expect(input.classList).toContain('mine');
  });

  it('フォーカスが外れたときに確定して通知する', () => {
    const onValueChange = vi.fn();
    render(<TextInput onValueChange={onValueChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
    fireEvent.blur(screen.getByRole('textbox'));

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('a');
  });
});
