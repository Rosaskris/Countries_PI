import styles from './alerts.css';

export default function Alert({ title, message, onClose }) {
  return (
    <div className='alert'>
    <div className={'custom-alert-container'}>
      <div className={'custom-alert-message'}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose} className='custom-alert-button'>OK</button>
      </div>
    </div>
    </div>
  );
}