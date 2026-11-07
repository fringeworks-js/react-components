import { withDesign } from '@fringeworks/react-contract';
import { render, screen } from '@testing-library/react';
import { describe, expect, expectTypeOf, it } from 'vitest';
import Checkbox from './Checkbox';
import Table from './Table';

describe('withDesign で包んだ部品', () => {
  it('Checkbox: 既定のデザインの値に、使う場所の design を重ねる', () => {
    const AppCheckbox = withDesign(Checkbox, {
      gap: 10,
      indicator: { backgroundColor: { base: '#eee', checked: 'green' } },
    });
    render(
      <AppCheckbox
        design={{ indicator: { backgroundColor: { checked: 'blue' } } }}
      >
        りんご
      </AppCheckbox>,
    );
    const label = screen.getByRole('checkbox').parentElement!;
    expect(label.style.getPropertyValue('--frg-checkbox-gap')).toBe('10px');
    expect(
      label.style.getPropertyValue('--frg-checkbox-indicator-backgroundColor'),
    ).toBe('#eee');
    expect(
      label.style.getPropertyValue(
        '--frg-checkbox-indicator-backgroundColor-checked',
      ),
    ).toBe('blue');
  });

  it('Table: 型引数を残したまま包める', () => {
    type Member = { id: string; name: string };
    const AppTable = withDesign(Table, { cell: { paddingX: 4 } });
    expectTypeOf(AppTable).toEqualTypeOf<typeof Table>();
    render(
      <AppTable<Member>
        value={[{ id: '1', name: '山田' }]}
        columns={[{ key: 'name', label: '名前' }]}
      />,
    );
    expect(
      screen
        .getByRole('table')
        .style.getPropertyValue('--frg-table-cell-paddingX'),
    ).toBe('4px');
  });
});
