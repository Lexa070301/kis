import classes from "./Contract.module.css";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import React, {FC, useEffect, useState} from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import Client, {ClientItemType, ClientsType} from "../../store/Clients";
import Contracts from "../../store/Contract";
import {form} from "../../store/AddContractForm";
import {AddContractForm} from "./AddContractForm";
import Org, {OrganisationItemType, OrganisationsType} from "../../store/Organisations";
import Agents, {AgentsItemType, AgentsType} from "../../store/Agents";
import Countries, {CountriesType, CountryItemType} from "../../store/Countries";
import Cities, {CitiesType, CityItemType} from "../../store/Cities";
import PreliminaryAgreement, {
    PreliminaryAgreementItemType,
    PreliminaryAgreementsType
} from "../../store/PreliminaryAgreement";
import {Loader} from "../common/Loader/Loader";
import PreliminaryAgreements from "../../store/PreliminaryAgreement";


export const Contract = observer((props: any) => {

    const [render, setRender] = useState(false)

    useEffect(() => {
        // if (!toJS(Contracts.contracts)) Contracts.loadContracts().then(() => {
        //     if (!toJS(PreliminaryAgreement.preliminaryAgreements)) PreliminaryAgreement.loadPreliminaryAgreements().then(() => {
        //         if (!toJS(Org.organisations)) Org.loadOrganisations().then(() => {
        //             if (!toJS(Agents.agents)) Agents.loadAgents().then(() => {
        //                 if (!toJS(Countries.countries)) Countries.loadCountries().then(() => {
        //                     if (!toJS(Client.clients)) Client.loadClients().then(() => {
        //                         if (!toJS(Cities.cities)) Cities.loadCities().then(() => {
        //                             if (!Contracts.currentContract?.Id) {
        //                                 Contracts.setCurrentContract(props.currentContract)
        //
        //                                 const contract = Contracts.currentContract
        //                                 form.$('membersCount').set(contract?.MembersCount)
        //                                 form.$('startDate').set(contract?.StartDate)
        //                                 form.$('endDate').set(contract?.EndDate)
        //                                 form.$('organization').set({
        //                                     value: contract?.OrganizationId,
        //                                     label: contract?.Organization
        //                                 })
        //                                 form.$('agent').set({value: contract?.EmployeeId, label: contract?.Employee})
        //                                 form.$('client').set({value: contract?.ClientId, label: contract?.Client})
        //                                 form.$('preliminaryAgreement').set({
        //                                     value: contract?.PreliminaryAgreementId,
        //                                     label: "№ " + contract?.PreliminaryAgreement + " от " + contract?.PreliminaryAgreementDate
        //                                 })
        //                             }
        //                             setRender(true)
        //                         })
        //                     })
        //                 })
        //             })
        //         })
        //     })
        // });
        async function init() {
            if (!toJS(Contracts.contracts))
                await Contracts.loadContracts()
            if (!toJS(PreliminaryAgreement.preliminaryAgreements))
                await PreliminaryAgreement.loadPreliminaryAgreements()
            if (!toJS(Org.organisations))
                await Org.loadOrganisations()
            if (!toJS(Agents.agents))
                await Agents.loadAgents()
            if (!toJS(Countries.countries))
                await Countries.loadCountries()
            if (!toJS(Client.clients))
                await Client.loadClients()
            if (!toJS(Cities.cities))
                await Cities.loadCities()
            if (!Contracts.currentContract?.Id) {
                Contracts.setCurrentContract(props.currentContract)

                const contract = Contracts.currentContract
                form.$('membersCount').set(contract?.MembersCount)
                form.$('startDate').set(contract?.StartDate)
                form.$('endDate').set(contract?.EndDate)
                form.$('organization').set({
                    value: contract?.OrganizationId,
                    label: contract?.Organization
                })
                form.$('agent').set({value: contract?.EmployeeId, label: contract?.Employee})
                form.$('client').set({value: contract?.ClientId, label: contract?.Client})
                form.$('preliminaryAgreement').set({
                    value: contract?.PreliminaryAgreementId,
                    label: "№ " + contract?.PreliminaryAgreement + " от " + contract?.PreliminaryAgreementDate
                })
            }
            setRender(true)
        }

        init()
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


        const clientList: ClientsType = toJS(Client.clients)
        let clients: Array<any> = []
        if (clientList)
            clients = clientList.map((item: ClientItemType) => {
                return {
                    value: item.Id,
                    label: item.FullName
                }
            })

        const cityList: CitiesType = toJS(Cities.cities)
        let cities: Array<any> | undefined = []
        if (cityList)
            cities = cityList.map((item: CityItemType) => {
                return {
                    value: item.Id,
                    label: item.City
                }
            })

        const memberList: ClientsType = toJS(Client.clients)
        let members: Array<any> | undefined = []
        if (memberList)
            members = memberList.map((item: ClientItemType) => {
                return {
                    value: item.Id,
                    label: item.FullName
                }
            })

        const preliminaryAgreementList: PreliminaryAgreementsType = toJS(PreliminaryAgreement.preliminaryAgreements)
        let preliminaryAgreements: Array<any> | undefined = []
        if (preliminaryAgreementList)
            preliminaryAgreements = preliminaryAgreementList.filter((item) => item.Status === "open").map((item: PreliminaryAgreementItemType) => {
                return {
                    value: item.Id,
                    label: "№ " + item.Number + " от " + item.Date
                }
            })


        if (Cities.currentCity !== '') {
            cities = Cities.getCurrentCities()
        }

        const countriesList: CountriesType = toJS(Countries.countries)
        let countries: Array<any> = []
        if (countriesList)
            countries = countriesList.map((item: CountryItemType) => {
                return {
                    value: item.id,
                    label: item.Name
                }
            })

        let agentsList: AgentsType = toJS(Agents.agents)
        let agents: Array<any> | undefined = []
        if (agentsList)
            agents = agentsList.map((item: AgentsItemType) => {
                return {
                    value: item.Id,
                    label: item.FullName
                }
            })

        if (Agents.currentOrganization !== '') {
            agents = Agents.getCurrentAgents()
        }

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
                name: "Дата начала",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "Дата окончания",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "Кол-во участников",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "Сотрудник",
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
                name: "Клиент",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "Предварительное соглашение",
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
                name: "Статус",
                options: {
                    filter: true,
                    sort: true
                }
            }
        ];


        const data = Contracts.contracts ?
            Contracts.contracts.map(item => {
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
                    item.StartDate,
                    item.EndDate,
                    item.MembersCount,
                    item.Employee,
                    item.Organization,
                    item.Client,
                    "№ " + item.PreliminaryAgreement + " от " + item.PreliminaryAgreementDate,
                    item.Sum,
                    status,
                ]
            }) : [[""]]


        const options: MUIDataTableOptions = {
            pagination: false,
            selectableRows: "none",
            print: false
        }

        return (
            <div>
                <Title text={"Договоры"}/>
                {/*<button className={"common-btn " + classes.addClient__btn} onClick={() => {*/}
                {/*    setIsOpen(!isOpen)*/}
                {/*}}>*/}
                {/*    Новое предварительное соглашение*/}
                {/*</button>*/}
                <div className={classes.table}>
                    {props.isOpen && <AddContractForm
                        form={form}
                        organizations={organizations}
                        agents={agents}
                        countries={countries}
                        clients={clients}
                        cities={cities}
                        members={members}
                        preliminaryAgreements={preliminaryAgreements}
                        currentContract={Boolean(Contracts.currentAgreement == '')}
                        currentOrganization={Boolean(Agents.currentOrganization == '')}
                        currentCountry={Boolean(Cities.currentCity == '')}
                    />}
                    <MUIDataTable
                        title={"Список Договоров"}
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
