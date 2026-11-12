// デザインの定義・割り当て・値の型（各部品の `<名前>DesignDefinition`・`<名前>DesignTemplate`・`design`）と、その中の型。
// 利用者が `@fringeworks/react-contract` を入れずに使えるよう、ここから export する
export type {
  DesignColorFunction,
  DesignColorSpec,
  DesignDefinition,
  DesignLengthFunction,
  DesignLengthSpec,
  DesignPartDefinition,
  DesignPropertyValues,
  DesignState,
  DesignTemplate,
  DesignValue,
} from '@fringeworks/react-contract';

// 選択肢の型（グループの `options`）、表示する選択肢の型（`partsProps` の関数の引数）、
// 選択肢外の値の置き場所の型（`unlistedPlacement`）。
// 利用者が `@fringeworks/react-contract` を入れずに使えるよう、ここから export する
export type {
  DisplayOption,
  Option,
  UnlistedPlacement,
} from '@fringeworks/react-contract';
