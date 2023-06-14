export const boardMock = {
  _persist: { version: 0, rehydrated: true },
  columns: [
    {
      id: 'todo',
      name: 'To Do',
      cards: [
        {
          id: '2',
          text: 'Have a call with an Engineering Manager.',
          email: 'hakazvaka@gmail.com',
          title: 'Technical Call 2',
        },
      ],
    },
    {
      id: 'inProgress',
      name: 'In Progress',
      cards: [
        {
          id: '1',
          text: '123',
          email: 'hakazvaka@gmail.com',
          title: 'test 123',
        },
        {
          id: '3',
          text: 'Learn about culture with Simon, from the People Ops team.',
          email: 'hakazvaka@gmail.com',
          title: 'Culture Call',
        },
      ],
    },
    {
      id: 'done',
      name: 'Done',
      cards: [
        { id: '4', text: '123', email: 'hakazvaka@gmail.com', title: 'done 1' },
        { id: '5', text: '123', email: 'hakazvaka@gmail.com', title: 'done 2' },
      ],
    },
  ],
};
