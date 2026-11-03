import createTsdownConfig from '@fringeworks/dev/createTsdownConfig';

export default createTsdownConfig({
  css: true,
  exports: {
    extraExports: {
      './styles.css': './styles.css',
      // CSS のファイル名は部品の名前を小文字にしたもの。部品のフォルダー名とは違うので、ファイルごとに書く
      './button.css': './Button/styles.css',
      './buttongroup.css': './ButtonGroup/styles.css',
      './checkbox.css': './Checkbox/styles.css',
      './checkboxgroup.css': './CheckboxGroup/styles.css',
      './collapsible.css': './Collapsible/styles.css',
      './radiogroup.css': './RadioGroup/styles.css',
      './textinput.css': './TextInput/styles.css',
    },
  },
});
