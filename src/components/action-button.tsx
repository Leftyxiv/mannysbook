import React from "react";

interface ActionButtonProps {
  icon: string;
  id: string;
  onClick(id: string, direction?: string): void;
  direction?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, id, onClick, direction }) => {
  return (
    <div>
      <button className="button is-info is-small" onClick={() => onClick(id, direction)}>
        <span className="icon">
          <i className={`fas ${icon}`} />
        </span>
      </button>
    </div>
  );
};

export default ActionButton;
