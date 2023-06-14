import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';

import styles from './index.module.css';
import { useBoardDnd } from '../../../hooks/useBoardDnd';
import { useSelector } from 'react-redux';
import { selectAllColumns } from '../../../state/boardSlice';

export default function Board() {
  const columns = useSelector(selectAllColumns);
  const { onDragEnd } = useBoardDnd({ columns });

  return (
    <div className={styles.board}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <Column key={column.id} id={column.id} title={column.name} />
        ))}
      </DragDropContext>
    </div>
  );
}
