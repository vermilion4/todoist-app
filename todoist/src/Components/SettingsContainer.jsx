import Ellipsis from '@iconscout/react-unicons/icons/uil-ellipsis-h';
import Edit from '@iconscout/react-unicons/icons/uil-pen';
import Delete from '@iconscout/react-unicons/icons/uil-trash';

const Settings = ({ component, text, func, id }) => {
  return (
    <li onClick={() => func(id)}>
      {component}
      {text}
    </li>
  );
};

const SettingsContainer = ({ deleteTodo, id, edit }) => {
  const handleClick = (event) => {
    let currentElement = event.currentTarget.parentElement.lastElementChild;

    currentElement.classList.add('show');
    document.addEventListener('click', (e) => {
      if (
        e.target.parentElement.tagName !== 'SPAN' ||
        e.target.parentElement !== event.target.parentElement
      ) {
        currentElement.classList.remove('show');
      }
    });
  };
  return (
    <div className='settings'>
      <span onClick={handleClick}>
        <Ellipsis id='ellipsis' />
      </span>
      <ul className={`task-menu`}>
        <Settings id={id} func={edit} component={<Edit />} text='Edit' />
        <Settings
          func={deleteTodo}
          id={id}
          component={<Delete />}
          text='Delete'
        />
      </ul>
    </div>
  );
};

export default SettingsContainer;
