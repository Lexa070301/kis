import {makeAutoObservable, toJS} from "mobx";
import {documentsAPI, hotelsAPI} from "../api/api";
import {AgentsItemType} from "./Agents";
import {CountriesType, CountryItemType} from "./Countries";
import {CitiesType} from "./Cities";
import {OrganisationItemType} from "./Organisations";

export type PaymentItemType = {
    Id: number | null
    Number: number | null
    Date: string | null
    Sum: number | null
    IsPaid: boolean | null
    Status: string | null
    Organization: string | null
    OrganizationId: number | null
    Contract: number | null
    ContractId: number | null
    ContractDate: number | null
}

export type PaymentsType = Array<PaymentItemType> | null

class Payments {
    payments: PaymentsType = null
    currentContract: string = ""
    currentPayment: PaymentItemType | undefined = {
        Id: null,
        Number: null,
        Date: null,
        Sum: null,
        IsPaid: null,
        Status: null,
        Organization: null,
        OrganizationId: null,
        Contract: null,
        ContractId: null,
        ContractDate: null,
    }
    currentOrganization: OrganisationItemType = {id: null, Title: null}

    constructor() {
        makeAutoObservable(this)
    }

    loadPayments() {
        return documentsAPI.getPayments().then(response => this.payments = response)
    }

    setCurrentOrganization(id:number, Title: string) {
        this.currentOrganization = {
            id,
            Title
        }
    }

    setCurrentPayment(contractId: number) {
        if (contractId) {
            return hotelsAPI.getCitiesToVisit(contractId).then(response => {
                this.currentPayment = this.payments?.filter((item) => item.ContractId === contractId)[0]
            })
        }
    }
}


export default new Payments()