import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import agendaServices from "../servicios/agendaServices";

export const AddContact = () => {

    const { store, dispatch } = useGlobalReducer();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newContact = await agendaServices.newContact('JoseC', formData);
            if (!newContact) {
                throw new Error('Failed to create contact');
            }
            dispatch({
                type: 'saveContacts',
                payload: { contacts: [...store.contacts, newContact] }
            });
            // Limpiar formulario
            setFormData({ name: "", email: "", phone: "", address: "" });
        } catch (error) {
            console.error("Error al guardar contacto:", error);
        }
    };
    
    return (
        <div className="container bg-secondary text-white rounded p-5">
        <div className="card shadow-sm mx-auto my-5" style={{ maxWidth: "720px" }}>
            <div className="card-body">
                <h3 className="card-title mb-3 text-center">Add new contact</h3>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label fs-5 fw-bold ">Full name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fs-5 fw-bold ">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label fs-5 fw-bold">Phone</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label fs-5 fw-bold">Address</label>
                        <textarea
                            className="form-control"
                            id="address"
                            name="address"
                            rows="2"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="d-flex gap-2 justify-content-end">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        <Link to="/contact" className="btn btn-outline-secondary">
                            Back to contacts
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}