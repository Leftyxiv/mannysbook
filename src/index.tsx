import "bulmaswatch/superhero/bulmaswatch.min.css";

import { useState } from "react";
import ReactDOM from "react-dom";

import Preview from "./components/preview";
import CodeEditor from "./components/code-editor";
import bundle from "./bundler";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    // if the service hasn't been run yet just exit
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor onChange={(value) => setInput(value)} initialValue="const a = 1;" />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
