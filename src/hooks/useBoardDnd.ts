import { DropResult } from '@hello-pangea/dnd';
import { moveBetweenLists, reorderInList } from '../utils/dnd';
import {
  BoardColumn,
  selectColumn,
  updateColumn,
  updateColumns,
} from '../state/boardSlice';
import { useDispatch, useSelector } from 'react-redux';

interface UseBoardDndProps {
  columns: BoardColumn[];
}

export const useBoardDnd = ({ columns }: UseBoardDndProps) => {
  const dispatch = useDispatch();
  const getColumn = useSelector(selectColumn);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    const sourceColumn = getColumn(sourceId)?.cards;
    const destinationColumn = getColumn(destinationId)?.cards;

    if (!sourceColumn || !destinationColumn) return;

    if (sourceId === destinationId) {
      const cards = reorderInList(
        sourceColumn,
        source.index,
        destination.index,
      );

      dispatch(updateColumn({ cards, columnId: sourceId }));

      //   const newState = [...sourceColumn];
      //   newState[sInd] = items;
      //   setState(newState);
    } else {
      const { newSource, newDestination } = moveBetweenLists(
        sourceColumn,
        destinationColumn,
        source,
        destination,
      );

      if (newSource) {
        dispatch(updateColumn({ cards: newSource, columnId: sourceId }));
      }

      if (newDestination) {
        dispatch(
          updateColumn({ cards: newDestination, columnId: destinationId }),
        );
      }
    }
  }

  return { onDragEnd };
};
