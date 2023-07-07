import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

type Props = {
  addTask: (title: string, description: string) => void;
};

const TaskForm: React.FC<Props> = ({ addTask }) => {
  const [value, setValue] = useState<string>('');
  const [valueTwo, setValueTwo] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() !== '' && valueTwo.trim() !== '') addTask(value, valueTwo);
    setValue('');
    setValueTwo('');
  };

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <div>
        <input type='text' maxLength={22} className='task-input inputs-add' value={value} placeholder='Write a title for your task' required onChange={(e) => setValue(e.target.value)} />
        &nbsp;&nbsp;&nbsp;
        <button type='submit' className={`task-btn success-btn ${ (!value || !valueTwo) ? 'disabled-btn' : '' }`} disabled={!value || !valueTwo}>
          <FontAwesomeIcon icon={faCirclePlus} title='Add a new task' />
        </button>
      </div>
      <textarea rows={4} style={{ resize: 'none' }} maxLength={100} className='task-text-area inputs-add' value={valueTwo} placeholder='Write a description for your task' required onChange={(e) => setValueTwo(e.target.value)} />
    </form>
  );
};

export default TaskForm;
