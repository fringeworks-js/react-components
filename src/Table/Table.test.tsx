import type { TableColumn } from '@fringeworks/react-primitives';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TextInput from '../TextInput';
import Table from './Table';

type Member = { id: string; name: string };

const columns: TableColumn<Member>[] = [
  {
    key: 'name',
    label: '名前',
    renderValue: (props) => <TextInput {...props} />,
  },
];

describe('Table', () => {
  it('frg-table のクラスを付け、利用者の className を重ねる', () => {
    render(<Table value={[]} columns={columns} className="mine" />);

    const table = screen.getByRole('table');
    expect(table.classList).toContain('frg-table');
    expect(table.classList).toContain('mine');
  });

  it('セルの値が確定したら、変わった後の配列と details で知らせる', () => {
    const onValueChange = vi.fn();
    render(
      <Table
        value={[{ id: '1', name: '山田' }]}
        onValueChange={onValueChange}
        columns={columns}
      />,
    );

    const input = screen.getByRole('textbox', { name: '名前' });
    fireEvent.change(input, { target: { value: '鈴木' } });
    fireEvent.blur(input);

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(
      [{ id: '1', name: '鈴木' }],
      { type: 'update', path: ['1', 'name'] },
    );
  });

  it('design の値を、<table> の CSS 変数にする', () => {
    render(
      <Table
        value={[]}
        columns={columns}
        design={{ headerCell: { fontWeight: 700 }, cell: { paddingX: 4 } }}
      />,
    );
    const table = screen.getByRole('table');
    expect(
      table.style.getPropertyValue('--frg-table-headerCell-fontWeight'),
    ).toBe('700');
    expect(table.style.getPropertyValue('--frg-table-cell-paddingX')).toBe(
      '4px',
    );
  });
});
