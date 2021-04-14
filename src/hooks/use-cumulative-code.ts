import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (id: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const showFunc =  `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    const root = document.getElementById('root')
     var show = (value) => {
       if (typeof value === 'object'){
         if(value.$$typeof && value.props){
          _ReactDOM.render(value, root)
         } else {
           root.innerHTML = JSON.stringify(value);
         }
       } else {
       root.innerHTML = value;
       }
     }
    `
    const showFunNoOp = 'var show = () => {}';
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === id){
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFunNoOp)
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === id) {
        break;
      }
    }
    return cumulativeCode;
  });
}