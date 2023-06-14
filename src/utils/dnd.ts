/**
 * Reorders items inside of a single list.
 */

export const reorderInList = <T>(
  list: T[] | null,
  startIndex: number,
  endIndex: number,
): T[] => {
  if (!list) return [];

  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */

interface Droppable {
  index: number;
  droppableId: string;
}

export const moveBetweenLists = <T>(
  source: T[] | null,
  destination: T[] | null,
  droppableSource: Droppable,
  droppableDestination: Droppable,
) => {
  if (!source || !destination) return {};

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  return {
    newSource: sourceClone,
    newDestination: destClone,
  };
};
