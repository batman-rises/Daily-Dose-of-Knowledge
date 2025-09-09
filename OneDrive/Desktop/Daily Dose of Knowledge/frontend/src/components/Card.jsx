import React from "react";

const Card = ({ title, children, onSave, footer }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="text-gray-700">{children}</div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={onSave}
          className="px-3 py-1 border rounded-md hover:bg-gray-100"
        >
          Save
        </button>
        {footer && <div className="text-sm text-gray-500">{footer}</div>}
      </div>
    </div>
  );
};

export default Card;
