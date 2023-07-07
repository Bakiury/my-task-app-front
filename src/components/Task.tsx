import { ITask } from '../interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {
  data: ITask;
  toggleCompleted: (id: string) => void;
  viewDetail: (id: string) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => void;
};

const Task: React.FC<Props> = ({ data, toggleCompleted, viewDetail, deleteTask, getTask }) => {
  return (
    <div className='task'>
      <p onClick={() => toggleCompleted(data.id)} className={`${ data.completed ? 'completed' : '' }`}>{data.title}</p>
      <div>
        <FontAwesomeIcon icon={faEye} title='See detail' onClick={() => viewDetail(data.id)} />
        <FontAwesomeIcon icon={faPenToSquare} title='Edit this task' onClick={() => getTask(data.id)} />
        <FontAwesomeIcon icon={faTrash} title='Delete this task' onClick={() => deleteTask(data.id)} />
      </div>
    </div>
  );
};

export default Task;
