import './controls.less';
import classnames from 'classnames';
import { useState } from 'react';
export default function MacControls() {
  const [isFullScreen, setFullScreen] = useState(false);
  return (
    <div className={classnames("mac-controls")}>
      <span onClick={ handleHide } className={classnames('hide')}></span>
      <span onClick={ handleMin } className={classnames('min')}></span>
      <span onClick={ handleMax } className={classnames('max', isFullScreen ? 'full': '')}></span>
    </div>
  );
}