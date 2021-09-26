import classes from "./Hotels.module.css";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import {useEffect} from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import Hotel from "../../store/Hotels";

export const Hotels = observer(() => {
    useEffect(() => {
        if (!toJS(Hotel.hotels)) Hotel.loadHotels();
    }, []);

    const columns = [
        {
            name: "Отель",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Адрес",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Город",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "Страна",
            options: {
                filter: true,
                sort: true
            }
        }
    ];


    const data = Hotel.hotels ?
        Hotel.hotels.map(item => [item.Hotel, item.Address, item.City, item.Country]) : [[""]]

    const options:MUIDataTableOptions = {
        pagination: false,
        selectableRows: "none",
        print: false
    }

    return (
        <div>
            <Title text={"Отели"}/>
            <div className={classes.table}>
                <MUIDataTable
                    title={"Список Отелей"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    )
});
