import type {
  CheckboxIndicatorSlotProps,
  CollapsibleIndicatorSlotProps,
  RadioIndicatorSlotProps,
} from '@fringeworks/react-primitives';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withCheckboxIndicator } from './Checkbox';
import { withCheckboxGroupIndicator } from './CheckboxGroup';
import { withCollapsibleIndicator } from './Collapsible';
import { withRadioGroupIndicator } from './RadioGroup';

function OpenMark({
  open,
  disabled: _disabled,
  ...props
}: CollapsibleIndicatorSlotProps) {
  return (
    <span {...props} data-testid="mark">
      {open ? '▼' : '▶'}
    </span>
  );
}

describe('withCollapsibleIndicator', () => {
  it('差し替えた開閉の印に、状態と土台のクラス・状態の属性を渡す', () => {
    const AppCollapsible = withCollapsibleIndicator(OpenMark);
    const { container } = render(
      <AppCollapsible summary="詳細">中身</AppCollapsible>,
    );
    const mark = screen.getByTestId('mark');
    expect([mark.className, mark.textContent, mark.dataset.open]).toEqual([
      'frg-collapsible-indicator',
      '▶',
      undefined,
    ]);
    fireEvent.click(screen.getByText('詳細'));
    expect([mark.textContent, mark.dataset.open]).toEqual(['▼', 'true']);
    expect(container.querySelector('details')?.className).toBe(
      'frg-collapsible',
    );
    expect(AppCollapsible.displayName).toBe(
      'withCollapsibleIndicator(OpenMark)',
    );
  });

  it('印を回す角度を design の indicator.rotate で決められる（数値は deg）', () => {
    const AppCollapsible = withCollapsibleIndicator(OpenMark);
    const { container } = render(
      <AppCollapsible
        summary="詳細"
        design={{ indicator: { rotate: { open: 90 } } }}
      >
        中身
      </AppCollapsible>,
    );
    const details = container.querySelector('details');
    expect(
      details?.style.getPropertyValue(
        '--frg-collapsible-indicator-rotate-open',
      ),
    ).toBe('90deg');
    expect(
      details?.style.getPropertyValue('--frg-collapsible-indicator-rotate'),
    ).toBe('');
  });
});

function CheckMark({
  checked,
  indeterminate,
  disabled: _disabled,
  readOnly: _readOnly,
  invalid: _invalid,
  ...props
}: CheckboxIndicatorSlotProps) {
  return (
    <span {...props} data-testid="mark">
      {indeterminate ? '−' : checked ? '✓' : '□'}
    </span>
  );
}

function RadioMark({
  checked,
  disabled: _disabled,
  readOnly: _readOnly,
  invalid: _invalid,
  ...props
}: RadioIndicatorSlotProps) {
  return (
    <span {...props} data-testid="mark">
      {checked ? '●' : '○'}
    </span>
  );
}

const options = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
];

describe('withCheckboxIndicator', () => {
  const AppCheckbox = withCheckboxIndicator(CheckMark);

  it('差し替えた印に、状態と土台のクラス・状態の属性を渡す。既定の印の種類のクラスは付けない', () => {
    render(<AppCheckbox defaultValue={false}>同意する</AppCheckbox>);
    const mark = screen.getByTestId('mark');
    expect([mark.className, mark.textContent, mark.dataset.checked]).toEqual([
      'frg-checkbox-indicator',
      '□',
      undefined,
    ]);
    fireEvent.click(screen.getByRole('checkbox'));
    expect([mark.textContent, mark.dataset.checked]).toEqual(['✓', 'true']);
  });

  it('ルートには Checkbox と同じクラスと design の CSS 変数を付ける', () => {
    const { container } = render(
      <AppCheckbox design={{ indicator: { color: { checked: 'green' } } }}>
        同意する
      </AppCheckbox>,
    );
    const label = container.querySelector('label');
    expect(label?.className).toBe('frg-checkbox');
    expect(
      label?.style.getPropertyValue('--frg-checkbox-indicator-color-checked'),
    ).toBe('green');
    expect(AppCheckbox.displayName).toBe('withCheckboxIndicator(CheckMark)');
  });
});

describe('withCheckboxGroupIndicator', () => {
  it('選択肢とすべて選ぶのチェックボックスを、差し替えた印で描く', () => {
    const AppCheckboxGroup = withCheckboxGroupIndicator(CheckMark);
    render(
      <AppCheckboxGroup
        options={options}
        defaultValue={['a']}
        showSelectAll
        selectAllLabel="すべて"
      />,
    );
    expect(
      screen.getAllByTestId('mark').map((mark) => mark.textContent),
    ).toEqual(['−', '✓', '□']);
    expect(AppCheckboxGroup.displayName).toBe(
      'withCheckboxGroupIndicator(CheckMark)',
    );
  });
});

describe('withRadioGroupIndicator', () => {
  it('ラジオボタンを、差し替えた印で描く', () => {
    const AppRadioGroup = withRadioGroupIndicator(RadioMark);
    render(<AppRadioGroup options={options} defaultValue="b" />);
    const marks = screen.getAllByTestId('mark');
    expect(marks.map((mark) => mark.textContent)).toEqual(['○', '●']);
    expect(marks[1]?.className).toBe('frg-radio-indicator');
    expect(marks[1]?.dataset.checked).toBe('true');
    expect(AppRadioGroup.displayName).toBe(
      'withRadioGroupIndicator(RadioMark)',
    );
  });
});
