import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  if (direction === 'horizontal'){
    resizableProps = {
      className: 'resize-horizontal',
      height : Infinity,
      width : window.innerHeight * .75,
      minConstraints: [window.innerWidth *.2, Infinity],
      maxConstraints: [window.innerWidth *.75, Infinity],
      resizeHandles: ["e"],
    }
  } else {
    resizableProps = {
      height : 300,
      width : Infinity,
      minConstraints : [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      resizeHandles: ["s"],
    }
  }
  return (
    <ResizableBox
     {...resizableProps}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
