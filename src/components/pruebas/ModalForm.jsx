import { useContext, useState, useEffect } from "react";
import { CrudContext } from "../context/CrudContext";

const ModalForm = ({ isOpen, closeModal, mode }) => {
    const { createItem, updateItem, selectedItem } = useContext(CrudContext);
    const [formData, setFormData] = useState({ nombre: "" });

    useEffect(() => {
        if (mode !== "create" && selectedItem) {
            setFormData(selectedItem);
        } else {
            setFormData({ nombre: "" });
        }
    }, [mode, selectedItem]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "create") createItem(formData);
        if (mode === "edit") updateItem(selectedItem.id, formData);
        closeModal();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{mode === "create" ? "Añadir" : mode === "edit" ? "Editar" : "Detalles"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} readOnly={mode === "details"} />
                    <button type="submit" disabled={mode === "details"}>Guardar</button>
                    <button onClick={closeModal}>Cerrar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
