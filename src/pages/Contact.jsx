import React, { useState } from "react";
import { Agenda } from "../components/Agenda.jsx";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import agendaServices from "../servicios/agendaServices";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleOpenDeleteModal = (contact) => {
    setContactToDelete(contact);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      agendaServices.deleteContacts("JoseC", contactToDelete.id);
      const updatedContacts = store.contacts.filter(c => c.id !== contactToDelete.id);
      dispatch({ type: "saveContacts", payload: { contacts: updatedContacts } });
      setShowModal(false);
      setContactToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setContactToDelete(null);
  };

  return (
    <div className="container border border-primary rounded shadow-sm p-4 my-3 bg-secondary text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="fs-1 fw-bold mb-3">Contacts Agenda</p>
        <Link to="/addContact" className="btn btn-primary text-white text-decoration-none">Add new contact</Link>
      </div>

      <div className="row g-4 mb-4 rounded text-dark">
        <Agenda onDeleteClick={handleOpenDeleteModal} />
      </div>

      <Modal
        show={showModal}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${contactToDelete?.name}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};
