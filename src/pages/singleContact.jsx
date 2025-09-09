import React, { useEffect, useState } from "react";
import { Link, useParams, } from "react-router-dom";
import agendaServices from "../servicios/agendaServices";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhoneFlip } from "@fortawesome/free-solid-svg-icons";

export const SingleContact = () => {

    const { pId } = useParams();

    const { store } = useGlobalReducer();

    const [post, setPost] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!pId) return;
      store.contacts?.map(contact => {
        if (contact.id === parseInt(pId)) {
          setPost(contact);
           setLoading(false);
        }
      });
    }, []);

    return (
        <div className="container border border-primary rounded shadow-sm p-4 mt-3 bg-secondary text-white">
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <div className="card shadow-lg text-dark p-4 bg-light">
                    <div className="text-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="contact"
                            className="rounded-circle mb-3"
                            width="140"
                            height="140"
                        />
                        <h2 className="card-title ">{post?.name}</h2>
                        <p className="text-muted mb-1"><FontAwesomeIcon icon={faEnvelope}/><strong>Email:</strong> {post?.email}</p>
                        <p className="text-muted mb-1"><FontAwesomeIcon icon={faPhoneFlip} /><strong>Phone:</strong> {post?.phone}</p>
                        <p className="text-muted"><FontAwesomeIcon icon={faLocationDot} /><strong>Address:</strong> {post?.address}</p>
                        <Link to="/contact" className="btn btn-primary mt-3">
                            Back to contacts
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}