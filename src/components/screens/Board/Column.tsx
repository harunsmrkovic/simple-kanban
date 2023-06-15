import { useState } from 'react';
import PlusIcon from 'components/icons/PlusIcon';

import styles from './Column.module.css';
import { addTask, selectColumn } from '../../../state/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TaskCard } from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import { TaskForm, TaskFormValues } from './TaskForm';

export type ColumnProps = { id: string; title: string };
export default function Column({ id, title }: ColumnProps) {
  const dispatch = useDispatch();

  const getColumn = useSelector(selectColumn);
  const column = getColumn(id);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const onAddToggle = () => setShowTaskForm((show) => !show);

  const onAdd = (value: TaskFormValues) => {
    dispatch(addTask({ columnId: id, card: value }));
    setShowTaskForm(false);
  };

  return (
    <section
      className={styles.column}
      role="list"
      aria-label={`List of ${title} tasks`}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          type="button"
          title="Add task"
          className={styles.button}
          onClick={onAddToggle}
        >
          <PlusIcon />
        </button>
      </header>
      {showTaskForm && <TaskForm onCancel={onAddToggle} onSave={onAdd} />}
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className={styles.cards}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column?.cards.map((card, index) => (
              <TaskCard key={card.id} boardCard={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
