import {makeAutoObservable, toJS} from "mobx";
import {usersAPI} from "../api/api";

export type AgentsItemType = {
        Id: number
        Name: string
        FullName: string
        Email: string
        Office: string
    }

export type AgentsType = Array<AgentsItemType> | null

class Agents {
    agents:AgentsType = null
    currentOrganization = ''

    constructor() {
        makeAutoObservable(this)
    }

    loadAgents() {
        return usersAPI.getAgents().then(response => this.agents = response)
    }

    getCurrentAgents() {
        return toJS(this.agents?.map((item: AgentsItemType) => {
            if(item.Office === this.currentOrganization) {
                return {
                    value: item.Id,
                    label: item.FullName
                }
            }
        }).filter(item => item !== undefined))
    }
}


export default new Agents()