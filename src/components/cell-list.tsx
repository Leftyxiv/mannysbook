import './cell-list.css'
import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";

import { useActions } from '../hooks/use-actions';
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });
  const { fetchCells } = useActions();
  
  useEffect(() => {
    fetchCells()
  }, [])
  
  
  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </React.Fragment>
  ));
  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
