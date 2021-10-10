import React from "react";
import './deleteStyle.css';
import { deleteTask } from '../api'

const DeleteTask = (props) => {
    const deleteFunc = async () => {
        await deleteTask(props.deletePopupIssuer._id)
        props.reloadTable(props.deletePopupIssuer._id, null)
        props.onModalClose()
    }

    return (
        <div className = {`windowdel${props.isOpened ? 'open' : 'close'}`}>
            <div className = "deleteItems">
                <div className = "titleText">
                    Удалить прием
                </div>
                    <p className='pDelete'>Вы действительно хотите удалить прием?</p>
                <div className = "bottomView">
                    <button
                        onClick={props.onModalClose}
                        className='cancelTaskBtn'>
                        Cancel
                    </button>
                    <button
                        onClick={deleteFunc}
                        className='deleteTaskBtn'>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTask;
