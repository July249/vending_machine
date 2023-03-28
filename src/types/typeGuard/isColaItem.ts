import type { ColaItem } from '../colaItem';

export const isColaItem = (item: any): item is ColaItem[] => {
  if (!Array.isArray(item)) return false;
  if (item.length === 0) return false;
  if (item[0].name === undefined) return false;
  if (item[0].cost === undefined) return false;
  if (item[0].count === undefined) return false;
  if (item[0].img === undefined) return false;
  return true;
};
