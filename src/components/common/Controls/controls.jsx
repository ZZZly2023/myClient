import MacControls from './MacControls';
function Controls() {
  let platform = renderer.sync('get-os-type')
  platform = platform?.toLowerCase()
  if (platform === 'darwin') {
    return <MacControls />
  } else if (platform === 'win32') {
    return <WindowsControls />
  }
}

export default Controls;