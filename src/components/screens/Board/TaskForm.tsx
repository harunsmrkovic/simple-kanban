import { useState } from 'react';

export interface TaskFormValues {
  title: string;
  email: string;
  text: string;
}

interface TaskFormProps {
  onCancel: () => void;
  onSave: (values: TaskFormValues) => void;
}

export const TaskForm = ({ onCancel, onSave }: TaskFormProps) => {
  const [values, setValues] = useState<TaskFormValues>({
    title: '',
    email: '',
    text: '',
  });

  const onValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(values);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Title</span>
        <input name="title" onChange={onValueChange} />
      </label>
      <label>
        <span>Email</span>
        <input name="email" onChange={onValueChange} />
      </label>
      <label>
        <span>Description</span>
        <textarea name="text" onChange={onValueChange} />
      </label>
      <div>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Save task</button>
      </div>
    </form>
  );
};
