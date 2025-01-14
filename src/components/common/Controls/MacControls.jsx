import './controls.less';
import classnames from 'classnames';
import { useState } from 'react';
export default function MacControls() {
  const [isFullScreen, setFullScreen] = useState(false);
  function handleHide() {
    renderer.cmdAsync('win-hide');
  }
  function handleMin() {
    renderer.cmdAsync('win-minimize');
  }
  function handleMax() {
    renderer.cmdAsync('win-set-full-screen', { flag: !isFullScreen });
    setFullScreen(!isFullScreen);
  }
  return (
    <div className={classnames("mac-controls")}>
      <span onClick={ handleHide } className={classnames('hide', isFullScreen ? 'full': '')}></span>
      <span onClick={ handleMin } className={classnames('min', isFullScreen ? 'full': '')}></span>
      <span onClick={ handleMax } className={classnames('max', isFullScreen ? 'full': '')}></span>
    </div>
  );
}