import type { CreateDesignOptions } from '@fringeworks/react-contract';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Checkbox,
  Collapsible,
  createButtonDesign,
  createCheckboxDesign,
  createCollapsibleDesign,
  createRadioDesign,
  createRecordFieldsDesign,
  createSwitchDesign,
  createTableDesign,
  createTextInputDesign,
  RadioGroup,
  RecordFields,
  Switch,
  Table,
  TextInput,
} from '../src';
import '../src/styles.scss';

type Row = { id: string; name: string; role: string };

/**
 * 同じ入力（メインの色・灰色・角の丸み・詰め具合など）から、全部品のデザインの値を作って並べる
 */
function Showcase({ options }: { options: CreateDesignOptions }) {
  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button design={createButtonDesign(options)}>保存</Button>
        <TextInput
          design={createTextInputDesign(options)}
          placeholder="名前を入力"
        />
        <TextInput
          design={createTextInputDesign(options)}
          defaultValue="エラー"
          invalid
        />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Checkbox design={createCheckboxDesign(options)} defaultValue>
          チェック
        </Checkbox>
        <Checkbox design={createCheckboxDesign(options)}>なし</Checkbox>
        <Switch design={createSwitchDesign(options)} defaultValue>
          オン
        </Switch>
        <Switch design={createSwitchDesign(options)}>オフ</Switch>
        <RadioGroup
          direction="x"
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ]}
          defaultValue="a"
          partsProps={{ radio: { design: createRadioDesign(options) } }}
        />
      </div>
      <Collapsible
        design={createCollapsibleDesign(options)}
        summary="詳しい条件"
        defaultOpen
      >
        折りたためる中身
      </Collapsible>
      <Table<Row>
        design={createTableDesign(options)}
        columns={[
          { key: 'name', label: '名前' },
          { key: 'role', label: '役割' },
        ]}
        defaultValue={[
          { id: '1', name: '山田 太郎', role: '管理者' },
          { id: '2', name: '佐藤 花子', role: '利用者' },
        ]}
      />
      <RecordFields<Row>
        design={createRecordFieldsDesign(options)}
        fields={[
          { key: 'name', label: '名前' },
          { key: 'role', label: '役割' },
        ]}
        defaultValue={{ id: '1', name: '山田 太郎', role: '管理者' }}
      />
    </div>
  );
}

const meta = {
  title: 'createDesign',
  component: Showcase,
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Showcase>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 何も渡さない（部品の既定の見た目）
 */
export const Default: Story = { args: { options: {} } };

/**
 * 緑・角を丸く・少し詰める
 */
export const Green: Story = {
  args: {
    options: {
      primaryColor: '#0a7d5a',
      neutralColor: '#667085',
      errorColor: '#b42318',
      radius: 10,
      scaling: 0.9,
    },
  },
};

/**
 * ピンク・角ばる・ゆったり
 */
export const Pink: Story = {
  args: {
    options: {
      primaryColor: '#e91e63',
      neutralColor: '#8a8f98',
      radius: 0,
      scaling: 1.15,
    },
  },
};

/**
 * 黄色（明るい色）・ピル型
 */
export const Yellow: Story = {
  args: {
    options: { primaryColor: '#ffeb3b', radius: 9999 },
  },
};
