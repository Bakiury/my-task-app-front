import { useState } from 'react';
import { ITask } from '../interfaces/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

type Props = {
  data: ITask;
  editTask: (title: string, id: string) => void;
};

const EditTask: React.FC<Props> = ({ editTask, data }) => {
  const [value, setValue] = useState<string>(data.title);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() !== '') editTask(value, data.id);
  };

  return (
    <form className='task-form edit-form' onSubmit={handleSubmit}>
      <input type='text' maxLength={22} className='task-input' value={value} placeholder='Edit task' onChange={(e) => setValue(e.target.value)} />
      <button type='submit' className='task-btn'>
        <FontAwesomeIcon icon={faCheck} size='xl' title='Save change' />
      </button>
    </form>
  );
};

export default EditTask;
