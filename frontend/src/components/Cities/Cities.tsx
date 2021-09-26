import classes from "./Cities.module.css";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import {useEffect} from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import City from "../../store/Cities";

export const Cities = observer(() => {
    useEffect(() => {
        if (!toJS(City.cities)) City.loadCities();
    }, []);

    const columns = [
        {
            name: "Город",
            options: {
                filter: false,
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


    const data = City.cities ?
        City.cities.map(item => [item.City, item.Country]) : [[""]]

    const options:MUIDataTableOptions = {
        pagination: false,
        selectableRows: "none",
        print: false
    }

    return (
        <div>
            <Title text={"Города"}/>
            <div className={classes.table}>
                <MUIDataTable
                    title={"Список Городов"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    )
});
