export type Language = "c" | "cpp";
export type Stage = "识字" | "组词" | "造句" | "写作";
export interface CourseLesson {
  id: string;
  stage: Stage;
  title: string;
  analogy: string;
  explanation: string;
  code: string;
  steps: [string, string, string, string];
  stdin?: string;
  expectedOutput: string;
  meanings?: Record<string, string>;
  quiz: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
}
export interface Product {
  language: Language;
  name: string;
  appId: string;
  version: string;
  color: string;
}
export type RunnerEvent = {
  runId: string;
  type:
    | "compiling"
    | "running"
    | "stdout"
    | "stderr"
    | "compile-error"
    | "exit"
    | "stopped"
    | "error";
  text?: string;
  code?: number | null;
};
export interface LearningAPI {
  getProduct(): Promise<Product>;
  run(source: string): Promise<{ runId: string }>;
  writeInput(runId: string, text: string): Promise<void>;
  endInput(runId: string): Promise<void>;
  stop(runId: string): Promise<void>;
  onRunnerEvent(callback: (event: RunnerEvent) => void): () => void;
  ai(request: {
    mode: "chat" | "generate" | "explain";
    code?: string;
    message?: string;
    history?: { role: "user" | "assistant"; content: string }[];
  }): Promise<{ content: string }>;
  saveSource(source: string): Promise<{ saved: boolean; path?: string }>;
}
declare global {
  interface Window {
    learning: LearningAPI;
  }
}
