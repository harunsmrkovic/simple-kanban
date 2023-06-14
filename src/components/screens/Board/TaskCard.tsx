import { Draggable, DraggableStyle } from '@hello-pangea/dnd';
import { BoardCard } from '../../../state/types';

interface TaskCardProps {
  boardCard: BoardCard;
  index: number;
}

export const TaskCard = ({ boardCard, index }: TaskCardProps): JSX.Element => {
  const { id, title } = boardCard;
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
          )}
        >
          {title}
        </div>
      )}
    </Draggable>
  );
};

const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: DraggableStyle,
) => ({
  // some basic styles to make the items look a bit nicer
  padding: 8 * 2,
  margin: `0 0 8px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
