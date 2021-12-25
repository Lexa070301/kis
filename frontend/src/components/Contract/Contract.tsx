import classes from "./Contract.module.css";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import React, {FC, useEffect, useState} from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import Client, {ClientItemType, ClientsType} from "../../store/Clients";
import Contracts, {ContractsType} from "../../store/Contract";
import {citiesHandlers, form} from "../../store/AddContractForm";
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
import Hotels, {HotelItemType, HotelsType} from "../../store/Hotels";


export const Contract = observer((props: any) => {

    const [render, setRender] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
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
            if (!toJS(Hotels.hotels))
                await Hotels.loadHotels()
            if (Contracts.currentAgreement !== '') {
                await Contracts.setCurrentContract(Number(Contracts.currentAgreement))
                const contract = Contracts.currentContract

                form.$('membersCount').set(contract?.MembersCount)
                form.$('startDate').set(contract?.StartDate)
                form.$('endDate').set(contract?.EndDate)
                if (!contract?.OrganizationId)
                    form.$('organization').reset()
                else
                    form.$('organization').set({value: contract?.OrganizationId, label: contract?.Organization})
                if (!contract?.EmployeeId)
                    form.$('agent').reset()
                else
                    form.$('agent').set({value: contract?.EmployeeId, label: contract?.Employee})
                form.$('client').set({value: contract?.ClientId, label: contract?.Client})
                if(Contracts.currentCountry.id) {
                    form.$('country').set({value: Contracts.currentCountry.id, label: Contracts.currentCountry.Name})
                    if (Contracts.currentCountry.Name !== null) {
                        Cities.currentCountry = Contracts.currentCountry.Name
                    }
                    Contracts.currentCities?.forEach((item, index) => {
                        let number = index + 1
                        form.$('hotels').add(
                            {
                                name: 'hotel' + number,
                                label: 'Отель',
                                rules: 'required',
                                placeholder: 'Выберите отель',
                                output: (hotel:any) => hotel && hotel.value
                            }
                        )
                        form.$('startDates').add(
                            {
                                name: 'startDate' + number,
                                label: 'Дата начала',
                                placeholder: 'Введите дату',
                                rules: 'required|size:10',
                                type: 'date',
                            }
                        )
                        form.$('endDates').add(
                            {
                                name: 'endDate' + number,
                                label: 'Дата окончания',
                                placeholder: 'Введите дату',
                                rules: 'required|size:10',
                                type: 'date',
                            }
                        )
                        form.$('cities').add(
                            {
                                name: 'city' + number,
                                label: 'Город',
                                rules: 'required',
                                handlers: citiesHandlers,
                                placeholder: 'Выберите город',
                                output: (city:any) => city && city.value
                            }
                        )
                        form.$(`cities[city${number}]`).set({value: item.Id, label: item.City})
                    })
                }
                form.$('preliminaryAgreement').set({
                    value: contract?.PreliminaryAgreementId,
                    label: "№ " + contract?.PreliminaryAgreement + " от " + contract?.PreliminaryAgreementDate
                })
                setIsOpen(true)
            }
            setRender(true)
        }

        init()
    }, []);

    useEffect(() => {
        return () => {
            Contracts.currentAgreement = ''
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

        const hotelList: HotelsType = toJS(Hotels.hotels)
        let hotels: Array<any> | undefined = []
        if (hotelList)
            hotels = hotelList.map((item: HotelItemType) => {
                return {
                    value: item.Id,
                    label: item.Hotel
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

        if (Cities.currentCountry !== '') {
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
            Contracts.contracts.filter((item) => item.Status === "active" || item.Status === "closed").map(item => {
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
                <div className={classes.table}>
                    {isOpen && <AddContractForm
                        form={form}
                        organizations={organizations}
                        agents={agents}
                        countries={countries}
                        clients={clients}
                        cities={cities}
                        hotels={hotels}
                        hotelList={hotelList}
                        members={members}
                        preliminaryAgreements={preliminaryAgreements}
                        currentContract={Boolean(Contracts.currentAgreement === '')}
                        currentOrganization={Boolean(Agents.currentOrganization === '')}
                        currentCountry={Boolean(Cities.currentCountry === '')}
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
