import {observer} from "mobx-react";
import {Title} from "../common/Title/Title";
import React, {useEffect, useState} from "react";
import classes from "./Currencies.module.css";
import Currency from "../../store/Currencies";
import {documentsAPI} from "../../api/api";
import {toJS} from "mobx";
import {Loader} from "../common/Loader/Loader";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";

export const Currencies = observer(() => {

    const [dateInput, setDateInput] = useState("")
    const [render, setRender] = useState(false)

    useEffect(() => {
        async function init() {
            if (!toJS(Currency.currencies))
                await Currency.loadCurrencies()
            setRender(true)
        }

        init()
    }, []);

    if (render) {
        const loadCurrencies = () => {
            const date = new Date(dateInput)
            let day = ''
            let month = ''
            date.getDate() < 10 ?
                day = '0' + date.getDate() :
                day = String(date.getDate())

            date.getMonth() + 1 < 10 ?
                month = '0' + (date.getMonth() + 1) :
                month = String(date.getMonth() + 1)

            documentsAPI.loadCurrencies(`${day}/${month}/${date.getFullYear()}`)
        }

        const columns = [
            {
                name: "Код",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "Наименование",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "Курс",
                options: {
                    filter: false,
                    sort: true
                }
            },
        ];

        const options: MUIDataTableOptions = {
            pagination: false,
            selectableRows: "none",
            print: false
        }

        console.log(toJS(Currency.currencies))
        const data = Currency.currencies ?
            Currency.currencies.map(item => [
                item.Code,
                item.CurrencyName,
                item.Value]) : [[""]]

        return (
            <div>
                <Title text={"Валюты"}/>
                <div className={classes.form}>
                    <input type="date"
                           className={"common-input"}
                           value={dateInput}
                           onChange={(e) => setDateInput(e.target.value)}/>
                    <button type="button" onClick={loadCurrencies} className={"common-btn"}>
                        Загрузить
                    </button>
                </div>
                <MUIDataTable
                    title={"Список валют"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        )
    } else {
        return <Loader/>
    }
})

export default Currencies