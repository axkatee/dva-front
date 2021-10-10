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

    let tableMap = props.items?.map(function(elem, index){
        const handleEdit = () => {
          setModal({ modalEdit: true })
          setEditValues(elem)
        }

        return(
            <tr key = {index}
                id="row">
                <td id="name">{elem.name}</td>
                <td id="doctor">{elem.doctor}</td>
                <td id="date">{elem.date}</td>
                <td id="complaints">{elem.complaint}</td>
                <td className="controlBtn">
                    <img
                        src = {deleteBtn}
                        onClick={() => setModal({modalDelete: true, deletePopupIssuer:elem})}
                        alt = ""
                        className = "deleteBtn"
                    />
                    <img
                        src = {editBtn}
                        onClick={handleEdit}
                        alt = ""
                        className = "editBtn"
                    />
                </td>
            </tr>
        )
    })

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
                    {tableMap}
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
