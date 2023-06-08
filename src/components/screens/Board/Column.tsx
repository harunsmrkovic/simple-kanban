import PlusIcon from 'components/icons/PlusIcon';

// import TaskForm from './TaskForm';

import styles from './Column.module.css';

export type ColumnProps = { title: string };
export default function Column({ title }: ColumnProps) {
  return (
    <section className={styles.column}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button type="button" title="Add task" className={styles.button}>
          <PlusIcon />
        </button>
      </header>
      <div>{/* <TaskForm /> */}</div>
    </section>
  );
}
