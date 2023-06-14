import { Draggable, DraggableStyle } from '@hello-pangea/dnd';
import { BoardCard } from '../../../state/types';
import md5 from 'md5';

import styles from './TaskCard.module.css';
import { memo } from 'react';

interface TaskCardProps {
  boardCard: BoardCard;
  index: number;
}

export const TaskCard = memo(
  ({ boardCard, index }: TaskCardProps): JSX.Element => {
    const { id, text, title, email } = boardCard;

    return (
      <Draggable key={id} draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            className={styles.cardWrap}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            role="listitem"
            aria-label={title}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
            )}
          >
            <div className={styles.cardHeader}>
              <img
                className={styles.emailImage}
                alt="avatar"
                src={`https://www.gravatar.com/avatar/${md5(email)}?s=24`}
              />
              <h3 className={styles.title}>{title}</h3>
            </div>
            <p className={styles.text}>{text}</p>
          </div>
        )}
      </Draggable>
    );
  },
);

const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: DraggableStyle,
) => ({
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});
