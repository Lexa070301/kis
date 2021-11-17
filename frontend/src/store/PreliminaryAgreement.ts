import {makeAutoObservable} from "mobx";
import {documentsAPI} from "../api/api";

export type PreliminaryAgreementItemType = {
    Id: number
    Date: string
    Number: number
    StartDate: string
    EndDate: string
    MembersCount: number
    Employee: string
    Organization: string
    Client: string
    Status: string
}

export type PreliminaryAgreementsType = Array<PreliminaryAgreementItemType> | null

class PreliminaryAgreements {
    preliminaryAgreements: PreliminaryAgreementsType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadPreliminaryAgreements() {
        return documentsAPI.getPreliminaryAgreements().then(response => this.preliminaryAgreements = response)
    }
}


export default
new PreliminaryAgreements()