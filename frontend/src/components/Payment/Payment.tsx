import classes from "./Payment.module.css";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import React, {useEffect, useState} from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import Contracts, {ContractItemType, ContractsType} from "../../store/Contract";
import {form} from "../../store/AddPaymentForm";
import {AddPaymentForm} from "./AddPaymentForm";
import Org, {OrganisationItemType, OrganisationsType} from "../../store/Organisations";
import {Loader} from "../common/Loader/Loader";
import Payments from "../../store/Payments";


export const Payment = observer((props: any) => {

    const [render, setRender] = useState(false)
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        async function init() {
            if (!toJS(Contracts.contracts))
                await Contracts.loadContracts()
            if (!toJS(Payments.payments))
                await Payments.loadPayments()
            if (!toJS(Org.organisations))
                await Org.loadOrganisations()
            if (Payments.currentContract !== '') {
                setIsOpen(true)
            }
            setRender(true)
        }

        init()
    }, []);

    useEffect(() => {
        return () => {
            Payments.currentContract = ''
        };
    }, []);

    if (render) {
        const organizationList: OrganisationsType = toJS(Org.organisations)
        let organizations: Array<any> = []
        if (organizationList)
            organizations = organizationList.map((item: OrganisationItemType) => {
                return {
                    value: item.id,
                    label: item.Title
                }
            })

        const contractList: ContractsType = toJS(Contracts.contracts)
        let contracts: Array<any> | undefined = []
        if (contractList)
            contracts = contractList.filter((item) => item.Status === "active" && item.OrganizationId === Payments.currentOrganization.id).map((item: ContractItemType) => {
                return {
                    value: item.Id,
                    label: "№ " + item.Number + " от " + item.Date
                }
            })


        const columns = [
            {
                name: "Дата и время создания",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "Номер",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "Сумма",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "Оплачен",
                options: {
                    filter: false,
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
                name: "Организация",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "Контракт",
                options: {
                    filter: false,
                    sort: true
                }
            }
        ];


        const data = Payments.payments ?
            Payments.payments.filter((item) => item.Status === "active" || item.Status === "closed").map(item => {
                let status = ""
                switch (item.Status) {
                    case "open":
                        status = "ожидает записи"
                        break
                    case "active":
                        status = "записан"
                        break
                    case "closed":
                        status = "выполнен"
                        break
                }
                return [
                    item.Date,
                    item.Number,
                    item.Sum,
                    item.IsPaid,
                    status,
                    item.Organization,
                    "№ " + item.Contract + " от " + item.ContractDate,
                ]
            }) : [[""]]


        const options: MUIDataTableOptions = {
            pagination: false,
            selectableRows: "none",
            print: false
        }


        return (
            <div>
                <Title text={"Оплаты"}/>
                <div className={classes.table}>
                    {isOpen && <AddPaymentForm
                        form={form}
                        organizations={organizations}
                        contracts={contracts}
                    />}
                    <MUIDataTable
                        title={"Список Оплат"}
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
})
