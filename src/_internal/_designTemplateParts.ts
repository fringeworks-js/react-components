/**
 * 部品の既定のデザインの割り当て（`<名前>DesignTemplate`）で共通に使う指定
 *
 * 灰色を白と混ぜる割合は、既定の灰色（`#8a8f98`）を `neutralColor` に渡したときに、部品の CSS の既定の見た目に近くなる値にしている。
 */

/**
 * メインの色を、白い背景の上で見分けられる色にする（WCAG の、操作する部品の基準のコントラスト比 3）。
 * 枠・フォーカスの線など、背景の上に線で描くものに使う
 */
export const primaryOnWhite = {
  from: 'primaryColor',
  ensureContrast: { against: '#ffffff', ratio: 3 },
} as const;

/**
 * メインの色の上に置く印の色。`primaryContrastColor` が無ければ、白か黒の読みやすい方。
 * 白とのコントラスト比が 3（WCAG の大きな文字・操作する部品の基準）以上なら白にする。比がわずかに低くても白を使いたい、中間の明るさの色（ピンクなど）のため
 */
export const primaryContrast = [
  'primaryContrastColor',
  { readableOn: 'primaryColor', minRatio: 3 },
] as const;

/**
 * 灰色を白に寄せた、控えめな線・面の色（Switch の溝、Table のセルの線など）
 *
 * @param ratio `neutralColor` の割合
 */
export function lightNeutral(ratio: number) {
  return {
    from: 'neutralColor',
    mix: { with: '#ffffff', ratio },
  } as const;
}

/**
 * 部品の既定の長さに、詰め具合（`scaling`）を掛ける。`from` は部品の CSS の既定値と同じ値にする（テストで確かめる）
 *
 * @param length 部品の CSS の既定値
 */
export function scaled<const L extends string>(length: L) {
  return { from: length, scale: 'scaling' } as const;
}
