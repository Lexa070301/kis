import {makeAutoObservable} from "mobx";
import {clientsAPI} from "../api/api";

export type StatusItemType = {
    id: number
    Status: string
}

export type StatusesType = Array<StatusItemType> | null

class Statuses {
    statuses:StatusesType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadStatuses() {
        return clientsAPI.getStatuses().then(response => this.statuses = response)
    }
}


export default new Statuses()