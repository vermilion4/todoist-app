import SettingsContainer from '../Components/SettingsContainer';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const List = (props) => {
  const {
    todo,
    fetchTodos,
    edit,
    updateTodo,
    isInputDisabled,
    setIsInputDisabled,
  } = props;

  let { id, title, isComplete } = todo;
  let [isTodoCompleted, setIsTodoCompleted] = useState(isComplete);

  const deleteConfirm = (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this todo item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteTodoItem(id),
        },
        {
          label: 'No',
        },
      ],
      overlayClassName: 'delete-modal',
    });
  };

  //delete axios
  const deleteTodoItem = async (id) => {
    axios
      .delete(`/delete/${id}`)
      .then(async () => {
        toast.info('Deleting...');
        await fetchTodos();
        toast.success('Successfully deleted');
      })
      .catch((error) => {
        toast.error('There was a problem');
      });
  };

  return (
    <li className='task'>
      <label htmlFor={id}>
        <input
          onChange={async () => {
            setIsInputDisabled(true);
            await updateTodo(id, title, !isTodoCompleted).then(() =>
              setIsTodoCompleted(!isTodoCompleted)
            );

            fetchTodos();
            setIsInputDisabled(false);
          }}
          type='checkbox'
          id={id}
          checked={isTodoCompleted}
          disabled={isInputDisabled}
        />
        <p className={isTodoCompleted ? 'checked' : ''}>{title}</p>
      </label>
      <SettingsContainer
        id={id}
        edit={edit}
        deleteConfirm={deleteConfirm}
        deleteTodo={deleteTodoItem}
      />
    </li>
  );
};
