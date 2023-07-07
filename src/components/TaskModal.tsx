import { ITask } from '../interfaces';

type Props = {
  data?: ITask;
  close: (value: boolean) => void;
};

const TaskModal: React.FC<Props> = ({ data, close }) => {
  const handleClick = () => {
    close(false);
  };

  return (
    <div>
      <div className='bg' onClick={handleClick}></div>
      <div className='modal'>
        <span className='my-span'>Title:</span>
        <p className='my-p'>{data?.title}</p>
        <span className='my-span' >Description:</span>
        <p className='my-p'>{data?.description}</p>
      </div>
    </div>
  );
};

export default TaskModal;
