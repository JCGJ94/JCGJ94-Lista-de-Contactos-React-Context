import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faLocationDot, faEnvelope, faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import agendaServices from "../servicios/agendaServices";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Agenda = ({ onDeleteClick }) => {
  const { store, dispatch } = useGlobalReducer();

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ name: "", email: "", phone: "", address: "" });
  const [storedData, setStoredData] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    if (!store.contacts || store.contacts.length === 0) {
      agendaServices.getUserAgendas("JoseC").then((data) =>
        dispatch({ type: "saveContacts", payload: { contacts: data.contacts } })
      );
    }
  }, []);

  const handelEditContacts = async (id) => {
    if (
      editingData.name === storedData.name &&
      editingData.email === storedData.email &&
      editingData.phone === storedData.phone &&
      editingData.address === storedData.address
    ) {
      setEditingData(storedData);
      setEditingId(null);
      return;
    }
    try {
      const resp = await agendaServices.updateContacts('JoseC', id, editingData);
      if (!resp) throw new Error('Failed to update contact');

      const updatedContacts = store.contacts.map(contact =>
        contact.id === id ? { ...contact, ...editingData } : contact
      );
      dispatch({ type: 'saveContacts', payload: { contacts: updatedContacts } });
      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (el) => {
    setEditingId(el.id);
    setEditingData(el);
    setStoredData(el);
  };

  return (
    <>
      {store.contacts?.map(el => (
        <div className="col-md-6 col-lg-4 col-sm-12 mb-4" key={el.id}>
          <div className="card shadow-sm h-100">
            <div className="card-body text-center ms-1 position-relative">
              <Link className='btn btn-primary float-end' to={`/singleContact/${el.id}`}><FontAwesomeIcon icon={faEye} /></Link>
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt='usuario' className="rounded-circle mb-3 mx-auto" width="120" height="120" />

              {editingId === el.id ? (
                <>
                  <input type="text" className="form-control mb-2" value={editingData.name} onChange={e => setEditingData({ ...editingData, name: e.target.value })} placeholder="Full Name" />
                  <input type="email" className="form-control mb-2" value={editingData.email} onChange={e => setEditingData({ ...editingData, email: e.target.value })} placeholder="Email" />
                  <input type="text" className="form-control mb-2" value={editingData.phone} onChange={e => setEditingData({ ...editingData, phone: e.target.value })} placeholder="Phone" />
                  <input type="text" className="form-control mb-2" value={editingData.address} onChange={e => setEditingData({ ...editingData, address: e.target.value })} placeholder="Address" />
                </>
              ) : (
                <>
                  <h5 className="card-title">{el.name}</h5>
                  <p className="text-muted mb-1"><FontAwesomeIcon icon={faEnvelope} /> {el.email}</p>
                  <p className="text-muted mb-1"><FontAwesomeIcon icon={faPhoneFlip} /> {el.phone}</p>
                  <p className="text-muted"><FontAwesomeIcon icon={faLocationDot} /> {el.address}</p>
                </>
              )}
            </div>
            <div className="card-footer d-flex justify-content-around">
              {editingId === el.id ? (
                <button className="btn btn-sm btn-success p-2" onClick={() => handelEditContacts(el.id)}>Save</button>
              ) : (
                <button className="btn btn-sm btn-warning p-2" onClick={() => handleEdit(el)}>Edit</button>
              )}
              <button className="btn btn-sm btn-danger p-2" onClick={() => onDeleteClick && onDeleteClick(el)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
