import React, {useState} from "react";
import './addNewTaskStyle.css';

function AddNewTask(props) {
    const defaultValues = {
        nameValue: '',
        doctorValue: 'Иванов И.И',
        dateValue: '',
        complaintsValue: ''
    }
    const [input, setInput] = useState(defaultValues);
    const [wClass, setWClass] = useState('warnInput-none');
    const [adding, setAdding] = React.useState(false)

    const addItem = (input, setWClass) => {
        const nameValue = input.nameValue;
        const doctorValue = input.doctorValue;
        const dateValue = input.dateValue;
        const complaintsValue = input.complaintsValue;

        if(!nameValue || !doctorValue || !dateValue || !complaintsValue){
            setWClass('warnInput');
            return false;
        }
        setWClass('warnInput-none');

        const addNewEntry = {
            name: nameValue,
            doctor: doctorValue,
            date: dateValue,
            complaint: complaintsValue
        }
        setAdding(true)
        props.addNewItem(addNewEntry).then(() => {
          setInput(defaultValues)
          setAdding(false)
        });
    }

    return (
        <div>
            <p className = {wClass}>
                Заполните все поля!
            </p>
            <div className = "addNewItems">
                <div className = "item">
                    <p>Имя</p>
                    <input
                        type = 'text'
                        value = {input.nameValue}
                        onChange={(e) =>
                            {setInput({...input, nameValue: e.target.value})}}
                    />
                </div>
                <div className = "item">
                    <p>Врач</p>
                    <select
                        value = {input.doctorValue}
                        onChange={(e) =>
                            {setInput({...input, doctorValue: e.target.value})}}
                        className="doctors">
                        <option>Иванов И.И</option>
                        <option>Петров П.П</option>
                        <option>Алексеев А.А</option>
                        <option>Романов Р.Р</option>
                    </select>
                </div>
                <div className = "item">
                    <p>Дата</p>
                    <input
                        value = {input.dateValue}
                        onChange={(e) =>
                            {setInput({...input, dateValue: e.target.value})}}
                        type = 'date'/>
                </div>
                <div className = "item">
                    <p>Жалобы</p>
                    <input
                        value = {input.complaintsValue}
                        onChange={(e) =>
                            {setInput({...input, complaintsValue: e.target.value})}}
                        type = 'text' />
                </div>
                <button
                    onClick = {() => addItem(input, setWClass) }
                    className = 'add'
                    disabled={adding}>
                    Добавить
                </button>
            </div>
        </div>
    );
}

export default AddNewTask;
