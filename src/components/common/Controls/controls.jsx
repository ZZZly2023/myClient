import MacControls from './MacControls';
function Controls() {
  const isMac = window.navigator.platform.includes('Mac');
  return isMac ? <MacControls /> : <WindowsControls />;
}

export default Controls;