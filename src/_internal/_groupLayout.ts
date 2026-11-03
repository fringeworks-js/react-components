import { flow, stack, type LayoutStyle } from '@fringeworks/style-layouts';

/**
 * 選択肢を並べる部品（CheckboxGroup・RadioGroup・ButtonGroup）の、並べ方のプロパティ
 *
 * 省略したときの値は部品ごとに決める（各部品の README に書く）。
 */
export type GroupLayoutProps = {
  /**
   * 並べる向き。`'y'` は縦に1列、`'x'` は横に並べ、入りきらなければ折り返す
   */
  direction?: 'x' | 'y';

  /**
   * 選択肢どうしの間隔（px）
   */
  gap?: number;
};

/**
 * 省略したときの並べ方
 */
type GroupLayoutDefaults = {
  /**
   * 向き
   */
  direction: 'x' | 'y';

  /**
   * 横に並べたときの間隔（px）
   */
  gapX: number;

  /**
   * 縦に並べたときの間隔（px）
   */
  gapY: number;
};

/**
 * 選択肢の部品の既定の並べ方（縦に並べる）
 *
 * 横に並べたとき、前の選択肢の文字と次の選択肢が近いと、どれの文字か分かりにくいので、横の間隔を広くする。
 */
const OPTION_DEFAULTS: GroupLayoutDefaults = {
  direction: 'y',
  gapX: 16,
  gapY: 8,
};

/**
 * 並べ方のプロパティから、入れ物に付けるクラスとスタイルを作る（style-layouts の `stack`・`flow`）
 *
 * @param props 並べ方のプロパティ
 * @param defaults 省略したときの並べ方。省略すると、選択肢の部品の既定（縦、横の間隔 16、縦の間隔 8）
 */
export default function createGroupLayout(
  { direction, gap }: GroupLayoutProps,
  defaults: GroupLayoutDefaults = OPTION_DEFAULTS,
): LayoutStyle {
  return (direction ?? defaults.direction) === 'x'
    ? flow({ direction: 'x', gap: gap ?? defaults.gapX })
    : stack({ direction: 'y', gap: gap ?? defaults.gapY });
}
