import { BoardCard } from '../../../state/types';

interface TaskCardProps {
  boardCard: BoardCard;
}

export const TaskCard = ({ boardCard }: TaskCardProps): JSX.Element => {
  return (
    <div style={{ border: '1px solid black', padding: 2 }}>
      {boardCard.title}
    </div>
  );
};
