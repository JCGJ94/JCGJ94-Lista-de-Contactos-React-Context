import React from "react";

export const Modal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed-top  w-100 h-100 d-flex justify-content-center align-items-start mt-5 bg-dark bg-opacity-50">
      <div className="bg-dark text-ligth rounded shadow p-4" >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">{title}</h5>
          <button type="button" className="btn-close" onClick={onCancel}></button>
        </div>
        <div className="mb-4">
          <p className="mb-0">{message}</p>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};
