import { useState } from "react";
import Tabla from "./Tabla";
import ModalForm from "./ModalForm";
import { CrudProvider } from "../context/CrudContext";

const CrudView = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");

    const openModal = (mode) => {
        setModalMode(mode);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <CrudProvider>
            <button onClick={() => openModal("create")}>Añadir</button>
            <Tabla openModal={openModal} />
            <ModalForm isOpen={modalOpen} closeModal={closeModal} mode={modalMode} />
        </CrudProvider>
    );
};

export default CrudView;
