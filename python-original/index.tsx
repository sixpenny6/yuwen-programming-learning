import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CodeProvider } from './components/CodeContext'; // [!code ++] 1. 引入 Provider

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* [!code ++] 2. 添加包裹层，打通数据脉络 */}
    <CodeProvider> 
      <App />
    </CodeProvider>
  </React.StrictMode>
);