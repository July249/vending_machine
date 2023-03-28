import type { ColaItem } from '../colaItem';

export const isColaItem = (item: any): item is ColaItem[] => {
  return item.name !== undefined;
};
