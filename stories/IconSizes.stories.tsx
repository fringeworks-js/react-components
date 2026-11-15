import { MaterialSymbolOutlined } from '@fringeworks/react-icon-material-symbols';
import '@fringeworks/react-icon-material-symbols/font-outlined.css';
import '@fringeworks/react-icon-material-symbols/styles.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import {
  Checkbox,
  type CheckboxIndicatorSlotProps,
  type CollapsibleIndicatorSlotProps,
  RadioGroup,
  type RadioIndicatorSlotProps,
  withButtonIcon,
  withCheckboxIndicator,
  withCollapsibleIndicator,
  withRadioGroupIndicator,
} from '../src';
import '../src/styles.scss';

/**
 * アイコンの既定の大きさを決めるための比較（検討用。2026-11-14）。
 * 同じ状況で、アイコンの大きさ（周りの文字に対する倍率）だけを変えて並べる
 */
const meta = {
  title: 'Icon Sizes',
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** 比べる大きさ（周りの文字に対する倍率）。文字と並べる場面 */
const TEXT_SCALES = [1, 1.15, 1.2, 1.25, 1.3] as const;

/** 比べる大きさ。ボタン・状態の印（1.3 より大きいものも見る） */
const CONTROL_SCALES = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7] as const;

const grid = (columns: number): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `8em repeat(${columns}, max-content)`,
  columnGap: 24,
  rowGap: 16,
  alignItems: 'center',
});

const headerCell: CSSProperties = { color: '#666', fontSize: 12 };

/**
 * 行ごとに、倍率を変えて並べる表
 */
function Comparison({
  columns,
  unit = 'em',
  rows,
}: {
  columns: readonly number[];
  unit?: string;
  rows: readonly { label: string; render: (column: number) => ReactNode }[];
}) {
  return (
    <div style={grid(columns.length)}>
      <span />
      {columns.map((column) => (
        <span key={column} style={headerCell}>
          {column}
          {unit}
        </span>
      ))}
      {rows.map((row) => (
        <Row
          key={row.label}
          columns={columns}
          label={row.label}
          render={row.render}
        />
      ))}
    </div>
  );
}

function Row({
  columns,
  label,
  render,
}: {
  columns: readonly number[];
  label: string;
  render: (column: number) => ReactNode;
}) {
  return (
    <>
      <span style={headerCell}>{label}</span>
      {columns.map((column) => (
        <div key={column}>{render(column)}</div>
      ))}
    </>
  );
}

const em = (scale: number): CSSProperties => ({ fontSize: `${scale}em` });

/**
 * 文字と並べる（アイコンを直接置く場面）。文の大きさ・見出し・メニュー・表のセル
 */
