import type { IconSlotProps } from '@fringeworks/react-contract';
import { withDesign } from '@fringeworks/react-contract';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import withButtonIcon from './withButtonIcon';

function TestIcon({ value, ...props }: IconSlotProps<'save' | 'expand'>) {
  return <span {...props} data-icon={value} />;
}

const IconButton = withButtonIcon(TestIcon);

describe('withButtonIcon', () => {
  it('icon・endIcon のアイコンを、見た目を付けたボタンの中身の前後に描く', () => {
    const onMainAction = vi.fn();
    render(
      <IconButton
        value={1}
        icon="save"
        endIcon="expand"
        onMainAction={onMainAction}
      >
        保存
      </IconButton>,
    );
    const button = screen.getByRole('button', { name: '保存' });
    expect(button.className).toBe('frg-button');
    expect(
      Array.from(button.childNodes, (node) =>
        node instanceof HTMLElement ? node.dataset.icon : node.textContent,
      ),
    ).toEqual(['save', '保存', 'expand']);
    fireEvent.click(button);
    expect(onMainAction).toHaveBeenCalledExactlyOnceWith(1);
  });

  it('design と withDesign を、Button と同じく扱う', () => {
    const AppIconButton = withDesign(IconButton, { gap: 8 });
    render(
      <AppIconButton icon="save" design={{ paddingX: 4 }}>
        保存
      </AppIconButton>,
    );
    const button = screen.getByRole('button');
    expect(button.style.getPropertyValue('--frg-button-gap')).toBe('8px');
    expect(button.style.getPropertyValue('--frg-button-paddingX')).toBe('4px');
  });

  it('icon の型は、組み込んだアイコンの value の型', () => {
    const element = (
      // @ts-expect-error アイコンの部品に無い名前
      <IconButton icon="delete">削除</IconButton>
    );
    expect(element).toBeDefined();
  });

  it('displayName に組み込んだアイコンの名前を入れる', () => {
    expect(IconButton.displayName).toBe('withButtonIcon(TestIcon)');
  });
});
