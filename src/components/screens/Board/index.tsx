import Column from './Column';

import styles from './index.module.css';

export default function Board() {
  return (
    <div className={styles.board}>
      <Column title="To do" />
      <Column title="In progress" />
      <Column title="Done" />
    </div>
  );
}
