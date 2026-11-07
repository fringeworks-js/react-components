# @fringeworks/react-components

`@fringeworks/react-components` is a library some will find handy, offering React components with a minimal look, ready to use in apps.

**[日本語のREADMEはこちら](./README.ja.md)**

## Installation

```bash
npm install @fringeworks/react-components
# or
pnpm add @fringeworks/react-components
```

Supports React 18 and 19.

## Usage

```tsx
import { CheckboxGroup } from '@fringeworks/react-components';
import '@fringeworks/react-components/styles.css';

<CheckboxGroup
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'orange', label: 'Orange' },
  ]}
  value={value}
  onValueChange={setValue}
/>;
```

- The components take props that follow the value and operation contract (`value`, `defaultValue`, `onValueChange`, `disabled`, `readOnly`, `required`, `invalid`, `options`, `open`, `defaultOpen`, `onOpenChange`, `onMainAction`, and so on). They can be controlled or uncontrolled (controlled when `value` is not `undefined`).
- The behavior is built with [`@fringeworks/react-primitives`](https://github.com/fringeworks-js/react-primitives). To decide the look yourself, use the hooks and HOCs of react-primitives.

### Loading CSS

The components do not import CSS, so they work as they are with SSR and React Server Components. Load the CSS separately.

```ts
// CSS for all components
import '@fringeworks/react-components/styles.css';

// CSS for the components you use
import '@fringeworks/react-components/button.css';
import '@fringeworks/react-components/buttongroup.css';
import '@fringeworks/react-components/checkbox.css';
import '@fringeworks/react-components/checkboxgroup.css';
import '@fringeworks/react-components/collapsible.css';
import '@fringeworks/react-components/radiogroup.css';
import '@fringeworks/react-components/recordfields.css';
import '@fringeworks/react-components/switch.css';
import '@fringeworks/react-components/table.css';
import '@fringeworks/react-components/textinput.css';
```

### Adjusting the look

The look is neutral, not tied to a design system, and can be adjusted in these ways.

1. **Props**: layout, such as arrangement and spacing (`direction` and `gap` of `CheckboxGroup`, and so on)
2. **`design`**: colors, sizes, and so on, passed as typed values without writing CSS (the table of each component)
3. **CSS variables**: the same values as `design`, set with CSS
4. **CSS classes**: the components' CSS has zero specificity (`:where()`), so a single class of yours can override any property

```tsx
<Checkbox
  design={{
    gap: 8,
    indicator: {
      size: 18,
      backgroundColor: { checked: '#0a7d4f' },
      borderColor: { checked: '#0a7d4f' },
    },
  }}
/>
```

```css
/* The same values with CSS variables */
.my-checkbox {
  --frg-checkbox-gap: 8px;
  --frg-checkbox-indicator-size: 18px;
  --frg-checkbox-indicator-backgroundColor-checked: #0a7d4f;
  --frg-checkbox-indicator-borderColor-checked: #0a7d4f;
}
```

`design` values follow the rules of `createDesignStyle` in [`@fringeworks/react-contract`](https://github.com/fringeworks-js/react-contract), the same way for every component.

- Keys are CSS property names (`backgroundColor` and so on); those of a part inside the component (`indicator` and so on) go under the part name.
- A value is a single value (for every state) or an object per state (`{ base, hover, checked, … }`). Omitted states keep the component's defaults. Entries such as `opacity.disabled` in the tables mean `disabled` in the object per state.
- Length numbers are px. Every value accepts `var(--…)`, so you can connect it to the CSS variables of a theme system.
- `design` is set as CSS variables on the `style` of the root element. A variable you set with `style` wins. It is stronger than variables set with a class on the same element, so avoid overlapping with variables designers adjust in CSS.

Design shared across your app can be set once with `withDesign` of [`@fringeworks/react-contract`](https://github.com/fringeworks-js/react-contract). The `design` given where a component is used wins over the values set with `withDesign`. Every component has its design definition in a static `designDefinition` property.

```tsx
import { withDesign } from '@fringeworks/react-contract';

// Create it once in your app
export const AppCheckbox = withDesign(Checkbox, {
  indicator: { backgroundColor: { checked: 'var(--brand-accent)' } },
});
```

### Creating design values

You can create good-looking design values from a primary color, a corner radius, a density, and so on, without deciding each value yourself. Each component has a `create<ComponentName>Design` function, and the same inputs can be passed to all of them. The mark color (white or black), the border color for light colors, and so on are decided automatically. Parts whose values you do not pass keep the default look.

```tsx
const brand = {
  primaryColor: '#0a7d5a',
  errorColor: '#b42318',
  radius: 8,
  scaling: 0.9,
} as const;

<Checkbox design={createCheckboxDesign(brand)}>I agree</Checkbox>;

// Combine with withDesign to decide it once in your app
export const AppButton = withDesign(Button, createButtonDesign(brand));
```

```ts
create<ComponentName>Design(options: CreateDesignOptions): <ComponentName>Design
```

The inputs (`CreateDesignOptions`) are the same as for [`createDesign` of react-contract](https://github.com/fringeworks-js/react-contract): `primaryColor`, `primaryContrastColor`, `errorColor`, `neutralColor`, `radius`, and `scaling`. All are optional. Each function calls `createDesign` with the component's default template (the constant `<componentName>DesignTemplate`). To use a different template, pass your own template to `createDesign`.

| Function                   | How the inputs are used                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createCheckboxDesign`     | `primaryColor`: background and border of the indicator when `checked` or `indeterminate`, and the focus outline / `primaryContrastColor`: the mark (✓ and −) / `neutralColor`: the border when not checked / `errorColor`: the border when `invalid` / `radius`: the indicator radius (half, never rounder than `0.3em`) / `scaling`: the space between the indicator and the label, and the indicator size           |
| `createRadioDesign`        | `primaryColor`: background and border of the selected indicator, and the focus outline / `primaryContrastColor`: the inner dot / `neutralColor`: the border when not selected / `errorColor`: the border when `invalid` / `scaling`: the space between the indicator and the label, and the indicator size (the indicator is a circle, so `radius` is not used). Pass it to `partsProps.radio.design` of `RadioGroup` |
| `createSwitchDesign`       | `primaryColor`: the track when on, and the focus outline / `primaryContrastColor`: the thumb when on / `neutralColor`: the track when off (lightened toward white) / `errorColor`: the border when `invalid` / `scaling`: the space, and the width and height of the track (the track is round, so `radius` is not used)                                                                                              |
| `createButtonDesign`       | `primaryColor`: the focus outline (Button is not filled with the primary color) / `neutralColor`: the border, and the background on hover and active (lightened toward white) / `radius`: the corner radius / `scaling`: the space and the horizontal and vertical padding                                                                                                                                            |
| `createTextInputDesign`    | `primaryColor`: the focus outline / `neutralColor`: the border and the placeholder / `errorColor`: the border when `invalid` / `radius`: the corner radius / `scaling`: the horizontal and vertical padding                                                                                                                                                                                                           |
| `createCollapsibleDesign`  | `primaryColor`: the focus outline of the summary / `scaling`: the space between the summary and the content, and between the indicator and the summary text                                                                                                                                                                                                                                                           |
| `createTableDesign`        | `neutralColor`: the header row line, and the data row lines (lightened toward white) / `scaling`: the horizontal and vertical padding of cells                                                                                                                                                                                                                                                                        |
| `createRecordFieldsDesign` | `scaling`: the space between fields, and between a label and its value                                                                                                                                                                                                                                                                                                                                                |

- For borders and focus outlines, a light primary color whose contrast ratio with white is below 3 is darkened until it reaches 3 (backgrounds keep the primary color).
- If the color placed on the primary color (`primaryContrastColor`) is omitted, white is used when its contrast ratio is 3 or above, otherwise the more readable of white and black.
- The ratios for lightening the gray toward white are chosen so that passing the default gray (`#8a8f98`) as `neutralColor` gives a look close to the default.
- A large `radius` (such as `9999`) makes Button and TextInput pill-shaped. Checkbox indicators stop at `0.3em` so that they are not confused with radio buttons.

## API

| Component       | Description                                      |
| --------------- | ------------------------------------------------ |
| `Checkbox`      | A checkbox                                       |
| `Switch`        | A switch                                         |
| `CheckboxGroup` | A group of checkboxes laid out from options      |
| `RadioGroup`    | A group of radio buttons laid out from options   |
| `Button`        | A button                                         |
| `ButtonGroup`   | A group of buttons laid out from options         |
| `TextInput`     | A text input                                     |
| `Collapsible`   | A collapsible component                          |
| `Table`         | A table that takes an array of rows              |
| `RecordFields`  | A component that lays out the fields of a record |

### `Checkbox`

```tsx
<Checkbox value={agreed} onValueChange={setAgreed}>
  I agree to the terms
</Checkbox>
```

[`Checkbox` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Checkbox` of react-primitives (`value`, `defaultValue`, `onValueChange`, `disabled`, `readOnly`, `required`, `invalid`, `indeterminate`, `children`, and `partsProps`). It also takes design values with `design` (the table below).

- Places an `<input type="checkbox" class="frg-checkbox-input">`, the indicator `<span class="frg-checkbox-indicator">`, and `children` inside a `<label class="frg-checkbox">`.
- When `disabled` or `invalid`, it adds `data-disabled` or `data-invalid` to the `<label>`.
- To remove the differences between browsers, the `<input>` is visually hidden and the indicator (`Indicator`) draws the checked state. Keyboard operation and focus are those of the standard `<input>` (the focus outline is drawn on the indicator). The indicator can be replaced with any component through `Indicator` of `withCheckbox` in react-primitives.

The design values you can pass with `design` (the CSS variable is `--frg-checkbox-` followed by the key joined with `-`; for example, `indicator.outlineColor.focus` → `--frg-checkbox-indicator-outlineColor-focus`).

| Key                            | Default   | Description                                                                                              |
| ------------------------------ | --------- | -------------------------------------------------------------------------------------------------------- |
| `gap`                          | `6px`     | The space between the indicator and the label                                                            |
| `color`                        | `inherit` | The text color                                                                                           |
| `opacity.disabled`             | `0.5`     | The opacity when `disabled`                                                                              |
| `indicator.size`               | `1em`     | The size of the indicator                                                                                |
| `indicator.borderRadius`       | `0.25em`  | The corner radius of the indicator                                                                       |
| `indicator.borderColor`        | `#8a8f98` | The border color of the indicator (`#2f6fde` for `checked` and `indeterminate`, `#d93025` for `invalid`) |
| `indicator.backgroundColor`    | `#fff`    | The background color of the indicator (`#2f6fde` for `checked` and `indeterminate`)                      |
| `indicator.color`              | `#fff`    | The color of the mark (✓ and −) (`checked` and `indeterminate`)                                          |
| `indicator.outlineColor.focus` | `#2f6fde` | The outline color on keyboard focus                                                                      |

### `Switch`

```tsx
<Switch value={enabled} onValueChange={setEnabled}>
  Receive notifications
</Switch>
```

[`Switch` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Switch` of react-primitives (those of `Checkbox` without `indeterminate`). It also takes design values with `design` (the table below).

- Places an `<input type="checkbox" role="switch" class="frg-switch-input">`, the track `<span class="frg-switch-indicator">` (with the thumb `<span class="frg-switch-thumb">` inside), and `children` inside a `<label class="frg-switch">`.
- When `disabled` or `invalid`, it adds `data-disabled` or `data-invalid` to the `<label>`.
- The `<input>` is visually hidden, and the track and the thumb (`Indicator`) draw on and off. Keyboard operation and focus are those of the standard `<input>`. With reduced motion (`prefers-reduced-motion`), the thumb does not animate.
- Pass it to `withCheckboxGroup` of react-primitives to create a group of switches (`withCheckboxGroup({ Checkbox: Switch })`).

The design values you can pass with `design` (the CSS variable is `--frg-switch-` followed by the key joined with `-`; for example, `thumb.backgroundColor` → `--frg-switch-thumb-backgroundColor`).

| Key                            | Default       | Description                                                  |
| ------------------------------ | ------------- | ------------------------------------------------------------ |
| `gap`                          | `6px`         | The space between the switch and the label                   |
| `color`                        | `inherit`     | The text color                                               |
| `opacity.disabled`             | `0.5`         | The opacity when `disabled`                                  |
| `indicator.width`              | `2em`         | The width of the track                                       |
| `indicator.height`             | `1.125em`     | The height of the track (it also sets the size of the thumb) |
| `indicator.backgroundColor`    | `#b8bdc6`     | The color of the track (`#2f6fde` for `checked`)             |
| `indicator.borderColor`        | `transparent` | The border color of the track (`#d93025` for `invalid`)      |
| `indicator.outlineColor.focus` | `#2f6fde`     | The outline color on keyboard focus                          |
| `thumb.backgroundColor`        | `#fff`        | The color of the thumb (the same for `checked`)              |

### `CheckboxGroup`

```tsx
<CheckboxGroup
  options={options}
  value={value}
  onValueChange={setValue}
  direction="x"
  showSelectAll
  selectAllLabel="Select all"
/>
```

A group of checkboxes laid out from options. It is `withCheckboxGroup` of react-primitives with the `Checkbox` above. It takes the props of the component created by `withCheckboxGroup` of react-primitives (`options`, `value`, `defaultValue`, `onValueChange`, `disabled`, `readOnly`, `invalid`, `unlistedPlacement`, `keepUnlisted`, `selectAllIncludesUnlisted`, `showSelectAll`, and `selectAllLabel`) and the following props.

| Property     | Type         | Description                                                                                               |
| ------------ | ------------ | --------------------------------------------------------------------------------------------------------- |
| `direction?` | `'x' \| 'y'` | The direction. `'y'` lays them out in a column; `'x'` lays them out in a row and wraps. Defaults to `'y'` |
| `gap?`       | `number`     | The space between checkboxes (px). Defaults to `8` when `direction` is `'y'`, and `16` when `'x'`         |

- Places the checkboxes inside a `<div role="group" class="frg-checkboxgroup">`. The layout uses `stack` (column) and `flow` (row) of [`@fringeworks/style-layouts`](https://github.com/fringeworks-js/style-layouts).
- Other props (`className`, `style`, `aria-label`, and so on) are passed to the `<div>`. When you set the same CSS variable with `style`, your value wins.
- For unlisted values (values in `value` but not in `options`) and the behavior of "select all", see `useCheckboxGroup` of react-primitives.
- "Select all" (`showSelectAll`) is laid out as the parent, so that it reads as the control for all the options. In a column, the options are indented; in a row, "select all" takes the first line and the options start on the next line. The "select all" checkbox gets the `frg-checkboxgroup-selectall` class.

| CSS variable                 | Default                                                             | Description                                                                             |
| ---------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `--frg-checkboxgroup-indent` | The sum of `--frg-checkbox-indicator-size` and `--frg-checkbox-gap` | The indent of the options under "select all" in a column (up to the "select all" label) |

### `RadioGroup`

```tsx
<RadioGroup
  options={[
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
  ]}
  value={size}
  onValueChange={setSize}
  direction="x"
/>
```

A group of radio buttons laid out from options. It is `withRadioGroup` of react-primitives with a styled radio button. It takes the props of the component created by `withRadioGroup` of react-primitives (`options`, `value`, `defaultValue`, `onValueChange`, `disabled`, `readOnly`, `required`, `invalid`, `unlistedPlacement`, and `keepUnlisted`) and the same `direction` and `gap` as `CheckboxGroup`.

- `value` is the selected value, and `null` when nothing is selected. A selected value cannot be cleared (the same as HTML radio buttons).
- Places `<label class="frg-radio">` elements inside a `<div role="radiogroup" class="frg-radiogroup">`. Each `<label>` holds a visually hidden `<input type="radio" class="frg-radio-input">`, the indicator `<span class="frg-radio-indicator">`, and the text. The Tab key enters the group and the arrow keys select (the browser's standard behavior).
- While `disabled` or `invalid`, the `<label>` gets `data-disabled` or `data-invalid` (`aria-invalid` cannot be set on a radio button, so the invalid look uses the attribute on the `<label>`).
- Other props are passed to the `<div>`.
- For unlisted values, see `useRadioGroup` of react-primitives. To show the selected value with its label, pass the same `value`, `options`, and `unlistedPlacement` to `OptionLabel` of react-primitives.

Design values for the radio buttons inside can be passed with `partsProps.radio.design` (the table below; the CSS variable is `--frg-radio-` followed by the key joined with `-`).

| Key                            | Default   | Description                                                                          |
| ------------------------------ | --------- | ------------------------------------------------------------------------------------ |
| `gap`                          | `6px`     | The space between the radio button and the label                                     |
| `color`                        | `inherit` | The text color                                                                       |
| `opacity.disabled`             | `0.5`     | The opacity when `disabled`                                                          |
| `indicator.size`               | `1em`     | The size of the indicator                                                            |
| `indicator.borderColor`        | `#8a8f98` | The border color of the indicator (`#2f6fde` for `checked`, `#d93025` for `invalid`) |
| `indicator.backgroundColor`    | `#fff`    | The background color of the indicator (`#2f6fde` for `checked`)                      |
| `indicator.color`              | `#fff`    | The color of the dot when selected (`checked`)                                       |
| `indicator.outlineColor.focus` | `#2f6fde` | The outline color on keyboard focus                                                  |

### `Button`

```tsx
<Button value="save" onMainAction={run}>
  Save
</Button>
```

[`Button` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Button` of react-primitives (`value`, `onMainAction`, `disabled`, `type`, and the props of `<button>`). It also takes design values with `design` (the table below).

- When pressed, it passes `value` to `onMainAction` as it is. If `onClick` calls `event.preventDefault()`, `onMainAction` is not called.
- `type` defaults to `'button'` (it does not submit even inside a form).
- It renders `<button class="frg-button">`.

The design values you can pass with `design` (the CSS variable is `--frg-button-` followed by the key joined with `-`; for example, `outlineColor.focus` → `--frg-button-outlineColor-focus`).

| Key                  | Default   | Description                                                          |
| -------------------- | --------- | -------------------------------------------------------------------- |
| `gap`                | `6px`     | The space between the contents (an icon and text, for example)       |
| `color`              | `inherit` | The text color                                                       |
| `backgroundColor`    | `#fff`    | The background color (`#f1f3f5` for `hover`, `#e3e6ea` for `active`) |
| `borderColor`        | `#8a8f98` | The border color                                                     |
| `borderRadius`       | `0.375em` | The corner radius                                                    |
| `paddingX`           | `0.875em` | The horizontal padding                                               |
| `paddingY`           | `0.375em` | The vertical padding                                                 |
| `opacity.disabled`   | `0.5`     | The opacity when `disabled`                                          |
| `outlineColor.focus` | `#2f6fde` | The outline color on keyboard focus                                  |

### `ButtonGroup`

```tsx
<ButtonGroup
  options={[
    { value: 'copy', label: 'Copy' },
    { value: 'delete', label: 'Delete' },
  ]}
  onMainAction={run}
/>
```

A group of buttons laid out from options. It is `withButtonGroup` of react-primitives with the `Button` above. It takes the props of the component created by `withButtonGroup` of react-primitives (`options`, `onMainAction`, and `disabled`) and the following props.

| Property     | Type         | Description                                                                                               |
| ------------ | ------------ | --------------------------------------------------------------------------------------------------------- |
| `direction?` | `'x' \| 'y'` | The direction. `'x'` lays them out in a row and wraps; `'y'` lays them out in a column. Defaults to `'x'` |
| `gap?`       | `number`     | The space between buttons (px). Defaults to `8`                                                           |

- Passes the `value` of the pressed button's option to `onMainAction`. A single `Button` can share the same handler.
- Places the buttons inside a `<div role="group" class="frg-buttongroup">`. Other props are passed to the `<div>`.

### `TextInput`

```tsx
<TextInput value={name} onValueChange={setName} placeholder="Name" />
```

[`TextInput` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `TextInput` of react-primitives (`value`, `defaultValue`, `onValueChange`, `onInputValueChange`, `valueChangeTiming`, `disabled`, `readOnly`, `required`, `invalid`, `type`, and the props of `<input>`). It also takes design values with `design` (the table below).

- By default, it commits on blur and on Enter and calls `onValueChange` (on every input with `valueChangeTiming="input"`). Enter during IME composition does not commit. Escape returns to the committed value.
- It renders `<input class="frg-textinput">`. It has no width; set it with a class or `style`.

The design values you can pass with `design` (the CSS variable is `--frg-textinput-` followed by the key joined with `-`; for example, `placeholder.color` → `--frg-textinput-placeholder-color`).

| Key                  | Default   | Description                                |
| -------------------- | --------- | ------------------------------------------ |
| `color`              | `inherit` | The text color                             |
| `backgroundColor`    | `#fff`    | The background color                       |
| `borderColor`        | `#8a8f98` | The border color (`#d93025` for `invalid`) |
| `borderRadius`       | `0.375em` | The corner radius                          |
| `paddingX`           | `0.625em` | The horizontal padding                     |
| `paddingY`           | `0.375em` | The vertical padding                       |
| `opacity.disabled`   | `0.5`     | The opacity when `disabled`                |
| `outlineColor.focus` | `#2f6fde` | The outline color on keyboard focus        |
| `placeholder.color`  | `#8a8f98` | The color of the `placeholder` text        |

### `Collapsible`

```tsx
<Collapsible summary="Details" open={open} onOpenChange={setOpen}>
  …content…
</Collapsible>
```

[`Collapsible` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Collapsible` of react-primitives (`open`, `defaultOpen`, `onOpenChange`, `disabled`, `summary`, `children`, `partsProps`, and the props of `<details>`). It also takes design values with `design` (the table below).

- It opens and closes with HTML `<details>` and `<summary>`. When find-in-page finds text inside, the browser opens it (and `onOpenChange` is called).
- It renders `<details class="frg-collapsible">` and `<summary class="frg-collapsible-summary">`. It removes the triangle marker that differs by browser, places the marker `<span class="frg-collapsible-indicator">` (›) before the summary text, and turns it down when open. It adds no border or background.

The design values you can pass with `design` (the CSS variable is `--frg-collapsible-` followed by the key joined with `-`; for example, `indicator.color` → `--frg-collapsible-indicator-color`).

| Key                          | Default        | Description                                             |
| ---------------------------- | -------------- | ------------------------------------------------------- |
| `gap`                        | `8px`          | The space between the summary and the content when open |
| `summary.gap`                | `6px`          | The space between the marker and the summary text       |
| `summary.opacity.disabled`   | `0.5`          | The opacity of the summary when `disabled`              |
| `summary.outlineColor.focus` | `#2f6fde`      | The outline color on keyboard focus                     |
| `indicator.color`            | `currentColor` | The color of the marker (›)                             |

### `Table`

```tsx
type Member = { id: string; name: string; age: number };

const columns: TableColumn<Member>[] = [
  {
    key: 'name',
    label: 'Name',
    renderValue: (props) => <TextInput {...props} />,
  },
  { key: 'age', label: 'Age' },
];

<Table value={members} onValueChange={setMembers} columns={columns} />;
```

[`Table` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Table` of react-primitives (`columns`, `value`, `defaultValue`, `onValueChange`, `renderRow`, `partsProps`, and the props of `<table>`). Import the column type (`TableColumn`) from react-primitives as well. It also takes design values with `design` (the table below).

- It takes an array of rows as `value`, and when the value of a cell is committed, reports the changed array and the changed cell (`{ type: 'update', path: [id, key] }`) through `onValueChange`. Rows are identified by `id`.
- A cell whose column has no `renderValue` shows its value as text. The props `renderValue` receives (`value`, `onValueChange`, `aria-labelledby`) can be passed to `TextInput` and `Checkbox` as is.
- It renders `<table class="frg-table">`. It adds borders between rows and padding to cells, and makes headers bold and start-aligned (`text-align: start`). It does not set a width; set one with a class or `style`.

The design values you can pass with `design` (the CSS variable is `--frg-table-` followed by the key joined with `-`; for example, `cell.borderColor` → `--frg-table-cell-borderColor`).

| Key                          | Default       | Description                             |
| ---------------------------- | ------------- | --------------------------------------- |
| `color`                      | `inherit`     | The text color                          |
| `headerCell.paddingX`        | `0.75em`      | The horizontal padding of header cells  |
| `headerCell.paddingY`        | `0.5em`       | The vertical padding of header cells    |
| `headerCell.borderColor`     | `#8a8f98`     | The color of the line under the headers |
| `headerCell.backgroundColor` | `transparent` | The background color of the headers     |
| `headerCell.fontWeight`      | `600`         | The font weight of the headers          |
| `cell.paddingX`              | `0.75em`      | The horizontal padding of cells         |
| `cell.paddingY`              | `0.5em`       | The vertical padding of cells           |
| `cell.borderColor`           | `#d5d8dd`     | The color of the lines between rows     |

### `RecordFields`

```tsx
const fields: RecordField<Member>[] = [
  { key: 'id', label: 'ID' },
  {
    key: 'name',
    label: 'Name',
    renderValue: (props) => <TextInput {...props} />,
  },
  {
    key: 'active',
    label: 'Active',
    renderValue: (props) => <Checkbox {...props} />,
  },
];

<RecordFields value={member} onValueChange={setMember} fields={fields} />;
```

[`RecordFields` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `RecordFields` of react-primitives (`fields`, `value`, `defaultValue`, `onValueChange`, `partsProps`, and the props of `<div>`). Import the field type (`RecordField`) from react-primitives as well. It also takes design values with `design` (the table below).

- It takes a record as `value`, and when the value of a field is committed, reports the changed record and the changed field (`{ type: 'update', path: [key] }`) through `onValueChange`. It has no submission (`<form>`).
- A field without `renderValue` shows its value as text. The props `renderValue` receives can be passed to `TextInput`, `Checkbox`, `RadioGroup`, and so on as is. The array of fields can also be passed to `columns` of `Table` as is.
- It renders the fields vertically inside `<div class="frg-recordfields">`, with each label above its value. Labels are bold. It does not set a width; set one with a class or `style`.

The design values you can pass with `design` (the CSS variable is `--frg-recordfields-` followed by the key joined with `-`; for example, `label.fontWeight` → `--frg-recordfields-label-fontWeight`).

| Key                | Default   | Description                             |
| ------------------ | --------- | --------------------------------------- |
| `gap`              | `12px`    | The space between fields                |
| `field.gap`        | `4px`     | The space between a label and its value |
| `label.color`      | `inherit` | The text color of labels                |
| `label.fontWeight` | `600`     | The font weight of labels               |

### Types

| Type                    | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| `CheckboxGroupProps<V>` | The props of `CheckboxGroup`                                            |
| `RadioGroupProps<V>`    | The props of `RadioGroup`                                               |
| `ButtonGroupProps<V>`   | The props of `ButtonGroup`                                              |
| `CheckboxProps`         | The props of `Checkbox`                                                 |
| `SwitchProps`           | The props of `Switch`                                                   |
| `ButtonProps<V>`        | The props of `Button`                                                   |
| `TextInputProps`        | The props of `TextInput`                                                |
| `CollapsibleProps`      | The props of `Collapsible`                                              |
| `TableProps<R>`         | The props of `Table`                                                    |
| `RecordFieldsProps<T>`  | The props of `RecordFields`                                             |
| `RadioProps`            | The props of the radio buttons inside `RadioGroup` (`partsProps.radio`) |
| `CheckboxDesign`        | The value of `design` of `Checkbox`                                     |
| `SwitchDesign`          | The value of `design` of `Switch`                                       |
| `ButtonDesign`          | The value of `design` of `Button`                                       |
| `TextInputDesign`       | The value of `design` of `TextInput`                                    |
| `CollapsibleDesign`     | The value of `design` of `Collapsible`                                  |
| `TableDesign`           | The value of `design` of `Table`                                        |
| `RecordFieldsDesign`    | The value of `design` of `RecordFields`                                 |
| `RadioDesign`           | The value of `design` of the radio buttons inside `RadioGroup`          |

The design definitions (the keys each component accepts and their states) are exported as the constants `checkboxDesignDefinition`, `switchDesignDefinition`, `buttonDesignDefinition`, `textInputDesignDefinition`, `collapsibleDesignDefinition`, `tableDesignDefinition`, `recordFieldsDesignDefinition`, `radioDesignDefinition` (`DesignDefinition` of react-contract). The default templates used by `create<ComponentName>Design` are exported as the constants `checkboxDesignTemplate`, `switchDesignTemplate`, `buttonDesignTemplate`, `textInputDesignTemplate`, `collapsibleDesignTemplate`, `tableDesignTemplate`, `recordFieldsDesignTemplate`, `radioDesignTemplate` (`DesignTemplate` of react-contract).

## License

MIT
