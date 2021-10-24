import {makeAutoObservable} from "mobx";
import {usersAPI} from "../api/api";

export type OrganisationItemType = {
    id: number
    Title: string
}

export type OrganisationsType = Array<OrganisationItemType> | null

class Organisations {
    organisations:OrganisationsType = null

    constructor() {
        makeAutoObservable(this)
    }

    async loadOrganisations() {
        return usersAPI.getOrganisations().then(response => this.organisations = response)
    }
}


export default new Organisations()