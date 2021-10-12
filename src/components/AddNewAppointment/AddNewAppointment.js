import React, {useState} from "react";
import './addNewAppointmentStyle.css';

const defaultValues = {
    nameValue: '',
    doctorValue: 'Иванов И.И',
    dateValue: '',
    complaintsValue: ''
}
function AddNewAppointment(props) {

    const [input, setInput] = useState(defaultValues);
    const [nClass, setNClass] = useState('warnInput-none');
    const [dClass, setDClass] = useState('warnInput-none');
    const [cClass, setCClass] = useState('warnInput-none');
    const [nInput, setNInput] = useState('');
    const [dInput, setDInput] = useState('');
    const [cInput, setCInput] = useState('');
    const [adding, setAdding] = React.useState(false)

    const options = [
         'Иванов И.И' ,
         'Петров П.П',
         'Алексеев А.А',
         'Романов Р.Р'
    ]

    const addItem = (input, setNInput, setDInput, setCInput, setNClass, setDClass, setCClass) => {
        const name = input.nameValue.trim();
        const doctor = input.doctorValue;
        const dateValue = input.dateValue;
        const complaintsValue = input.complaintsValue.trim();

        if(!name && !dateValue && !complaintsValue){
            setDInput('Заполните все поля!')
            setDClass('warnInput');
            setNClass('warnInput-none');
            setCClass('warnInput-none');
            return false;
        }
        if(!name){
            setNInput('Заполните поле имя!')
            setNClass('warnInput');
            return false;
        }else{
            setNClass('warnInput-none');
        }
        if(!dateValue){
            setDInput('Заполните поле дата!')
            setDClass('warnInput');
            return false;
        }else{
            setDClass('warnInput-none');
        }
        if(!complaintsValue){
            setCInput('Заполните поле жалобы!')
            setCClass('warnInput');
            return false;
        }else{
            setCClass('warnInput-none');
        }

        const addNewEntry = {
            name,
            doctor,
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
            <div className = "addNewItems">
                <div className = "item">
                    <p>Имя:</p>
                    <input
                        type = 'text'
                        value = {input.nameValue}
                        onChange={(e) =>
                            {setInput({...input, nameValue: e.target.value})}}
                    />
                    <p className={nClass}>
                        {nInput}
                    </p>
                </div>
                <div className = "item">
                    <p>Врач:</p>
                    <select
                        value = {input.doctorValue}
                        onChange={(e) =>
                            {setInput({...input, doctorValue: e.target.value})}}
                        className="doctors" >
                        {options.map((item, index) =>
                        <option key={index}>{item}</option>
                        )}
                    </select>
                </div>
                <div className = "item">
                    <p>Дата:</p>
                    <input
                        value = {input.dateValue}
                        onChange={(e) =>
                            {setInput({...input, dateValue: e.target.value})}}
                        type = 'date'/>
                    <p className={dClass}>
                        {dInput}
                    </p>
                </div>
                <div className = "item">
                    <p>Жалобы:</p>
                    <input
                        value = {input.complaintsValue}
                        onChange={(e) =>
                            {setInput({...input, complaintsValue: e.target.value})}}
                        type = 'text' />
                    <p className={cClass}>
                        {cInput}
                    </p>
                </div>
                <button
                    onClick = {() => addItem(input, setNInput, setDInput, setCInput, setNClass, setDClass, setCClass) }
                    className = 'add'
                    disabled={adding}>
                    Добавить
                </button>
            </div>
        </div>
    );
}

export default AddNewAppointment;
