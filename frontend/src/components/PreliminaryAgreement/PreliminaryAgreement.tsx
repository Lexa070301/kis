import classes from "./PreliminaryAgreement.module.css";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import React, {useEffect, useState} from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import Client, {ClientItemType, ClientsType} from "../../store/Clients";
import PreliminaryAgreements from "../../store/PreliminaryAgreement";
import {form} from "../../store/AddPreliminaryAgreementForm";
import {AddPreliminaryAgreementForm} from "./AddPreliminaryAgreementForm";
import Org, {OrganisationItemType, OrganisationsType} from "../../store/Organisations";
import Agents, {AgentsItemType, AgentsType} from "../../store/Agents";
import Countries, {CountriesType, CountryItemType} from "../../store/Countries";
import Cities, {CitiesType, CityItemType} from "../../store/Cities";
import {Loader} from "../common/Loader/Loader";


export const PreliminaryAgreement = observer(() => {

    const [isOpen, setIsOpen] = useState(false)
    const [render, setRender] = useState(false)

    useEffect(() => {
        async function init() {
            if (!toJS(PreliminaryAgreements.preliminaryAgreements))
                await PreliminaryAgreements.loadPreliminaryAgreements()
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
            }
        ];


        const data = PreliminaryAgreements.preliminaryAgreements ?
            PreliminaryAgreements.preliminaryAgreements.map(item => [
                item.Date,
                item.Number,
                item.StartDate,
                item.EndDate,
                item.MembersCount,
                item.Employee,
                item.Organization,
                item.Client]) : [[""]]

        const options: MUIDataTableOptions = {
            pagination: false,
            selectableRows: "none",
            print: false
        }

        return (
            <div>
                <Title text={"Предварительные соглашения"}/>
                <button className={"common-btn " + classes.addClient__btn} onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                    Новое предварительное соглашение
                </button>
                <div className={classes.table}>
                    {isOpen && <AddPreliminaryAgreementForm
                        form={form}
                        organizations={organizations}
                        agents={agents}
                        countries={countries}
                        clients={clients}
                        cities={cities}
                        currentOrganization={Boolean(Agents.currentOrganization == '')}
                        currentCountry={Boolean(Cities.currentCity == '')}
                    />}
                    <MUIDataTable
                        title={"Список Предварительных соглашений"}
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