export const WithText: Story = {
  render: () => (
    <Comparison
      columns={TEXT_SCALES}
      rows={[
        {
          label: '文（14px）',
          render: (scale) => (
            <span
              style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}
            >
              <MaterialSymbolOutlined value="check_circle" style={em(scale)} />
              保存済み
            </span>
          ),
        },
        {
          label: '文（14px）（英字）',
          render: (scale) => (
            <span
              style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}
            >
              <MaterialSymbolOutlined value="check_circle" style={em(scale)} />
              Saved
            </span>
          ),
        },
        {
          label: '文の中（行の高さ 1.5）',
          render: (scale) => (
            <p style={{ margin: 0, lineHeight: 1.5, width: '10em' }}>
              詳しくは
              <MaterialSymbolOutlined value="open_in_new" style={em(scale)} />
              ヘルプを見てください。文が2行になる例です。
            </p>
          ),
        },
        {
          label: '文の中（行の高さ 1.5）（英字）',
          render: (scale) => (
            <p style={{ margin: 0, lineHeight: 1.5, width: '10em' }}>
              See the
              <MaterialSymbolOutlined value="open_in_new" style={em(scale)} />
              help page. This sentence wraps onto two lines.
            </p>
          ),
        },
        {
          label: '文（16px）',
          render: (scale) => (
            <span
              style={{
                display: 'inline-flex',
                gap: 4,
                alignItems: 'center',
                fontSize: 16,
              }}
            >
              <MaterialSymbolOutlined value="warning" style={em(scale)} />
              注意
            </span>
          ),
        },
        {
          label: '見出し（20px）',
          render: (scale) => (
            <span
              style={{
                display: 'inline-flex',
                gap: 6,
                alignItems: 'center',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              <MaterialSymbolOutlined value="settings" style={em(scale)} />
              設定
            </span>
          ),
        },
        {
          label: '見出し（20px）（英字）',
          render: (scale) => (
            <span
              style={{
                display: 'inline-flex',
                gap: 6,
                alignItems: 'center',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              <MaterialSymbolOutlined value="settings" style={em(scale)} />
              Settings
            </span>
          ),
        },
        {
          label: 'メニュー',
          render: (scale) => (
            <div style={{ display: 'grid', gap: 6 }}>
              {(
                [
                  ['edit', '編集'],
                  ['content_copy', '複製'],
                  ['delete', '削除'],
                ] as const
              ).map(([icon, text]) => (
                <span
                  key={icon}
                  style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                >
                  <MaterialSymbolOutlined value={icon} style={em(scale)} />
                  {text}
                </span>
              ))}
            </div>
          ),
        },
        {
          label: 'メニュー（英字）',
          render: (scale) => (
            <div style={{ display: 'grid', gap: 6 }}>
              {(
                [
                  ['edit', 'Edit'],
                  ['content_copy', 'Duplicate'],
                  ['delete', 'Delete'],
                ] as const
              ).map(([icon, text]) => (
                <span
                  key={icon}
                  style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                >
                  <MaterialSymbolOutlined value={icon} style={em(scale)} />
                  {text}
                </span>
              ))}
            </div>
          ),
        },
        {
          label: '表のセル',
          render: (scale) => (
            <span
              style={{
                display: 'inline-flex',
                gap: 4,
                alignItems: 'center',
                padding: '4px 8px',
                border: '1px solid #ddd',
              }}
            >
              <MaterialSymbolOutlined
                value="schedule"
                style={{ ...em(scale), color: '#b26a00' }}
              />
              処理中
            </span>
          ),
        },
        {
          label: '表のセル（英字）',
          render: (scale) => (
            <span
              style={{
                display: 'inline-flex',
                gap: 4,
                alignItems: 'center',
                padding: '4px 8px',
                border: '1px solid #ddd',
              }}
            >
              <MaterialSymbolOutlined
                value="schedule"
                style={{ ...em(scale), color: '#b26a00' }}
              />
              Processing
            </span>
          ),
        },
      ]}
    />
  ),
};

const IconButton = withButtonIcon(MaterialSymbolOutlined);

/**
 * ボタンの中（`withButtonIcon`）。アイコンの大きさは `partsProps.icon` の `style` で変えている
 */
export const InButton: Story = {
  render: () => (
    <Comparison
      columns={CONTROL_SCALES}
      rows={[
        {
          label: '前に置く',
          render: (scale) => (
            <IconButton icon="save" partsProps={{ icon: { style: em(scale) } }}>
              保存
            </IconButton>
          ),
        },
        {
          label: '前に置く（英字）',
          render: (scale) => (
            <IconButton icon="save" partsProps={{ icon: { style: em(scale) } }}>
              Save
            </IconButton>
          ),
        },
        {
          label: '後ろに置く',
          render: (scale) => (
            <IconButton
              endIcon="arrow_drop_down"
              partsProps={{ icon: { style: em(scale) } }}
            >
              メニュー
            </IconButton>
          ),
        },
        {
          label: '後ろに置く（英字）',
          render: (scale) => (
            <IconButton
              endIcon="arrow_drop_down"
              partsProps={{ icon: { style: em(scale) } }}
            >
              Menu
            </IconButton>
          ),
        },
        {
          label: 'アイコンだけ',
          render: (scale) => (
            <IconButton
              icon="add"
              aria-label="追加"
              partsProps={{ icon: { style: em(scale) } }}
            />
          ),
        },
      ]}
    />
  ),
};

function CheckboxSymbol({
  checked,
  indeterminate,
  disabled: _disabled,
  readOnly: _readOnly,
  invalid: _invalid,
  ...props
}: CheckboxIndicatorSlotProps & { style?: CSSProperties }) {
  // 比べるために、partsProps.indicator の style も受け取る
  const value = indeterminate
    ? 'indeterminate_check_box'
    : checked
      ? 'check_box'
      : 'check_box_outline_blank';
  return (
    <MaterialSymbolOutlined
      {...props}
      value={value}
      filled={checked || indeterminate}
    />
  );
}

function RadioSymbol({
  checked,
  disabled: _disabled,
  readOnly: _readOnly,
  invalid: _invalid,
  ...props
}: RadioIndicatorSlotProps) {
  return (
    <MaterialSymbolOutlined
      {...props}
      value={checked ? 'radio_button_checked' : 'radio_button_unchecked'}
    />
  );
}

function ExpandSymbol({
  open: _open,
  disabled: _disabled,
  ...props
}: CollapsibleIndicatorSlotProps & { style?: CSSProperties }) {
  // 比べるために、partsProps.indicator の style も受け取る
  return <MaterialSymbolOutlined {...props} value="keyboard_arrow_right" />;
}

const SymbolCheckbox = withCheckboxIndicator(CheckboxSymbol);
const SymbolRadioGroup = withRadioGroupIndicator(RadioSymbol);
const SymbolCollapsible = withCollapsibleIndicator(ExpandSymbol);

const sizes = [
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
];

const sizesJa = [
  { value: 's', label: '小' },
  { value: 'm', label: '中' },
];

/**
 * 状態の印（差し替えた印）。チェックボックス・ラジオボタンは `indicator.size`、開閉の印は `partsProps.indicator` の `style` で変えている。
 * いちばん下は、比べるための既定の印（箱の 1em）
 */
export const Indicators: Story = {
  render: () => (
    <Comparison
      columns={CONTROL_SCALES}
      rows={[
        {
          label: 'チェックボックス',
          render: (scale) => (
            <div style={{ display: 'grid', gap: 6 }}>
              <SymbolCheckbox
                defaultValue
                design={{ indicator: { size: `${scale}em` } }}
              >
                同意する
              </SymbolCheckbox>
              <SymbolCheckbox design={{ indicator: { size: `${scale}em` } }}>
                あとで
              </SymbolCheckbox>
            </div>
          ),
        },
        {
          label: 'チェックボックス（英字）',
          render: (scale) => (
            <div style={{ display: 'grid', gap: 6 }}>
              <SymbolCheckbox
                defaultValue
                design={{ indicator: { size: `${scale}em` } }}
              >
                I agree
              </SymbolCheckbox>
              <SymbolCheckbox design={{ indicator: { size: `${scale}em` } }}>
                Later
              </SymbolCheckbox>
            </div>
          ),
        },
        {
          label: 'ラジオボタン',
          render: (scale) => (
            <SymbolRadioGroup
              options={sizes}
              defaultValue="s"
              partsProps={{
                radio: { design: { indicator: { size: `${scale}em` } } },
              }}
            />
          ),
        },
        {
          label: 'ラジオボタン（日本語）',
          render: (scale) => (
            <SymbolRadioGroup
              options={sizesJa}
              defaultValue="s"
              partsProps={{
                radio: { design: { indicator: { size: `${scale}em` } } },
              }}
            />
          ),
        },
        {
          label: '開閉の印',
          render: (scale) => (
            <SymbolCollapsible
              summary="詳細"
              design={{ indicator: { rotate: { open: 90 } } }}
              partsProps={{ indicator: { style: em(scale) } }}
            >
              中身
            </SymbolCollapsible>
          ),
        },
        {
          label: '開閉の印（英字）',
          render: (scale) => (
            <SymbolCollapsible
              summary="Details"
              design={{ indicator: { rotate: { open: 90 } } }}
              partsProps={{ indicator: { style: em(scale) } }}
            >
              Content
            </SymbolCollapsible>
          ),
        },
        {
          label: '既定の印（参考）',
          render: (scale) => (
            <div style={{ display: 'grid', gap: 6 }}>
              <Checkbox
                defaultValue
                design={{ indicator: { size: `${scale}em` } }}
              >
                同意する
              </Checkbox>
              <RadioGroup
                options={sizes}
                defaultValue="s"
                partsProps={{
                  radio: { design: { indicator: { size: `${scale}em` } } },
                }}
              />
            </div>
          ),
        },
      ]}
    />
  ),
};

/** ボタンの中のアイコン・差し替えた印の倍率（`design` の `icon.scale`・`indicator.scale`）。セットの倍率 1.25 を掛けると 1.4em・1.5em */
const CONTROL_ICON_SCALES = [1.12, 1.2] as const;

/** 文字と並べる（横に並べるときは、文字のベースラインでそろえる） */
const withTextRow: CSSProperties = {
  display: 'inline-flex',
  gap: 4,
  alignItems: 'baseline',
};

/**
 * 既定の値（2026-11-15 に決めた仕組み。文字のベースラインを基準にそろえる）。大きさも位置も指定していない。
 * アイコン単体は 1em ×セットの倍率 1.25。ボタンの中のアイコンと差し替えた印は、`icon.scale`・`indicator.scale` を
 * 1.12（1.4em 相当）と 1.2（1.5em 相当）で並べている（ボタンの既定は 1.12、印の既定は 1.2）
 */
export const Defaults: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, justifyItems: 'start' }}>
      <div style={{ display: 'grid', gap: 8 }}>
        <span style={withTextRow}>
          <MaterialSymbolOutlined value="check_circle" />
          保存済み
        </span>
        <span style={withTextRow}>
          <MaterialSymbolOutlined value="check_circle" />
          Saved
        </span>
        <p style={{ margin: 0, lineHeight: 1.5, width: '14em' }}>
          保存した内容は
          <MaterialSymbolOutlined value="history" />
          履歴から元に戻せます。文が2行になる例です。
        </p>
        <span
          style={{
            ...withTextRow,
            gap: 6,
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          <MaterialSymbolOutlined value="settings" />
          設定 Settings
        </span>
      </div>
      <Comparison
        columns={CONTROL_ICON_SCALES}
        unit=""
        rows={[
          {
            label: 'ボタン',
            render: (scale) => (
              <IconButton icon="save" design={{ icon: { scale } }}>
                保存
              </IconButton>
            ),
          },
          {
            label: 'ボタン（英字）',
            render: (scale) => (
              <IconButton icon="save" design={{ icon: { scale } }}>
                Save
              </IconButton>
            ),
          },
          {
            label: 'アイコンだけ',
            render: (scale) => (
              <IconButton
                icon="add"
                aria-label="追加"
                design={{ icon: { scale } }}
              />
            ),
          },
          {
            label: 'チェックボックス',
            render: (scale) => (
              <SymbolCheckbox defaultValue design={{ indicator: { scale } }}>
                同意する
              </SymbolCheckbox>
            ),
          },
          {
            label: 'チェックボックス（英字）',
            render: (scale) => (
              <SymbolCheckbox design={{ indicator: { scale } }}>
                I agree
              </SymbolCheckbox>
            ),
          },
          {
            label: 'ラジオボタン',
            render: (scale) => (
              <SymbolRadioGroup
                options={sizes}
                defaultValue="s"
                direction="x"
                partsProps={{ radio: { design: { indicator: { scale } } } }}
              />
            ),
          },
          {
            label: '開閉の印',
            render: (scale) => (
              <SymbolCollapsible
                summary="詳細 Details"
                design={{ indicator: { scale, rotate: { open: 90 } } }}
              >
                中身
              </SymbolCollapsible>
            ),
          },
        ]}
      />
    </div>
  ),
};

