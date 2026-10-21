const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('learning', {
  getProduct: () => ipcRenderer.invoke('learning:product'),
  run: async (source) => {
    const result = await ipcRenderer.invoke('learning:run', source);
    // The renderer receives its runId before compilation can emit its first event.
    setTimeout(() => ipcRenderer.send('learning:start', result.runId), 0);
    return result;
  },
  writeInput: (runId, text) => ipcRenderer.invoke('learning:input', runId, text),
  endInput: (runId) => ipcRenderer.invoke('learning:end-input', runId),
  stop: (runId) => ipcRenderer.invoke('learning:stop', runId),
  onRunnerEvent: (callback) => {
    if (typeof callback !== 'function') return () => {};
    const listener = (_event, value) => callback(value);
    ipcRenderer.on('learning:runner-event', listener);
    return () => ipcRenderer.removeListener('learning:runner-event', listener);
  },
  ai: (request) => ipcRenderer.invoke('learning:ai', request),
  saveSource: (source) => ipcRenderer.invoke('learning:save-source', source),
});
