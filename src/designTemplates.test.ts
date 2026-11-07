import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  buttonDesignTemplate,
  checkboxDesignTemplate,
  collapsibleDesignTemplate,
  createButtonDesign,
  createCheckboxDesign,
  createCollapsibleDesign,
  createRadioDesign,
  createRecordFieldsDesign,
  createSwitchDesign,
  createTableDesign,
  createTextInputDesign,
  radioDesignTemplate,
  recordFieldsDesignTemplate,
  switchDesignTemplate,
  tableDesignTemplate,
  textInputDesignTemplate,
} from '.';

/**
 * 部品ごとの、既定の割り当て・CSS 変数の接頭辞・CSS のファイル・design を作る関数
 */
const components = [
  [
    'checkbox',
    checkboxDesignTemplate,
    'Checkbox/styles.scss',
    createCheckboxDesign,
  ],
  ['radio', radioDesignTemplate, 'RadioGroup/_radio.scss', createRadioDesign],
  ['switch', switchDesignTemplate, 'Switch/styles.scss', createSwitchDesign],
  ['button', buttonDesignTemplate, 'Button/styles.scss', createButtonDesign],
  [
    'textinput',
    textInputDesignTemplate,
    'TextInput/styles.scss',
    createTextInputDesign,
  ],
  [
    'collapsible',
    collapsibleDesignTemplate,
    'Collapsible/styles.scss',
    createCollapsibleDesign,
  ],
  ['table', tableDesignTemplate, 'Table/styles.scss', createTableDesign],
  [
    'recordfields',
    recordFieldsDesignTemplate,
    'RecordFields/styles.scss',
    createRecordFieldsDesign,
  ],
] as const;

/**
 * 割り当ての中の、部品の既定の長さに `scaling` を掛ける指定を、CSS 変数の名前と既定の長さの組にする
 */
function collectScaled(prefix: string, template: object) {
  const result: [variable: string, length: string][] = [];
  const visit = (base: string, part: object) => {
    for (const [key, value] of Object.entries(part)) {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        continue;
      }
      if ('scale' in value && value.scale === 'scaling' && 'from' in value) {
        result.push([`--${base}-${key}`, String(value.from)]);
      } else if (!('from' in value) && !('readableOn' in value)) {
        // 部分（状態ごとのオブジェクトの中には、scaling の指定を書いていない）
        visit(`${base}-${key}`, value);
      }
    }
  };
  visit(`frg-${prefix}`, template);
  return result;
}

describe.each(components)(
  '%s の既定の割り当て',
  (prefix, template, scssPath, create) => {
    it('scaling を掛ける長さは、CSS の既定値と同じ', () => {
      // jsdom では import.meta.url が file: にならないので、パッケージのディレクトリから読む
      const scss = readFileSync(
        resolve(process.cwd(), 'src', scssPath),
        'utf8',
      );
      const scaled = collectScaled(prefix, template);
      // どの部品の割り当ても、scaling を掛ける長さを持つ（空振りしていないことを確かめる）
      expect(scaled.length).toBeGreaterThan(0);
      for (const [variable, length] of scaled) {
        expect(scss).toContain(`var(${variable}, ${length})`);
      }
    });

    it('何も渡さなければ空のデザインの値（部品の既定の見た目のまま）', () => {
      expect(create({})).toEqual({});
    });

    it('提示するキーをすべて渡すと、デザインの値を作る', () => {
      const design = create({
        primaryColor: '#0a7d5a',
        primaryContrastColor: '#ffffff',
        errorColor: '#b42318',
        neutralColor: '#667085',
        radius: 8,
        scaling: 0.9,
      });
      expect(Object.keys(design).length).toBeGreaterThan(0);
    });
  },
);
