import "./resizable.css";
import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    const listener = () => {
      setInnerHeight(window.innerHeight)
      setInnerWidth(window.innerWidth)
    };
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width: innerWidth * 0.75,
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
