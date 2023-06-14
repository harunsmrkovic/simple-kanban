import PlusIcon from 'components/icons/PlusIcon';

import styles from './Column.module.css';
import TaskForm from './TaskForm';
import { selectColumn } from '../../../state/boardSlice';
import { useSelector } from 'react-redux';
import { TaskCard } from './TaskCard';

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
        {column.cards.map((card) => (
          <TaskCard boardCard={card} />
        ))}
      </div>
    </section>
  );
}
