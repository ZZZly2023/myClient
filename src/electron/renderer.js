const targetNode = document.createElement('div');
targetNode.innerHTML = `This app is using Chrome (v${versions.Chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
document.body.appendChild(targetNode);
