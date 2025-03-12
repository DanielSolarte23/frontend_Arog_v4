import { useContext } from "react";
// import { CrudContext } from "../context/CrudContext";

const Tabla = ({ openModal }) => {
    // const { data, setSelectedItem } = useContext(CrudContext);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>
                            <button onClick={() => { setSelectedItem(item); openModal("details"); }}>Detalles</button>
                            <button onClick={() => { setSelectedItem(item); openModal("edit"); }}>Editar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Tabla;
