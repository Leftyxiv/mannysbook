import React from "react";
import { useActions } from "../hooks/use-actions";

import ActionButton from "./action-button";
interface ActionBarProps {
  id: string;
}
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div style={{ display: 'flex' }}>
      <ActionButton onClick={moveCell} direction="up" icon="fa-arrow-up" id={id} />
      <ActionButton onClick={moveCell} direction="down" icon="fa-arrow-down" id={id} />
      <ActionButton onClick={deleteCell} icon="fa-times" id={id} />
      {/* <button className="button is-primary is-small" onClick={() => moveCell(id, "up")}>
        <span className="icon">
          <i className="fas fa-arrow-up" />
        </span>
      </button>
      <button className="button is-primary is-small" onClick={() => moveCell(id, "down")}>
        <span className="icon">
          <i className="fas fa-arrow-down" />
        </span>
      </button>
      <button className="button is-primary is-small" onClick={() => deleteCell(id)}>
        <span className="icon">
          <i className="fas fa-times" />
        </span>
      </button> */}
    </div>
  );
};

export default ActionBar;
