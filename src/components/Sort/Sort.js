import React, {useState} from "react";
import plus from "../../images/add.png"
import './sortStyle.css';
import DateFilter from "../DateFilter/DateFilter";

function Sort(props) {
    const [modal, setModal] = useState({
        modalDate: false,
    })
    const [dateInput, setDateInput] = useState({direction: '', sort: ''});

    React.useEffect(() => {
      if(!dateInput.sort) { return props.setSortFunc((a, b) => a) }
      switch(dateInput.sort) {
        case 'name':
          if(dateInput.direction === 'desc') props.setSortFunc(() => (a, b) => b.name.localeCompare(a.name))
          else props.setSortFunc(() => (a, b) => a.name.localeCompare(b.name))
          break

        case 'doctor':
          if(dateInput.direction === 'desc') props.setSortFunc(() => (a, b) => b.doctor.localeCompare(a.doctor))
          else props.setSortFunc(() => (a, b) => a.doctor.localeCompare(b.doctor))
          break

        case 'date':
          if(dateInput.direction === 'desc') props.setSortFunc(() => (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          else props.setSortFunc(() => (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          break

        default:
          props.setSortFunc(() => (a, b) => a)
          break
      }
    }, [dateInput])

    return (
        <div style = {{display: 'flex', flexDirection: 'column'}}>
            <div className = "sortItems">
                <div className='sortFilter'>
                    <p className='pSort'>Сортировать по: </p>
                    <select
                        value = {dateInput.sort}
                        onChange={(e) =>
                            {setDateInput({...dateInput, sort: e.target.value})}}
                        className="sortBy">
                        <option> </option>
                        <option value='name'>Имя</option>
                        <option value='doctor'>Врач</option>
                        <option value='date'>Дата</option>
                    </select>
                </div>
                <div className='direction'>
                    <p className='pSort'>Направление: </p>
                    <select
                        value = {dateInput.direction}
                        onChange={(e) =>
                            {setDateInput({...dateInput, direction: e.target.value})}}
                        className="sortBy">
                        <option> </option>
                        <option value='asc'>По возрастанию</option>
                        <option value='desc'>По убыванию</option>
                    </select>
                </div>
                <div className='dateFilter'>
                    <p className='pSort'>Добавить фильтр по дате: </p>
                    <img
                        onClick={() => setModal({modalDate: true})}
                        src = {plus}
                        alt = ''
                        className='plusBtn'
                    />
                </div>
            </div>
            <DateFilter
                onModalClose = {() => setModal({...modal, modalDate:false})}
                isOpened = {modal.modalDate}
                setFilterFunc={props.setFilterFunc} />
        </div>
    );
}

export default Sort;
