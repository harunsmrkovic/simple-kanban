import PlusIcon from 'components/icons/PlusIcon';

import styles from './Column.module.css';
import TaskForm from './TaskForm';
import { selectColumn } from '../../../state/boardSlice';
import { useSelector } from 'react-redux';
import { TaskCard } from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';

export type ColumnProps = { id: string; title: string };
export default function Column({ id, title }: ColumnProps) {
  const getColumn = useSelector(selectColumn);
  const column = getColumn(id);

  return (
    <section className={styles.column}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button type="button" title="Add task" className={styles.button}>
          <PlusIcon />
        </button>
      </header>
      <div>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {column?.cards.map((card, index) => (
                <TaskCard key={card.id} boardCard={card} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </section>
  );
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 8,
  width: 250,
});
