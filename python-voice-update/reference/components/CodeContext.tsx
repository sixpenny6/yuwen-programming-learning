import React, { createContext, useContext, useState } from 'react';

interface CodeContextType {
  currentCode: string;
  setCurrentCode: (code: string) => void;
}

// 创建上下文
const CodeContext = createContext<CodeContextType>({ 
  currentCode: "", 
  setCurrentCode: () => {} 
});

// 提供者组件
export const CodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCode, setCurrentCode] = useState("");

  return (
    <CodeContext.Provider value={{ currentCode, setCurrentCode }}>
      {children}
    </CodeContext.Provider>
  );
};

// 自定义 Hook，方便组件调用
export const useCode = () => useContext(CodeContext);