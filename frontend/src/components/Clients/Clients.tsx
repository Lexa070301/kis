import classes from "./Clients.module.css";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import {useEffect} from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import Client from "../../store/Clients";

export const Clients = observer(() => {
    useEffect(() => {
        if (!toJS(Client.clients)) Client.loadClients();
    }, []);

    const columns = [
        {
            name: "Имя",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Полное имя",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Пол",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "Дата рождения",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "Место рождения",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "Статус",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "Серия паспорта",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Номер паспорта",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Дата выпуска паспорта",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Окончание действия паспорта",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Место выдачи паспорта",
            options: {
                filter: true,
                sort: true
            }
        }
    ];


    const data = Client.clients ?
        Client.clients.map(item => [
            item.Name,
            item.FullName,
            item.Sex,
            item.DateOfBirth,
            item.PlaceOfBirth,
            item.Status,
            item.Series,
            item.Number,
            item.IssuanceDate,
            item.EndDate,
            item.IssuedAt]) : [[""]]

    const options:MUIDataTableOptions = {
        pagination: false,
        selectableRows: "none",
        print: false
    }

    return (
        <div>
            <Title text={"Клиенты"}/>
            <div className={classes.table}>
                <MUIDataTable
                    title={"Список Клиентов"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    )
});
