/** @format */

import { toastTypes } from '../../utils/Icon';

export type ToastProps = {
  message: string;
  type: keyof typeof toastTypes;
  id?: string;
};

export default function ToastNotification({ id, type, message }: ToastProps) {
  const { icon, iconClass, progressBarClass } = toastTypes[type];

  return (
    <div className='toast' id={id}>
      {/* Added id for reference */}
      <span className={iconClass}>{icon}</span>
      <p className='toast-message'>{message}</p>
      <button className='dismiss-btn'>X</button>

      <div className='toast-progress'>
        <div className={`toast-progress-bar ${progressBarClass}`}></div>
      </div>
    </div>
  );
}
