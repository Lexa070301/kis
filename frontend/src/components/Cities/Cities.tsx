import classes from "./Cities.module.css";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import {useEffect, useState} from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import City from "../../store/Cities";
import {Loader} from "../common/Loader/Loader";

export const Cities = observer(() => {

    const [render, setRender] = useState(false)

    useEffect(() => {
        async function init() {
            if (!toJS(City.cities))
                await City.loadCities();
            setRender(true)
        }

        init()
    }, []);

    if (render) {

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

        const options: MUIDataTableOptions = {
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
    } else {
        return <Loader/>
    }
});
