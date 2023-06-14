import Header from './layout/Header';
import Board from './screens/Board';

import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.wrap}>
      <Header />
      <Board />
    </div>
  );
}
