
export function makeId(items){
  return items.reduce((result, item) => result + item.id, "");
}
