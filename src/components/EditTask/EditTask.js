import React from "react";
import './editStyle.css';
import deepEqual from 'deep-equal'
import { editItem } from '../api'

const EditTask = (props) => {
    const [values, setValues] = React.useState({})
    const { _id, __v, ...formValues } = props.values
    const warnInput = document.getElementById('warnEditInput');

    const options = [
        'Иванов И.И' ,
        'Петров П.П',
        'Алексеев А.А',
        'Романов Р.Р'
    ]

    React.useEffect(() => {
      setValues(formValues)
        // eslint-disable-next-line
    }, [props.values])

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClosePopup = () => {
        props.onModalClose();
    }

    const handleEditItem = () => {
        if(!values.name.trim() || !values.date || !values.complaint.trim()){
            warnInput.className = 'warnEditInput';
            return false;
        }else{
            warnInput.className = 'warnEditInput-none';
        }

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
                        id = "warnEditInput"
                        className='warnEditInput warnEditInput-none'>
                        Заполните все поля!
                    </p>
                    <p className='p'>Имя:</p>
                    <input
                        className='input'
                        type = 'text'
                        value={values.name}
                        name='name'
                        onChange={handleChange} />
                    <p className='p'>Врач</p>
                    <select
                        className="doctor"
                        name='doctor'
                        value={values.doctor}
                        onChange={handleChange}>
                        {options.map((item, index) =>
                            <option key={index}>{item}</option>
                        )}
                    </select>
                    <p className='p'>Дата:</p>
                    <input
                        className='input'
                        type = 'date'
                        name='date'
                        value={values.date}
                        onChange={handleChange}/>
                    <p className='p'>Жалобы: </p>
                    <textarea
                        className="multilineBlock"
                        cols="50"
                        rows="3"
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
