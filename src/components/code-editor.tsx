import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => {
  return <MonacoEditor theme='dark' language="javascript" height="300px" options={{
    wordWrap: 'on',
    minimap: ,
  }}/>;
};

export default CodeEditor;
