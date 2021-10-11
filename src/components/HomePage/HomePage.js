import React, {useState} from "react";
import Table from "../Table/Table";
import AddNewAppointment from "../AddNewAppointment/AddNewAppointment";
import DeleteTask from "../DeleteTask/DeleteTask";
import Sort from "../Sort/Sort";
import Header from "../Header/Header";
import {addTask, getTable} from '../api'

let allItems = [];

function HomePage() {
    const [items, setItems] = useState([]);
    const [sortFunc, setSortFunc] = useState(() => (a, b) => a);
    const [filterFunc, setFilterFunc] = useState(() => item => true);

    const loadTable = () => {
        if (!items.length) {
            getTable().then(({ appointments }) => {
                setItems(
                    appointments?.sort(sortFunc).filter(filterFunc)
                );
                allItems = appointments;
            })
        } else if (items.length < allItems.length) {
            setItems(
                allItems?.sort(sortFunc).filter(filterFunc)
            );
        } else {
            setItems(
                items?.sort(sortFunc).filter(filterFunc)
            )
        }
    }
// eslint-disable-next-line
    React.useEffect(() => loadTable(), [sortFunc, filterFunc])

    const newItem = async (item) => {
        const {_id} = await addTask(item)
        setItems([...items, {...item, _id}].sort(sortFunc).filter(filterFunc))
    }

    const updateTable = (_id, values) => {
        if (!values) {
            setItems(items.filter(item => item._id !== _id));
            return;
        }


        getTable().then(({appointments}) => {
            setItems(
                appointments?.sort(sortFunc).filter(filterFunc)
            );
            allItems = appointments;
        })
    }

    return (
        <div className='all'>
            <Header title='Приемы' class='exit'/>
            <AddNewAppointment addNewItem={newItem}/>
            <Sort setSortFunc={setSortFunc} setFilterFunc={setFilterFunc}/>
            <Table items={items} reloadTable={updateTable}/>
            <DeleteTask/>
        </div>
    );
}

export default HomePage;
