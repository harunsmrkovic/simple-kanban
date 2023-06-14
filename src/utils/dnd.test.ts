import { reorderInList, moveBetweenLists } from './dnd';

describe('utils/dnd', () => {
  describe('reorderInList', () => {
    it('reorders items in a list', () => {
      const list = ['a', 'b', 'c', 'd'];
      const startIndex = 1;
      const endIndex = 3;

      const result = reorderInList(list, startIndex, endIndex);

      expect(result).toEqual(['a', 'c', 'd', 'b']);
    });
  });

  describe('moveBetweenLists', () => {
    it('moves an item from one list to another', () => {
      const source = ['a', 'b', 'c', 'd'];
      const destination = ['e', 'f', 'g', 'h'];
      const droppableSource = {
        index: 1,
        droppableId: 'source',
      };
      const droppableDestination = {
        index: 2,
        droppableId: 'destination',
      };

      const result = moveBetweenLists(
        source,
        destination,
        droppableSource,
        droppableDestination,
      );

      expect(result).toEqual({
        newSource: ['a', 'c', 'd'],
        newDestination: ['e', 'f', 'b', 'g', 'h'],
      });
    });
  });
});
