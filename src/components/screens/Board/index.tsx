import Column from './Column';

import styles from './index.module.css';

export default function Board() {
  return (
    <div className={styles.board}>
      <Column id="todo" title="To do" />
      <Column id="inProgress" title="In progress" />
      <Column id="done" title="Done" />
    </div>
  );
}
