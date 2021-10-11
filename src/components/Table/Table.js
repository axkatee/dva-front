import React, {useState} from "react";
import './tableStyle.css';
import editBtn from "../../images/edit.png"
import deleteBtn from "../../images/delete.png"
import EditTask from "../EditTask/EditTask";
import DeleteTask from "../DeleteTask/DeleteTask";

function Table(props) {
    const [editValues, setEditValues] = React.useState({})
    const [modal, setModal] = useState({
        modalEdit: false,
        modalDelete: false,
        deletePopupIssuer: null,
        editPopupIssuer: null
    })

    const handleEdit = elem => () => {
        setModal({ modalEdit: true })
        setEditValues(elem)
    }

    return (
        <div className = "tableItem">
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Врач</th>
                    <th>Дата</th>
                    <th>Жалобы</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {props.items?.map((elem, index) => (
                    <tr key = {index}>
                        <td>{elem.name}</td>
                        <td>{elem.doctor}</td>
                        <td>{elem.date}</td>
                        <td>{elem.complaint}</td>
                        <td className="controlBtn">
                            <img
                                src = {deleteBtn}
                                onClick={() => setModal({modalDelete: true, deletePopupIssuer:elem})}
                                alt = ""
                                className = "deleteBtn"
                            />
                            <img
                                src = {editBtn}
                                onClick={handleEdit(elem)}
                                alt = ""
                                className = "editBtn"
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <EditTask
                onModalClose = {() => setModal({...modal, modalEdit:false})}
                isOpened = {modal.modalEdit}
                editPopupIssuer={modal.editPopupIssuer}
                values={editValues}
                reloadTable={props.reloadTable} />
            <DeleteTask
                onModalClose = {() => setModal({...modal, modalDelete:false})}
                isOpened = {modal.modalDelete}
                deletePopupIssuer={modal.deletePopupIssuer}
                reloadTable={props.reloadTable} />
        </div>
    );
}

export default Table;
