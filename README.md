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

The look is neutral and does not follow any design system. You can adjust it in three ways.

1. **Props**: layout, such as arrangement and spacing (`direction` and `gap` of `CheckboxGroup`, and so on)
2. **CSS variables**: colors, sizes, and so on (see the "CSS variable" table of each component)
3. **CSS classes**: the CSS of the components has zero specificity (`:where()`), so a single class of your own can override any property

```css
.my-checkbox {
  --frg-checkbox-checkedColor: #0a7d4f;
  --frg-checkbox-size: 18px;
}
```

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

[`Checkbox` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Checkbox` of react-primitives (`value`, `defaultValue`, `onValueChange`, `disabled`, `readOnly`, `required`, `invalid`, `indeterminate`, `children`, and `partsProps`).

- Places an `<input type="checkbox" class="frg-checkbox-input">` and `children` inside a `<label class="frg-checkbox">`.
- When `disabled` or `invalid`, it adds `data-disabled` or `data-invalid` to the `<label>`.
- To remove the differences between browsers, the checkbox is drawn with CSS while keeping the `<input>` (`appearance: none`). Keyboard operation and focus are those of the standard `<input>`.

| CSS variable                     | Default   | Description                                                   |
| -------------------------------- | --------- | ------------------------------------------------------------- |
| `--frg-checkbox-gap`             | `6px`     | The space between the checkbox and the label                  |
| `--frg-checkbox-size`            | `1em`     | The size of the checkbox                                      |
| `--frg-checkbox-borderColor`     | `#8a8f98` | The border color                                              |
| `--frg-checkbox-radius`          | `0.25em`  | The corner radius                                             |
| `--frg-checkbox-backgroundColor` | `#fff`    | The background color when unchecked                           |
| `--frg-checkbox-checkedColor`    | `#2f6fde` | The background and border color when checked or indeterminate |
| `--frg-checkbox-invalidColor`    | `#d93025` | The border color when `invalid`                               |
| `--frg-checkbox-focusColor`      | `#2f6fde` | The outline color when focused by keyboard                    |
| `--frg-checkbox-disabledOpacity` | `0.5`     | The opacity when `disabled`                                   |

The check mark is white and cannot be changed with a CSS variable, because it is drawn as a background image. To change it, override `background-image` for `:checked`.

### `Switch`

```tsx
<Switch value={enabled} onValueChange={setEnabled}>
  Receive notifications
</Switch>
```

[`Switch` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Switch` of react-primitives (those of `Checkbox` without `indeterminate`).

- Places an `<input type="checkbox" role="switch" class="frg-switch-input">` and `children` inside a `<label class="frg-switch">`.
- When `disabled` or `invalid`, it adds `data-disabled` or `data-invalid` to the `<label>`.
- The track and the thumb are drawn with the background color and image of the `<input>` (`appearance: none`). No elements are added, so keyboard operation and focus are those of the standard `<input>`. With reduced motion (`prefers-reduced-motion`), the thumb does not animate.
- Pass it to `withCheckboxGroup` of react-primitives to create a group of switches (`withCheckboxGroup({ Checkbox: Switch })`).

| CSS variable                   | Default       | Description                                                   |
| ------------------------------ | ------------- | ------------------------------------------------------------- |
| `--frg-switch-gap`             | `6px`         | The space between the switch and the label                    |
| `--frg-switch-width`           | `2em`         | The width of the switch                                       |
| `--frg-switch-height`          | `1.125em`     | The height of the switch (also decides the size of the thumb) |
| `--frg-switch-trackColor`      | `#b8bdc6`     | The track color when off                                      |
| `--frg-switch-checkedColor`    | `#2f6fde`     | The track color when on                                       |
| `--frg-switch-thumbColor`      | `#fff`        | The thumb color                                               |
| `--frg-switch-borderColor`     | `transparent` | The border color of the track                                 |
| `--frg-switch-invalidColor`    | `#d93025`     | The border color when `invalid`                               |
| `--frg-switch-focusColor`      | `#2f6fde`     | The outline color when focused by keyboard                    |
| `--frg-switch-disabledOpacity` | `0.5`         | The opacity when `disabled`                                   |

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

| CSS variable                 | Default                                                   | Description                                                                             |
| ---------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `--frg-checkboxgroup-indent` | The sum of `--frg-checkbox-size` and `--frg-checkbox-gap` | The indent of the options under "select all" in a column (up to the "select all" label) |

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
- Places `<label class="frg-radio">` with `<input type="radio" class="frg-radio-input">` inside a `<div role="radiogroup" class="frg-radiogroup">`. The Tab key enters the group and the arrow keys select (the browser's standard behavior).
- While `disabled` or `invalid`, the `<label>` gets `data-disabled` or `data-invalid` (`aria-invalid` cannot be set on a radio button, so the invalid look uses the attribute on the `<label>`).
- Other props are passed to the `<div>`.
- For unlisted values, see `useRadioGroup` of react-primitives. To show the selected value with its label, pass the same `value`, `options`, and `unlistedPlacement` to `OptionLabel` of react-primitives.

| CSS variable                  | Default   | Description                                      |
| ----------------------------- | --------- | ------------------------------------------------ |
| `--frg-radio-gap`             | `6px`     | The space between the radio button and the label |
| `--frg-radio-size`            | `1em`     | The size of the radio button                     |
| `--frg-radio-borderColor`     | `#8a8f98` | The border color                                 |
| `--frg-radio-backgroundColor` | `#fff`    | The background color when not selected           |
| `--frg-radio-checkedColor`    | `#2f6fde` | The background and border color when selected    |
| `--frg-radio-invalidColor`    | `#d93025` | The border color when `invalid`                  |
| `--frg-radio-focusColor`      | `#2f6fde` | The outline color when focused by keyboard       |
| `--frg-radio-disabledOpacity` | `0.5`     | The opacity when `disabled`                      |

The dot inside a selected radio button is white and cannot be changed with a CSS variable (it is drawn as a background image). To change it, override `background-image` of `:checked`.

### `Button`

```tsx
<Button value="save" onMainAction={run}>
  Save
</Button>
```

[`Button` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Button` of react-primitives (`value`, `onMainAction`, `disabled`, `type`, and the props of `<button>`).

- When pressed, it passes `value` to `onMainAction` as it is. If `onClick` calls `event.preventDefault()`, `onMainAction` is not called.
- `type` defaults to `'button'` (it does not submit even inside a form).
- It renders `<button class="frg-button">`.

| CSS variable                          | Default   | Description                                             |
| ------------------------------------- | --------- | ------------------------------------------------------- |
| `--frg-button-paddingX`               | `0.875em` | The horizontal padding                                  |
| `--frg-button-paddingY`               | `0.375em` | The vertical padding                                    |
| `--frg-button-gap`                    | `6px`     | The space between the contents (an icon and text, etc.) |
| `--frg-button-borderColor`            | `#8a8f98` | The border color                                        |
| `--frg-button-radius`                 | `0.375em` | The corner radius                                       |
| `--frg-button-backgroundColor`        | `#fff`    | The background color                                    |
| `--frg-button-backgroundColor-hover`  | `#f1f3f5` | The background color while hovered                      |
| `--frg-button-backgroundColor-active` | `#e3e6ea` | The background color while pressed                      |
| `--frg-button-color`                  | `inherit` | The text color                                          |
| `--frg-button-focusColor`             | `#2f6fde` | The outline color when focused by keyboard              |
| `--frg-button-disabledOpacity`        | `0.5`     | The opacity when `disabled`                             |

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

[`TextInput` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `TextInput` of react-primitives (`value`, `defaultValue`, `onValueChange`, `onInputValueChange`, `valueChangeTiming`, `disabled`, `readOnly`, `required`, `invalid`, `type`, and the props of `<input>`).

- By default, it commits on blur and on Enter and calls `onValueChange` (on every input with `valueChangeTiming="input"`). Enter during IME composition does not commit. Escape returns to the committed value.
- It renders `<input class="frg-textinput">`. It has no width; set it with a class or `style`.

| CSS variable                       | Default   | Description                                |
| ---------------------------------- | --------- | ------------------------------------------ |
| `--frg-textinput-paddingX`         | `0.625em` | The horizontal padding                     |
| `--frg-textinput-paddingY`         | `0.375em` | The vertical padding                       |
| `--frg-textinput-borderColor`      | `#8a8f98` | The border color                           |
| `--frg-textinput-radius`           | `0.375em` | The corner radius                          |
| `--frg-textinput-backgroundColor`  | `#fff`    | The background color                       |
| `--frg-textinput-color`            | `inherit` | The text color                             |
| `--frg-textinput-placeholderColor` | `#8a8f98` | The text color of `placeholder`            |
| `--frg-textinput-invalidColor`     | `#d93025` | The border color when `invalid`            |
| `--frg-textinput-focusColor`       | `#2f6fde` | The outline color when focused by keyboard |
| `--frg-textinput-disabledOpacity`  | `0.5`     | The opacity when `disabled`                |

### `Collapsible`

```tsx
<Collapsible summary="Details" open={open} onOpenChange={setOpen}>
  …content…
</Collapsible>
```

[`Collapsible` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Collapsible` of react-primitives (`open`, `defaultOpen`, `onOpenChange`, `disabled`, `summary`, `children`, `partsProps`, and the props of `<details>`).

- It opens and closes with HTML `<details>` and `<summary>`. When find-in-page finds text inside, the browser opens it (and `onOpenChange` is called).
- It renders `<details class="frg-collapsible">` and `<summary class="frg-collapsible-summary">`. It removes the triangle marker that differs by browser, places a CSS-drawn marker (›), and turns it down when open. It adds no border or background.

| CSS variable                        | Default        | Description                                         |
| ----------------------------------- | -------------- | --------------------------------------------------- |
| `--frg-collapsible-gap`             | `6px`          | The space between the marker and the heading        |
| `--frg-collapsible-markerColor`     | `currentColor` | The marker color                                    |
| `--frg-collapsible-contentGap`      | `8px`          | The space between the heading and content when open |
| `--frg-collapsible-focusColor`      | `#2f6fde`      | The outline color when focused by keyboard          |
| `--frg-collapsible-disabledOpacity` | `0.5`          | The opacity of the heading when `disabled`          |

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

[`Table` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Table` of react-primitives (`columns`, `value`, `defaultValue`, `onValueChange`, and the props of `<table>`). Import the column type (`TableColumn`) from react-primitives as well.

- It takes an array of rows as `value`, and when the value of a cell is committed, reports the changed array and the changed cell (`{ type: 'update', path: [id, key] }`) through `onValueChange`. Rows are identified by `id`.
- A cell whose column has no `renderValue` shows its value as text. The props `renderValue` receives (`value`, `onValueChange`, `aria-labelledby`) can be passed to `TextInput` and `Checkbox` as is.
- It renders `<table class="frg-table">`. It adds borders between rows and padding to cells, and makes headers bold and start-aligned (`text-align: start`). It does not set a width; set one with a class or `style`.

| CSS variable                        | Default       | Description                               |
| ----------------------------------- | ------------- | ----------------------------------------- |
| `--frg-table-paddingX`              | `0.75em`      | The horizontal padding of cells           |
| `--frg-table-paddingY`              | `0.5em`       | The vertical padding of cells             |
| `--frg-table-borderColor`           | `#d5d8dd`     | The color of the borders between rows     |
| `--frg-table-color`                 | `inherit`     | The text color                            |
| `--frg-table-headerBorderColor`     | `#8a8f98`     | The color of the border under the headers |
| `--frg-table-headerBackgroundColor` | `transparent` | The background color of the headers       |
| `--frg-table-headerFontWeight`      | `600`         | The font weight of the headers            |

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

[`RecordFields` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `RecordFields` of react-primitives (`fields`, `value`, `defaultValue`, `onValueChange`, and the props of `<div>`). Import the field type (`RecordField`) from react-primitives as well.

- It takes a record as `value`, and when the value of a field is committed, reports the changed record and the changed field (`{ type: 'update', path: [key] }`) through `onValueChange`. It has no submission (`<form>`).
- A field without `renderValue` shows its value as text. The props `renderValue` receives can be passed to `TextInput`, `Checkbox`, `RadioGroup`, and so on as is. The array of fields can also be passed to `columns` of `Table` as is.
- It renders the fields vertically inside `<div class="frg-recordfields">`, with each label above its value. Labels are bold. It does not set a width; set one with a class or `style`.

| CSS variable                         | Default   | Description                         |
| ------------------------------------ | --------- | ----------------------------------- |
| `--frg-recordfields-gap`             | `12px`    | The space between fields            |
| `--frg-recordfields-labelGap`        | `4px`     | The space between a label and value |
| `--frg-recordfields-labelColor`      | `inherit` | The label text color                |
| `--frg-recordfields-labelFontWeight` | `600`     | The font weight of labels           |

### Types

| Type                    | Description                  |
| ----------------------- | ---------------------------- |
| `CheckboxGroupProps<V>` | The props of `CheckboxGroup` |
| `RadioGroupProps<V>`    | The props of `RadioGroup`    |
| `ButtonGroupProps<V>`   | The props of `ButtonGroup`   |

## License

MIT
