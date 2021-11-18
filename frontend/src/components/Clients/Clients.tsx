import classes from "./Clients.module.css";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import React, {useEffect, useState} from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import Client from "../../store/Clients";
import {form} from "../../store/AddClientForm";
import {AddClientForm} from "./AddClientForm";
import Statuses, {StatusesType, StatusItemType} from "../../store/Statuses";
import {AddEmployeeForm} from "../Employees/AddEmployeeForm";
import EmployeesInstance from "../../store/Employees";
import Positions from "../../store/Positions";
import Org from "../../store/Organisations";
import {Loader} from "../common/Loader/Loader";


export const Clients = observer(() => {

    const [render, setRender] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // if (!toJS(Client.clients)) Client.loadClients().then(()=> {
        //     if (!toJS(Statuses.statuses)) Statuses.loadStatuses().then();
        // });
        async function init() {
            if (!toJS(Client.clients))
                await Client.loadClients()
            if (!toJS(Statuses.statuses))
                await Statuses.loadStatuses()
            setRender(true)
        }

        init()
    }, []);

    if (render) {
        const statusesList: StatusesType = toJS(Statuses.statuses)

        let statuses: Array<any> = []
        if (statusesList)
            statuses = statusesList.map((item: StatusItemType) => {
                return {
                    value: item.id,
                    label: item.Status
                }
            })

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

        const options: MUIDataTableOptions = {
            pagination: false,
            selectableRows: "none",
            print: false
        }

        return (
            <div>
                <Title text={"Клиенты"}/>
                <button className={"common-btn " + classes.addClient__btn} onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                    Новый клиент
                </button>
                <div className={classes.table}>
                    {isOpen && <AddClientForm form={form} statuses={statuses}/>}
                    <MUIDataTable
                        title={"Список Клиентов"}
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
