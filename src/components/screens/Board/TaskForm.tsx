import { ChangeEvent, FormEvent, useState } from 'react';

import styles from './TaskForm.module.css';
import { Button, ButtonType } from '../../ui/Button';

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
  const [touched, setTouched] = useState(false);
  const [values, setValues] = useState<TaskFormValues>({
    title: '',
    email: '',
    text: '',
  });

  const onValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.title) return;

    setTouched(true);
    onSave(values);
  };

  const onCancelClick = () => {
    if (touched) {
      if (window.confirm('Are you sure you want to cancel?')) {
        onCancel();
      }

      return;
    }

    onCancel();
  };

  return (
    <form onSubmit={onSubmit} className={styles.wrap}>
      <label className={styles.labelSection}>
        <span>Title</span>
        <input className={styles.input} name="title" onChange={onValueChange} />
      </label>
      <label className={styles.labelSection}>
        <span>Email</span>
        <input className={styles.input} name="email" onChange={onValueChange} />
      </label>
      <label className={styles.labelSection}>
        <span>Description</span>
        <textarea
          className={styles.input}
          name="text"
          onChange={onValueChange}
        />
      </label>
      <div className={styles.buttonsWrap}>
        <Button buttonType={ButtonType.Primary} type="submit">
          Save Task
        </Button>
        <Button
          onClick={onCancelClick}
          buttonType={ButtonType.Secondary}
          type="button"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
