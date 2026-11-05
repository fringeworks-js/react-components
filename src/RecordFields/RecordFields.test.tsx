import type { RecordField } from '@fringeworks/react-primitives';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TextInput from '../TextInput';
import RecordFields from './RecordFields';

type Member = { id: string; name: string };

const fields: RecordField<Member>[] = [
  {
    key: 'name',
    label: '名前',
    renderValue: (props) => <TextInput {...props} />,
  },
];

describe('RecordFields', () => {
  it('frg-recordfields のクラスを付け、利用者の className を重ねる', () => {
    const { container } = render(
      <RecordFields
        value={{ id: '1', name: '山田' }}
        fields={fields}
        className="mine"
      />,
    );

    const root = container.firstElementChild!;
    expect(root.classList).toContain('frg-recordfields');
    expect(root.classList).toContain('mine');
  });

  it('項目の値が確定したら、変わった後のレコードと details で知らせる', () => {
    const onValueChange = vi.fn();
    render(
      <RecordFields
        value={{ id: '1', name: '山田' }}
        onValueChange={onValueChange}
        fields={fields}
      />,
    );

    const input = screen.getByRole('textbox', { name: '名前' });
    fireEvent.change(input, { target: { value: '鈴木' } });
    fireEvent.blur(input);

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(
      { id: '1', name: '鈴木' },
      { type: 'update', path: ['name'] },
    );
  });
});
