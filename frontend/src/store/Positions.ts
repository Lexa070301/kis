import {makeAutoObservable} from "mobx";
import {usersAPI} from "../api/api";

export type PositionItemType = {
    id: number
    Title: string
}

export type PositionType = Array<PositionItemType> | null

class Positions {
    positions:PositionType = null

    constructor() {
        makeAutoObservable(this)
    }

    async loadPositions() {
        return usersAPI.getPositions().then(response => this.positions = response)
    }
}


export default new Positions()