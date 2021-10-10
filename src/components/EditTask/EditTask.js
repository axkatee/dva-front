import React from "react";
import './editStyle.css';
import deepEqual from 'deep-equal'
import { editItem } from '../api'

const EditTask = (props) => {
    const [values, setValues] = React.useState({})
    const { _id, __v, ...formValues } = props.values

    React.useEffect(() => {
      setValues(formValues)
    }, [props.values])

    const handleChange = e => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClosePopup = () => props.onModalClose()

    const handleEditItem = () => {
        const warnInput = document.getElementById('warnEditInput');

        if(Object.values(values).some(value => !value.length)){
            warnInput.className = 'warnEditInput';
            return false;
        }
        warnInput.className = 'warnEditInput-none';

        const noChanges = deepEqual(values, formValues)
        if(noChanges) return handleClosePopup()

        editItem(props.values._id, values).then(() => {
          handleClosePopup()
          props.reloadTable(props.values._id, values)
        })
    }

    return (
        <div className = {`window${props.isOpened ? 'open' : 'close'}`}>
            <div className = "editItems">
                <div className = "titleText">
                    Изменить прием
                </div>
                <div>
                    <p
                        id = 'warnEditInput'
                        className='warnEditInput warnEditInput-none'>
                        Заполните все поля!
                    </p>
                    <p>Имя:</p>
                    <input
                        id = 'nameEditValue'
                        className='input'
                        type = 'text'
                        value={values.name}
                        name='name'
                        onChange={handleChange} />
                    <p>Врач</p>
                    <select
                        id = 'doctorEditValue'
                        className="doctor"
                        name='doctor'
                        value={values.doctor}
                        onChange={handleChange}>
                        <option>Иванов И.И</option>
                        <option>Петров П.П</option>
                        <option>Алексеев А.А</option>
                        <option>Романов Р.Р</option>
                    </select>
                    <p>Дата:</p>
                    <input
                        id = 'dateEditValue'
                        className='input'
                        type = 'date'
                        name='date'
                        value={values.date}
                        onChange={handleChange}/>
                    <p>Жалобы: </p>
                    <textarea
                        id = 'complaintsEditValue'
                        className="multilineBlock"
                        cols="65"
                        rows="4"
                        name='complaint'
                        value={values.complaint}
                        onChange={handleChange}/>
                </div>
                <div className = "bottomView">
                    <button
                        onClick={props.onModalClose}
                        className='cancelBtn'>
                        Cancel
                    </button>
                    <button
                    onClick={handleEditItem}
                        className='saveBtn'>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTask;
