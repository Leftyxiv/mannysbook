import './action-bar.css'
import React from "react";
import { useActions } from "../hooks/use-actions";

import ActionButton from "./action-button";
interface ActionBarProps {
  id: string;
}
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className='action-bar' style={{ display: 'flex' }}>
      <ActionButton onClick={moveCell} direction="up" icon="fa-arrow-up" id={id} />
      <ActionButton onClick={moveCell} direction="down" icon="fa-arrow-down" id={id} />
      <ActionButton onClick={deleteCell} icon="fa-times" id={id} />
    </div>
  );
};

export default ActionBar;
