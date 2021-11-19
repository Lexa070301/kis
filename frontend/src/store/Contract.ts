import {makeAutoObservable, toJS} from "mobx";
import {documentsAPI, hotelsAPI} from "../api/api";
import {AgentsItemType} from "./Agents";
import {CountriesType, CountryItemType} from "./Countries";
import {CitiesType} from "./Cities";

export type ContractItemType = {
    Id: number | null
    Date: string | null
    Number: number | null
    StartDate: string | null
    EndDate: string | null
    MembersCount: number | null
    Employee: string | null
    EmployeeId: number | null
    Organization: string | null
    OrganizationId: number | null
    Client: string | null
    ClientId: number | null
    PreliminaryAgreement: number | null
    PreliminaryAgreementId: number | null
    PreliminaryAgreementDate: string | null
    Sum: number | null
    Status: string | null
}

export type ContractsType = Array<ContractItemType> | null

class Contracts {
    contracts: ContractsType = null
    currentAgreement: string = ""
    currentContract: ContractItemType | undefined = {
        Id: null,
        Date: null,
        Number: null,
        StartDate: null,
        EndDate: null,
        MembersCount: null,
        Employee: null,
        EmployeeId: null,
        Organization: null,
        OrganizationId: null,
        Client: null,
        ClientId: null,
        PreliminaryAgreement: null,
        PreliminaryAgreementId: null,
        PreliminaryAgreementDate: null,
        Sum: null,
        Status: null
    }
    currentCountry: CountryItemType = {id: null, Name: null}
    currentCities: CitiesType = []

    constructor() {
        makeAutoObservable(this)
    }

    loadContracts() {
        return documentsAPI.getContracts().then(response => this.contracts = response)
    }

    setCurrentContract(preliminaryAgreementId: number) {
        if (preliminaryAgreementId) {
            return hotelsAPI.getCitiesToVisit(preliminaryAgreementId).then(response => {
                this.currentCountry.id = response[0].CountryId
                this.currentCountry.Name = response[0].Country
                this.currentCities = response.map((item: any) => {
                    return {
                        Id: item.CityId,
                        City: item.City,
                        Country: item.Country
                    }
                })
                this.currentContract = this.contracts?.filter((item) => item.PreliminaryAgreementId === preliminaryAgreementId)[0]
            })
        }
    }
}


export default new Contracts()