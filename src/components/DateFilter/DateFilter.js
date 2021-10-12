import React from "react";
import './dateFilterStyle.css';
import deleteDateFilterBtn from "../../images/delete.png"

function DateFilter(props) {
    const startDateRef = React.useRef()
    const endDateRef = React.useRef()


    const sortDateItem = () => {
        const startDate = startDateRef.current;
        const endDate = endDateRef.current;

        if(!startDate.value && !endDate.value){
            props.setFilterFunc(() => () => true)
        }else {
          if(startDate.value && endDate.value && startDate.value > endDate.value){
            endDate.value = startDate.value;
          }
          const startDateTime = new Date(startDate.value).getTime()
          const endDateTime = new Date(endDate.value).getTime()
          if(startDateTime && endDateTime) {
            props.setFilterFunc(() => ({ date }) => {
              date = new Date(date).getTime()
              return date >= startDateTime && date <= endDateTime
            })
          }
          else if (startDateTime) props.setFilterFunc(() => ({ date }) => new Date(date).getTime() >= startDateTime)
          else if (endDateTime) props.setFilterFunc(() => ({ date }) => new Date(date).getTime() <= endDateTime)
        }

    }

    const handleRemove = () => {
        startDateRef.current.value = null;
        endDateRef.current.value = null

        props.setFilterFunc(() => () => true)
        props.onModalClose()
    }

    return (
        <div className = {`startDate${props.isOpened ? 'open' : 'close'}`}>
            <div className='sortFilter'>
                <p className='pDate'>c: </p>
                <input
                    ref={startDateRef}
                    id = 'startDate'
                    type = 'date'
                    className='startDateInput'
                />
            </div>
            <div className='endDate'>
                <p className='pDate'>по: </p>
                <input
                    ref={endDateRef}
                    id = 'endDate'
                    type = 'date'
                    className='endDateInput'
                />
            </div>
            <button
                onClick = {sortDateItem}
                className='filterBtn'>
                Фильтровать
            </button>
            <img
                onClick={handleRemove}
                src = {deleteDateFilterBtn}
                alt = ''
                className='deleteDateFilterBtn' />
        </div>
    );
}

export default DateFilter;
