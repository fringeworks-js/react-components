import { withMatrixLayout, withStackLayout } from '@fringeworks/react-layouts';
import {
  withAffixItem,
  withAffixLayout,
} from '@fringeworks/react-layouts-adornment';
import '@fringeworks/react-layouts-adornment/styles.css';
import '@fringeworks/react-layouts/styles.css';
import {
  withRecordFields,
  type RecordField,
} from '@fringeworks/react-primitives';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { Checkbox, RadioGroup, RecordFields, TextInput } from '../src';
import '../src/styles.scss';

type Member = {
  id: string;
  name: string;
  email: string;
  plan: string;
  active: boolean;
};

const member: Member = {
  id: '1',
  name: '山田 太郎',
  email: 'yamada@example.com',
  plan: 'basic',
  active: true,
};

const fields: RecordField<Member>[] = [
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
    key: 'plan',
    label: 'プラン',
    renderValue: (props) => (
      <RadioGroup
        {...props}
        direction="x"
        options={[
          { value: 'basic', label: 'ベーシック' },
          { value: 'pro', label: 'プロ' },
        ]}
      />
    ),
  },
  {
    key: 'active',
    label: '有効',
    renderValue: (props) => <Checkbox {...props} />,
  },
];

const meta = {
  title: 'RecordFields',
  component: RecordFields<Member>,
  args: { fields, defaultValue: member },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RecordFields<Member>>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 非制御。項目の値は部品の中で持つ（Storybook の Actions で通知を確かめる）
 */
export const Uncontrolled: Story = {};

/**
 * 表示だけ（`renderValue` を省略した項目は、値を文字にする）
 */
export const ReadOnly: Story = {
  args: {
    fields: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: '名前' },
      { key: 'email', label: 'メール' },
    ],
  },
};

/**
 * `useState` でレコードを持つ。確定した項目の details（`{ type: 'update', path: [key] }`）を下に出す
 */
export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState(member);
    const [lastDetails, setLastDetails] = useState<unknown>();
    return (
      <div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
        <RecordFields
          role="group"
          aria-label="メンバー"
          value={value}
          onValueChange={(next, details) => {
            setValue(next);
            setLastDetails(details);
          }}
          fields={fields}
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
    <RecordFields
      defaultValue={member}
      fields={fields}
      style={
        {
          '--frg-recordfields-gap': '20px',
          '--frg-recordfields-labelGap': '6px',
          '--frg-recordfields-labelColor': '#0a7d4f',
          '--frg-recordfields-labelFontWeight': '400',
        } as CSSProperties
      }
    />
  ),
};

// ---------------------------------------------------------------------------
// react-layouts・react-layouts-adornment の部品を組み込む
// ---------------------------------------------------------------------------

// 項目は affix のコンテナ、ラベルは affix の装飾、値（Value。既定の div）は affix の本体になる
const AffixField = withAffixLayout('div');
const AffixLabel = withAffixItem('div');

// 項目を縦に並べる（stack）
const StackFields = withRecordFields({
  Container: withStackLayout('div'),
  Field: AffixField,
  Label: AffixLabel,
});

// 項目を2列の格子に並べる（matrix）
const MatrixFields = withRecordFields({
  Container: withMatrixLayout('div'),
  Field: AffixField,
  Label: AffixLabel,
});

/**
 * `withRecordFields` の部品に、react-layouts（項目の並び）と react-layouts-adornment（ラベルの位置）の部品を組み込む。
 *
 * 組み込んだ部品の props が型になるので、レイアウトの指定は、ルート（入れ物の stack・matrix）と
 * `partsProps.label`（ラベルの affix の装飾）に型付きで渡せる。affix の装飾は `side` が必須なので、`partsProps` も必須になる
 */
export const WithLayouts: Story = {
  render: function Render() {
    const [value, setValue] = useState(member);
    return (
      <div style={{ display: 'grid', gap: 32 }}>
        <section>
          <h3>縦に並べ、ラベルを左に置く（ラベルの幅は固定）</h3>
          <StackFields
            value={value}
            onValueChange={setValue}
            fields={fields}
            direction="y"
            gap={12}
            partsProps={{
              label: {
                side: 'left',
                alignY: 'middle',
                gap: 12,
                style: { width: '6em' },
              },
            }}
          />
        </section>
        <section>
          <h3>
            2列の格子に並べ、ラベルを上に置く。「有効」だけラベルを右に置く
          </h3>
          <MatrixFields
            value={value}
            onValueChange={setValue}
            fields={fields}
            itemCountX={2}
            itemCountY={3}
            gap={16}
            partsProps={{
              label: ({ key }) =>
                key === 'active'
                  ? { side: 'right', alignY: 'middle', gap: 8 }
                  : { side: 'top', alignX: 'left', gap: 4 },
            }}
          />
        </section>
        <pre style={{ margin: 0 }}>{JSON.stringify(value, null, 2)}</pre>
      </div>
    );
  },
};
