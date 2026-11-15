/**
 * 部品の名前（`displayName`、無ければ関数の名前）を返す。HOC で作った部品の `displayName` に使う
 *
 * @param component 部品
 * @returns 部品の名前。分からなければ `'Component'`
 */
export default function getComponentName(component: unknown): string {
  const { displayName, name } = component as {
    displayName?: string;
    name?: string;
  };
  return displayName ?? (name || 'Component');
}
