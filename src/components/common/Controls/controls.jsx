import MacControls from './MacControls';
function Controls() {
  const isMac = true;
  return isMac ? <MacControls /> : <WindowsControls />;
}

export default Controls;