import { useEffect, useRef } from 'react';
import './progress.css';

export function ResetProgressDialog({ close, reset }: { close: () => void; reset: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { dialog.current?.showModal(); }, []);
  return <dialog className="progress-reset-dialog no-print" ref={dialog} aria-labelledby="reset-progress-title" aria-describedby="reset-progress-description" onCancel={close}>
    <h2 id="reset-progress-title">Сбросить прогресс курса?</h2><p id="reset-progress-description">Все отметки «Изучено» и последняя открытая карточка будут удалены.</p>
    <div className="progress-reset-dialog__actions"><button className="button" autoFocus onClick={close}>Отмена</button><button className="button button--primary" onClick={() => { reset(); close(); }}>Сбросить</button></div>
  </dialog>;
}
