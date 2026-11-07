import createCheckboxDesign from './createCheckboxDesign';

describe('createCheckboxDesign', () => {
  it('メインの色から、チェック・不確定・フォーカスの色を作る', () => {
    expect(createCheckboxDesign({ primaryColor: '#0a7d5a' })).toEqual({
      indicator: {
        backgroundColor: { checked: '#0a7d5a', indeterminate: '#0a7d5a' },
        borderColor: { checked: '#0a7d5a', indeterminate: '#0a7d5a' },
        color: { checked: '#ffffff', indeterminate: '#ffffff' },
        outlineColor: { focus: '#0a7d5a' },
      },
    });
  });

  it('薄い色は、枠とフォーカスの線だけを白の上で見分けられる色にする', () => {
    const design = createCheckboxDesign({ primaryColor: '#ffeb3b' });
    const { indicator } = design;
    expect(indicator?.backgroundColor).toEqual({
      checked: '#ffeb3b',
      indeterminate: '#ffeb3b',
    });
    expect(indicator?.color).toEqual({
      checked: '#000000',
      indeterminate: '#000000',
    });
    // コントラスト比の計算は design-utils の ensureContrast のテストで確かめている
    expect(indicator?.borderColor).toEqual({
      checked: expect.stringMatching(/^#[0-9a-f]{6}$/),
      indeterminate: expect.stringMatching(/^#[0-9a-f]{6}$/),
    });
    expect((indicator?.borderColor as { checked: string }).checked).not.toBe(
      '#ffeb3b',
    );
  });

  it('印は、白とのコントラスト比が 3 以上なら白にする', () => {
    // ピンクは黒の方が比が高い（白 4.3、黒 4.8）が、白も 3 を満たす
    expect(
      createCheckboxDesign({ primaryColor: '#e91e63' }).indicator?.color,
    ).toEqual({ checked: '#ffffff', indeterminate: '#ffffff' });
    // オレンジは白が 3 に届かない（2.2）ので黒
    expect(
      createCheckboxDesign({ primaryColor: '#ff9800' }).indicator?.color,
    ).toEqual({ checked: '#000000', indeterminate: '#000000' });
  });

  it('primaryContrastColor を渡すと、印の色に使う', () => {
    const design = createCheckboxDesign({
      primaryColor: '#0a7d5a',
      primaryContrastColor: '#ffeb3b',
    });
    expect(design.indicator?.color).toEqual({
      checked: '#ffeb3b',
      indeterminate: '#ffeb3b',
    });
  });

  it('neutralColor・errorColor を渡すと、チェックしていないときの枠・エラーの枠に使う', () => {
    const design = createCheckboxDesign({
      neutralColor: '#667085',
      errorColor: '#b42318',
    });
    expect(design).toEqual({
      indicator: { borderColor: { base: '#667085', invalid: '#b42318' } },
    });
  });

  it('radius から印の角の丸みを作る（radius の半分で、0.3em より丸くしない）', () => {
    expect(createCheckboxDesign({ radius: 8 })).toEqual({
      indicator: { borderRadius: 'min(4px, 0.3em)' },
    });
    expect(createCheckboxDesign({ radius: 0 })).toEqual({
      indicator: { borderRadius: 'min(0px, 0.3em)' },
    });
    expect(createCheckboxDesign({ radius: 'var(--app-radius)' })).toEqual({
      indicator: { borderRadius: 'min(calc(var(--app-radius) * 0.5), 0.3em)' },
    });
  });

  it('scaling で印と文字の間隔・印の大きさを変える', () => {
    expect(createCheckboxDesign({ scaling: 0.9 })).toEqual({
      gap: '5.4px',
      indicator: { size: '0.9em' },
    });
  });

  it('何も渡さなければ空のデザインの値（部品の既定の見た目のまま）', () => {
    expect(createCheckboxDesign({})).toEqual({});
  });
});
