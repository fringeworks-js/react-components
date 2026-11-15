# @fringeworks/react-components

`@fringeworks/react-components` is a library some will find handy, offering React components with a minimal look, ready to use in apps.

**[日本語のREADMEはこちら](./README.ja.md)**

## Installation

```bash
npm install @fringeworks/react-components
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

Design shared across your app can be set once with `withDesign` of [`@fringeworks/react-contract`](https://github.com/fringeworks-js/react-contract). The values set with `withDesign` are passed in the component's `fallbackDesign` prop (you can also pass `fallbackDesign` directly). The `design` given where a component is used wins over the `fallbackDesign` values. Every component has its design definition in a static `designDefinition` property.

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
create<ComponentName>Design(options: Create<ComponentName>DesignOptions): <ComponentName>Design
```

The inputs (`Create<ComponentName>DesignOptions`, an alias of `CreateDesignOptions` of react-contract) are the same as for [`createDesign` of react-contract](https://github.com/fringeworks-js/react-contract): `primaryColor`, `primaryContrastColor`, `errorColor`, `neutralColor`, `radius`, and `scaling`. All are optional. Each function calls `createDesign` with the component's default template (the constant `<componentName>DesignTemplate`). To use a different template, pass your own template to `createDesign`.

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

| Component                               | Description                                                 |
| --------------------------------------- | ----------------------------------------------------------- |
| `Checkbox`                              | A checkbox                                                  |
| `Switch`                                | A switch                                                    |
| `CheckboxGroup`                         | A group of checkboxes laid out from options                 |
| `RadioGroup`                            | A group of radio buttons laid out from options              |
| `withCheckboxIndicator(Indicator)`      | Creates a checkbox with the indicator replaced              |
| `withCheckboxGroupIndicator(Indicator)` | Creates a checkbox group with the indicator replaced        |
| `withRadioGroupIndicator(Indicator)`    | Creates a radio group with the indicator replaced           |
| `withCollapsibleIndicator(Indicator)`   | Creates a collapsible component with the indicator replaced |
| `Button`                                | A button                                                    |
| `withButtonIcon(Icon)`                  | Creates a button that can hold icons                        |
| `ButtonGroup`                           | A group of buttons laid out from options                    |
| `TextInput`                             | A text input                                                |
| `Collapsible`                           | A collapsible component                                     |
| `Table`                                 | A table that takes an array of rows                         |
| `RecordFields`                          | A component that lays out the fields of a record            |

### `Checkbox`

```tsx
<Checkbox value={agreed} onValueChange={setAgreed}>
  I agree to the terms
</Checkbox>
```

[`Checkbox` of react-primitives](https://github.com/fringeworks-js/react-primitives) with a look. It takes the same props as `Checkbox` of react-primitives (`value`, `defaultValue`, `onValueChange`, `disabled`, `readOnly`, `required`, `invalid`, `indeterminate`, `children`, and `partsProps`). It also takes design values with `design` (the table below).

- Places an `<input type="checkbox" class="frg-checkbox-input">`, the indicator `<span class="frg-checkboxindicator frg-checkbox-indicator">`, and `children` inside a `<label class="frg-checkbox">` (`frg-checkbox-indicator` is the base class every indicator gets, and `frg-checkboxindicator` is the class of the default indicator).
- When `disabled` or `invalid`, it adds `data-disabled` or `data-invalid` to the `<label>`.
- To remove the differences between browsers, the `<input>` is visually hidden and the indicator (`Indicator`) draws the checked state. Keyboard operation and focus are those of the standard `<input>` (the focus outline is drawn on the indicator). The indicator can be replaced with `withCheckboxIndicator` ("Replacing the indicator" below).

The design values you can pass with `design` (the CSS variable is `--frg-checkbox-` followed by the key joined with `-`; for example, `indicator.outlineColor.focus` → `--frg-checkbox-indicator-outlineColor-focus`).

| Key                            | Default   | Description                                                                                              |
| ------------------------------ | --------- | -------------------------------------------------------------------------------------------------------- |
| `gap`                          | `6px`     | The space between the indicator and the label                                                            |
| `color`                        | `inherit` | The text color                                                                                           |
| `opacity.disabled`             | `0.5`     | The opacity when `disabled`                                                                              |
| `indicator.size`               | `1em`     | The size of the indicator                                                                                |
| `indicator.scale`              | `1.2`     | The size factor of a replaced indicator (see "Replacing the indicator" below)                            |
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
- Places `<label class="frg-radio">` elements inside a `<div role="radiogroup" class="frg-radiogroup">`. Each `<label>` holds a visually hidden `<input type="radio" class="frg-radio-input">`, the indicator `<span class="frg-radioindicator frg-radio-indicator">`, and the text. The indicator can be replaced with `withRadioGroupIndicator` ("Replacing the indicator" below). The Tab key enters the group and the arrow keys select (the browser's standard behavior).
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
| `indicator.scale`              | `1.2`     | The size factor of a replaced indicator (see "Replacing the indicator" below)        |
| `indicator.borderColor`        | `#8a8f98` | The border color of the indicator (`#2f6fde` for `checked`, `#d93025` for `invalid`) |
| `indicator.backgroundColor`    | `#fff`    | The background color of the indicator (`#2f6fde` for `checked`)                      |
| `indicator.color`              | `#fff`    | The color of the dot when selected (`checked`)                                       |
| `indicator.outlineColor.focus` | `#2f6fde` | The outline color on keyboard focus                                                  |

### Replacing the indicator

`withCheckboxIndicator`, `withCheckboxGroupIndicator`, `withRadioGroupIndicator`, and `withCollapsibleIndicator` create components whose checkbox, radio button, or collapsible indicator (`Indicator`) is replaced, for example with an icon font. Create them once in your app and place them as they are on screens. They take the same props as the original components (`Checkbox`, `CheckboxGroup`, `RadioGroup`, `Collapsible`).

```tsx
import {
  type CheckboxIndicatorSlotProps,
  withCheckboxGroupIndicator,
  withCheckboxIndicator,
} from '@fringeworks/react-components';
import { MaterialSymbolOutlined } from '@fringeworks/react-icon-material-symbols';

// An indicator that picks the icon name from the state. Pass the received className and data-* to the element as they are
function CheckboxSymbol({
  checked,
  indeterminate,
  disabled,
  readOnly,
  invalid,
  ...props
}: CheckboxIndicatorSlotProps) {
  const value = indeterminate
    ? 'indeterminate_check_box'
    : checked
      ? 'check_box'
      : 'check_box_outline_blank';
  return (
    <MaterialSymbolOutlined
      {...props}
      value={value}
      filled={checked || indeterminate}
    />
  );
}

export const AppCheckbox = withCheckboxIndicator(CheckboxSymbol);
export const AppCheckboxGroup = withCheckboxGroupIndicator(CheckboxSymbol);
```

| HOC                                     | Creates                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| `withCheckboxIndicator(Indicator)`      | A `Checkbox` with the indicator replaced                                               |
| `withCheckboxGroupIndicator(Indicator)` | A `CheckboxGroup` whose option and "select all" checkboxes have the indicator replaced |
| `withRadioGroupIndicator(Indicator)`    | A `RadioGroup` whose radio buttons have the indicator replaced                         |
| `withCollapsibleIndicator(Indicator)`   | A `Collapsible` with the open/close indicator replaced                                 |

- The indicator is a component that takes `CheckboxIndicatorSlotProps` or `RadioIndicatorSlotProps` of react-primitives (`checked`, `indeterminate`, `disabled`, `readOnly`, `invalid`, `aria-hidden`) and draws according to the state.
- Besides the state, the indicator receives the base class (`frg-checkbox-indicator` or `frg-radio-indicator`) and the state attributes (`data-checked`, `data-indeterminate`, `data-disabled`, `data-readonly`, `data-invalid`). Pass what it receives to its element. The focus outline and the colors for each state are applied through this class and these attributes.
- The indicator and the text are lined up on the baseline of the text (`align-items: baseline`). react-icon icons come to the middle of the text in any font (see "Size, position and color" in react-icon). When the text wraps, the indicator lines up with the first line. Icons in buttons work the same way.
- A replaced indicator does not get the box of the default indicator (border, background, corner radius). Of `design`, the ones that apply to a replaced indicator are `indicator.color` (the icon color; by default `#8a8f98` when not selected and `#2f6fde` when checked or indeterminate), `indicator.scale` (the icon size: how many times the size that looks the same as the surrounding text, multiplied by the icon set's scale (react-icon's `--frg-icon-glyphScale`); `1.2` by default), `indicator.size` (sets the icon size as a length; when set, `indicator.scale` is not used), and `indicator.outlineColor.focus`. `indicator.borderColor`, `backgroundColor`, and `borderRadius` do not apply.
- The indicator of a collapsible component takes `CollapsibleIndicatorSlotProps` (`open`, `disabled`, `aria-hidden`) and receives the base class `frg-collapsible-indicator` and the state attributes (`data-open`, `data-disabled`). `indicator.color`, `indicator.rotate`, `indicator.scale`, and `indicator.size` of `design` apply. To show open and closed with a single rotating icon like the default indicator, set the angle for the open state with `indicator.rotate` (a replaced indicator is not rotated by default, because the direction of icons differs by set). The indicator can also draw a different icon when open (switching between `keyboard_arrow_right` and `keyboard_arrow_down`, for example).

  ```tsx
  // Turn a right-pointing icon down when open
  function ExpandSymbol({
    open,
    disabled,
    ...props
  }: CollapsibleIndicatorSlotProps) {
    return <MaterialSymbolOutlined {...props} value="keyboard_arrow_right" />;
  }

  export const AppCollapsible = withDesign(
    withCollapsibleIndicator(ExpandSymbol),
    {
      indicator: { rotate: { open: 90 } },
    },
  );
  ```

- They can be wrapped with `withDesign`.

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

| Key                  | Default   | Description                                                                                                                                                                                                                       |
| -------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gap`                | `6px`     | The space between the contents (an icon and text, for example)                                                                                                                                                                    |
| `color`              | `inherit` | The text color                                                                                                                                                                                                                    |
| `backgroundColor`    | `#fff`    | The background color (`#f1f3f5` for `hover`, `#e3e6ea` for `active`)                                                                                                                                                              |
| `borderColor`        | `#8a8f98` | The border color                                                                                                                                                                                                                  |
| `borderRadius`       | `0.375em` | The corner radius                                                                                                                                                                                                                 |
| `paddingX`           | `0.875em` | The horizontal padding                                                                                                                                                                                                            |
| `paddingY`           | `0.375em` | The vertical padding                                                                                                                                                                                                              |
| `opacity.disabled`   | `0.5`     | The opacity when `disabled`                                                                                                                                                                                                       |
| `outlineColor.focus` | `#2f6fde` | The outline color on keyboard focus                                                                                                                                                                                               |
| `icon.scale`         | `1.12`    | The size of the icons placed with `withButtonIcon`: how many times the size that looks the same as the surrounding text, multiplied by the icon set's scale (react-icon's `--frg-icon-glyphScale`; `1.4em` with Material Symbols) |

### `withButtonIcon`

```ts
withButtonIcon<I extends IconComponent>(Icon: I): ButtonWithIconComponent<I>
```

Creates a button that can hold icons, with an icon component built in. Decide the icon set once in your app, and pass only names where it is used.

```tsx
import { withButtonIcon } from '@fringeworks/react-components';
import { MaterialSymbolOutlined } from '@fringeworks/react-icon-material-symbols';

// Create it once in your app
export const IconButton = withButtonIcon(MaterialSymbolOutlined);

// On screens, pass only names
<IconButton icon="save" onMainAction={save}>
  Save
</IconButton>;
```

| Parameter | Type            | Description                                                                                                                                                                            |
| --------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Icon`    | `IconComponent` | The icon component (a type from `@fringeworks/react-contract`). One that takes the icon name in `value`; every component of `@fringeworks/react-icon` and its adapters can be built in |

The created button takes the same props as `Button` (including `design`), plus the following.

| Property           | Type                                               | Description                                                                                                                         |
| ------------------ | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `icon?`            | The type of `value` of `Icon`                      | The name of the icon placed before the content                                                                                      |
| `endIcon?`         | The type of `value` of `Icon`                      | The name of the icon placed after the content                                                                                       |
| `partsProps.icon?` | The props of `Icon` (except `value`) or a function | Props passed to the icons. A value applies to both icons; a function decides them per placement (`{ placement: 'start' \| 'end' }`) |

- The space between the icon and the text is `gap` of `design`. The icon follows the button's text size (for react-icon components).
- Only `value` is passed to the icon. Give an icon-only button an `aria-label`.
- If you build in a component made by `createPrefixedIcon` (`@fringeworks/react-icon`), you can pick from several sets by name, such as `icon="ms:save"`.
- It can be wrapped with `withDesign` (its `designDefinition` is the same as `Button`'s).

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
- It renders `<details class="frg-collapsible">` and `<summary class="frg-collapsible-summary">`. It removes the triangle marker that differs by browser, places the marker `<span class="frg-collapsibleindicator frg-collapsible-indicator">` (›) before the summary text, and turns it down when open. The marker can be replaced with `withCollapsibleIndicator` ("Replacing the indicator" above). It adds no border or background.

The design values you can pass with `design` (the CSS variable is `--frg-collapsible-` followed by the key joined with `-`; for example, `indicator.color` → `--frg-collapsible-indicator-color`).

| Key                          | Default                                    | Description                                                                                                                               |
| ---------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `gap`                        | `8px`                                      | The space between the summary and the content when open                                                                                   |
| `summary.gap`                | `6px`                                      | The space between the marker and the summary text                                                                                         |
| `summary.opacity.disabled`   | `0.5`                                      | The opacity of the summary when `disabled`                                                                                                |
| `summary.outlineColor.focus` | `#2f6fde`                                  | The outline color on keyboard focus                                                                                                       |
| `indicator.color`            | `currentColor`                             | The color of the marker (›)                                                                                                               |
| `indicator.rotate`           | `-45deg` (`0deg` for a replaced indicator) | The rotation angle of the marker (numbers are deg). `open` is the angle when open (`45deg` by default, `0deg` for a replaced indicator)   |
| `indicator.size`             | `1em`                                      | The size of the marker. For a replaced indicator, setting it fixes the size                                                               |
| `indicator.scale`            | `1.2`                                      | The size of a replaced indicator: how many times the size that looks the same as the surrounding text, multiplied by the icon set's scale |

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

| Type                                 | Description                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `CheckboxGroupProps<V, I>`           | The props of `CheckboxGroup` (`I` is the checkbox indicator)                                                                    |
| `RadioGroupProps<V, I>`              | The props of `RadioGroup` (`I` is the radio button indicator)                                                                   |
| `ButtonGroupProps<V>`                | The props of `ButtonGroup`                                                                                                      |
| `CheckboxProps<I>`                   | The props of `Checkbox` (`I` is the indicator; the given one for checkboxes created by `withCheckboxIndicator`)                 |
| `CheckboxComponent<I>`               | A checkbox with a look (`Checkbox`, or one created by `withCheckboxIndicator`)                                                  |
| `CheckboxGroupComponent<I>`          | A checkbox group with a look (`CheckboxGroup`, or one created by `withCheckboxGroupIndicator`)                                  |
| `RadioGroupComponent<I>`             | A radio group with a look (`RadioGroup`, or one created by `withRadioGroupIndicator`)                                           |
| `CheckboxIndicatorComponent`         | A component that can be built in as the checkbox indicator (passed to `withCheckboxIndicator` and `withCheckboxGroupIndicator`) |
| `RadioIndicatorComponent`            | A component that can be built in as the radio button indicator (passed to `withRadioGroupIndicator`)                            |
| `CheckboxIndicatorSlotProps`         | The state the checkbox indicator receives (a type from `@fringeworks/react-primitives`)                                         |
| `RadioIndicatorSlotProps`            | The state the radio button indicator receives (a type from `@fringeworks/react-primitives`)                                     |
| `SwitchProps`                        | The props of `Switch`                                                                                                           |
| `ButtonProps<V, P>`                  | The props of `Button` (`P` is the built-in parts; `{ Icon }` for buttons created by `withButtonIcon`)                           |
| `ButtonWithIconComponent<I>`         | A button that can hold icons, created by `withButtonIcon`                                                                       |
| `ButtonIconValue<P>`                 | The type of `icon` and `endIcon` of buttons created by `withButtonIcon` (a type from `@fringeworks/react-primitives`)           |
| `IconComponent`                      | The icon component passed to `withButtonIcon` (a type from `@fringeworks/react-contract`)                                       |
| `TextInputProps`                     | The props of `TextInput`                                                                                                        |
| `CollapsibleProps<I>`                | The props of `Collapsible` (`I` is the open/close indicator)                                                                    |
| `CollapsibleComponent<I>`            | A collapsible component with a look (`Collapsible`, or one created by `withCollapsibleIndicator`)                               |
| `CollapsibleIndicatorComponent`      | A component that can be built in as the open/close indicator (passed to `withCollapsibleIndicator`)                             |
| `CollapsibleIndicatorSlotProps`      | The state the open/close indicator receives (a type from `@fringeworks/react-primitives`)                                       |
| `TableProps<R>`                      | The props of `Table`                                                                                                            |
| `RecordFieldsProps<T>`               | The props of `RecordFields`                                                                                                     |
| `RadioProps`                         | The props of the radio buttons inside `RadioGroup` (`partsProps.radio`)                                                         |
| `CheckboxDesign`                     | The value of `design` of `Checkbox`                                                                                             |
| `SwitchDesign`                       | The value of `design` of `Switch`                                                                                               |
| `ButtonDesign`                       | The value of `design` of `Button`                                                                                               |
| `TextInputDesign`                    | The value of `design` of `TextInput`                                                                                            |
| `CollapsibleDesign`                  | The value of `design` of `Collapsible`                                                                                          |
| `TableDesign`                        | The value of `design` of `Table`                                                                                                |
| `RecordFieldsDesign`                 | The value of `design` of `RecordFields`                                                                                         |
| `RadioDesign`                        | The value of `design` of the radio buttons inside `RadioGroup`                                                                  |
| `Create<ComponentName>DesignOptions` | Options of `create<ComponentName>Design` (the same as `CreateDesignOptions` of react-contract)                                  |
| `DesignDefinition`                   | The design definition of a component (the type of `<componentName>DesignDefinition`) (a type of `@fringeworks/react-contract`)  |
| `DesignPartDefinition`               | The properties the root or a part takes and the states that apply (a type of `@fringeworks/react-contract`)                     |
| `DesignTemplate<D, O>`               | A design template (the type of `<componentName>DesignTemplate`) (a type of `@fringeworks/react-contract`)                       |
| `DesignColorSpec<K>`                 | A spec that makes a color (data that can be JSON) (a type of `@fringeworks/react-contract`)                                     |
| `DesignColorFunction<O>`             | A function that takes the inputs and returns a color (written in a template) (a type of `@fringeworks/react-contract`)          |
| `DesignLengthSpec<K>`                | A spec that makes a length (data that can be JSON) (a type of `@fringeworks/react-contract`)                                    |
| `DesignLengthFunction<O>`            | A function that takes the inputs and returns a length (written in a template) (a type of `@fringeworks/react-contract`)         |
| `DesignValue<T, S>`                  | A design value (one value or an object per state) (a type of `@fringeworks/react-contract`)                                     |
| `DesignState`                        | The states that design values are split by (a type of `@fringeworks/react-contract`)                                            |
| `DesignPropertyValues`               | Design properties and the types of values they take (a type of `@fringeworks/react-contract`)                                   |
| `Option<V>`                          | An option (`value`, `label?`, `disabled?`) (a type of `@fringeworks/react-contract`)                                            |
| `DisplayOption<V>`                   | An option to show (the argument of the functions in `partsProps`) (a type of `@fringeworks/react-contract`)                     |
| `UnlistedPlacement`                  | Where to show unlisted values (`'hidden'`, `'start'`, `'end'`) (a type of `@fringeworks/react-contract`)                        |
| `TableColumn<R>`                     | A column of `Table` (a type of `@fringeworks/react-primitives`)                                                                 |
| `TableAlign`                         | The alignment of a column (a type of `@fringeworks/react-primitives`)                                                           |
| `TableRowId`                         | The id of a row (a type of `@fringeworks/react-primitives`)                                                                     |
| `TableRowContext<R>`                 | Information about a row that the functions in `partsProps` and `renderRow` receive (a type of `@fringeworks/react-primitives`)  |
| `TableCellContext<R, V>`             | Information about a cell that the functions in `partsProps` receive (a type of `@fringeworks/react-primitives`)                 |
| `TableHeaderCellContext<R>`          | Information about a header cell that the functions in `partsProps` receive (a type of `@fringeworks/react-primitives`)          |
| `TableCellElementProps`              | Props passed to the cell elements of a column (a type of `@fringeworks/react-primitives`)                                       |
| `TableHeaderCellProps`               | Props passed to the header cell element of a column (a type of `@fringeworks/react-primitives`)                                 |
| `TableRenderRowProps<P>`             | Props that `renderRow` receives (a type of `@fringeworks/react-primitives`)                                                     |
| `TableValueChangeDetails`            | Details of `onValueChange` of `Table` (a type of `@fringeworks/react-primitives`)                                               |
| `RecordField<T>`                     | A field of `RecordFields` (a type of `@fringeworks/react-primitives`)                                                           |
| `RecordFieldContext<T>`              | Information about a field that the functions in `partsProps` receive (a type of `@fringeworks/react-primitives`)                |
| `FieldValueContext<T>`               | Information that the functions rendering the value of a field or column receive (a type of `@fringeworks/react-primitives`)     |
| `FieldValueProps<V>`                 | Props that the component rendering the value of a field or column receives (a type of `@fringeworks/react-primitives`)          |
| `RecordFieldsValueChangeDetails`     | Details of `onValueChange` of `RecordFields` (a type of `@fringeworks/react-primitives`)                                        |
| `TextInputType`                      | The values of `type` of `TextInput` (a type of `@fringeworks/react-primitives`)                                                 |
| `ValueChangeTiming`                  | When `TextInput` commits the value (`'commit'`, `'input'`) (a type of `@fringeworks/react-primitives`)                          |

The design definitions (the keys each component accepts and their states) are exported as the constants `checkboxDesignDefinition`, `switchDesignDefinition`, `buttonDesignDefinition`, `textInputDesignDefinition`, `collapsibleDesignDefinition`, `tableDesignDefinition`, `recordFieldsDesignDefinition`, `radioDesignDefinition` (`DesignDefinition` of react-contract). The default templates used by `create<ComponentName>Design` are exported as the constants `checkboxDesignTemplate`, `switchDesignTemplate`, `buttonDesignTemplate`, `textInputDesignTemplate`, `collapsibleDesignTemplate`, `tableDesignTemplate`, `recordFieldsDesignTemplate`, `radioDesignTemplate` (`DesignTemplate` of react-contract).

## License

MIT