/** 比べるフォント（Windows に入っているもの。無いフォントは、ブラウザーの既定のフォントで描かれる） */
const FONTS = [
  'Noto Sans JP',
  'Yu Gothic',
  'Meiryo',
  'BIZ UDPGothic',
  'Arial',
  'Segoe UI',
  'Times New Roman',
] as const;

/**
 * フォントを変えたときの位置（既定の値のまま）。どのフォントでも、アイコンの真ん中が文字の真ん中にそろうかを見る
 */
export const Fonts: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '9em repeat(4, max-content)',
        columnGap: 24,
        rowGap: 16,
        alignItems: 'center',
      }}
    >
      {FONTS.map((font) => (
        <FontRow key={font} font={font} />
      ))}
    </div>
  ),
};

function FontRow({ font }: { font: string }) {
  const style: CSSProperties = { fontFamily: `'${font}'` };
  return (
    <>
      <span style={{ ...headerCell, ...style }}>{font}</span>
      <span style={{ ...withTextRow, ...style }}>
        <MaterialSymbolOutlined value="check_circle" />
        保存済み Saved
      </span>
      <span style={style}>
        <IconButton icon="save">保存 Save</IconButton>
      </span>
      <span style={style}>
        <SymbolCheckbox defaultValue>同意する I agree</SymbolCheckbox>
      </span>
      <span style={style}>
        <SymbolCollapsible
          summary="詳細 Details"
          design={{ indicator: { rotate: { open: 90 } } }}
        >
          中身
        </SymbolCollapsible>
      </span>
    </>
  );
}
