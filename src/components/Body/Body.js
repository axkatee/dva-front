import React, {useState} from "react";
import Table from "../Table/Table";
import AddNewTask from "../AddNewTask/AddNewTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import Sort from "../Sort/Sort";
import Header from "../Header/Header";
import { addTask, getTable } from '../api'
let allItems = [];
function Body() {
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

    React.useEffect(() => loadTable(), [sortFunc, filterFunc])

    const newItem = async (item) => {
        const { _id } = await addTask(item)
        setItems([...items, { ...item, _id }].sort(sortFunc).filter(filterFunc))
    }

    const updateTable = (_id, values) => {
        if (values) {
            // const currentItem = items.findIndex(item => item._id === _id)
            // items[currentItem] = { ...values, _id };
            // setItems(items);

            // const oldItems = items;
            // const currentItem = oldItems.findIndex(item => item._id === _id)
            // oldItems[currentItem] = { ...values, _id };
            // setItems(oldItems);


            getTable().then(({ appointments }) => {
                setItems(
                    appointments?.sort(sortFunc).filter(filterFunc)
                );
                allItems = appointments;
            })
        } else {
            setItems(items.filter(item => item._id !== _id))
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Header title = 'Приемы' class = 'exit' />
            <AddNewTask addNewItem={newItem}/>
            <Sort setSortFunc={setSortFunc} setFilterFunc={setFilterFunc} />
            <Table items={items} reloadTable={updateTable} />
            <DeleteTask />
        </div>
    );
}

export default Body;
