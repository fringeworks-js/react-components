import type { TableColumn } from '@fringeworks/react-primitives';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { Checkbox, Table, TextInput } from '../src';
import '../src/styles.scss';

type Member = { id: string; name: string; email: string; active: boolean };

const members: Member[] = [
  { id: '1', name: '山田 太郎', email: 'yamada@example.com', active: true },
  { id: '2', name: '佐藤 花子', email: 'sato@example.com', active: false },
  { id: '3', name: '鈴木 一郎', email: 'suzuki@example.com', active: true },
];

const columns: TableColumn<Member>[] = [
  { key: 'id', label: 'ID' },
  {
    key: 'name',
    label: '名前',
    renderValue: (props) => <TextInput {...props} />,
  },
  {
    key: 'email',
    label: 'メール',
    renderValue: (props) => <TextInput {...props} type="email" />,
  },
  {
    key: 'active',
    label: '有効',
    renderValue: (props) => <Checkbox {...props} />,
  },
];

const meta = {
  title: 'Table',
  component: Table<Member>,
  args: { columns, defaultValue: members },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Table<Member>>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 表示だけ（`renderValue` を省略した列は、値を文字にする）
 */
export const ReadOnly: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: '名前' },
      { key: 'email', label: 'メール' },
    ],
  },
};

/**
 * 非制御。セルの値は表の中で持つ（Storybook の Actions で通知を確かめる）
 */
export const Uncontrolled: Story = {};

/**
 * セルに入力の部品を置き、`useState` で配列を持つ。
 * 確定したセルの details（`{ type: 'update', path: [id, key] }`）を下に出す
 */
export const Editable: Story = {
  render: function Render() {
    const [value, setValue] = useState(members);
    const [lastDetails, setLastDetails] = useState<unknown>();
    return (
      <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <Table
          aria-label="メンバー"
          value={value}
          onValueChange={(next, details) => {
            setValue(next);
            setLastDetails(details);
          }}
          columns={columns}
        />
        <span>details: {JSON.stringify(lastDetails)}</span>
        <pre style={{ margin: 0 }}>{JSON.stringify(value, null, 2)}</pre>
      </div>
    );
  },
};

/**
 * CSS 変数で見た目を調整する例
 */
export const CustomStyle: Story = {
  render: () => (
    <Table
      value={members}
      columns={columns}
      style={
        {
          '--frg-table-paddingX': '1em',
          '--frg-table-borderColor': '#e3e6ea',
          '--frg-table-headerBorderColor': '#0a7d4f',
          '--frg-table-headerBackgroundColor': '#eef7f2',
        } as CSSProperties
      }
    />
  ),
};

type Product = { id: string; name: string; stock: number; price: number };

const products: Product[] = [
  { id: 'P-1', name: 'ペン', stock: 120, price: 120 },
  { id: 'P-2', name: 'ノート', stock: 0, price: 300 },
  { id: 'P-3', name: 'マグカップ', stock: 8, price: 800 },
  { id: 'P-4', name: 'ケトル', stock: 3, price: 3200 },
];

const yen = new Intl.NumberFormat('ja-JP');

const productColumns: TableColumn<Product>[] = [
  { key: 'id', label: 'ID', cellProps: { style: { color: '#666' } } },
  {
    key: 'name',
    label: '商品',
    // 列のセルに一律で付ける（見出しには付かない）
    cellProps: { style: { fontWeight: 600 } },
  },
  {
    key: 'stock',
    label: '在庫',
    // 数値は見出しもセルも右に寄せる（headerAlign を省略すると align と同じ）
    align: 'end',
    // 値に応じて、そのセルだけ変える
    cellProps: ({ value }) =>
      value === 0 ? { style: { color: '#d93025' } } : {},
  },
  {
    key: 'price',
    label: '価格',
    // セルは右寄せ、見出しは中央寄せ
    align: 'end',
    headerAlign: 'center',
    headerProps: { style: { backgroundColor: '#eef7f2' } },
    renderValue: ({ value }) => `¥${yen.format(value)}`,
    cellProps: ({ value, record }) =>
      value >= 1000 && record.stock < 5
        ? { style: { backgroundColor: '#fff4e5' } }
        : {},
  },
];

// 描くたびに新しい関数にならないよう、部品の外に置く
const productRowProps = ({
  index,
  record,
}: {
  index: number;
  record: Product;
}) => ({
  style: {
    backgroundColor: index % 2 === 1 ? '#f7f8fa' : undefined,
    opacity: record.stock === 0 ? 0.6 : undefined,
  },
});

/**
 * 行・列・セルの props と文字寄せ
 *
 * - 行: `partsProps.row`（関数なら行ごと）。1行おきの背景と、在庫が無い行を薄くする
 * - 列: `cellProps`（値なら列のセルに一律）、`headerProps`（見出しだけ）
 * - セル: `cellProps` の関数（値・行から決める）。在庫 0 を赤、高くて在庫が少ない価格に背景
 * - 文字寄せ: `align`（セル）と `headerAlign`（見出し。省略すると `align`）
 */
export const Styling: StoryObj = {
  render: () => (
    <Table
      aria-label="商品"
      value={products}
      columns={productColumns}
      partsProps={{ row: productRowProps }}
    />
  ),
};
