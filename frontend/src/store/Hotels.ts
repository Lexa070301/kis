import {makeAutoObservable} from "mobx";
import {hotelsAPI} from "../api/api";

type HotelsType = Array<{
    Hotel: string
    Address: string
    City: string
    Country: string
}> | null

class Hotels {
    hotels:HotelsType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadHotels() {
        hotelsAPI.getHotels().then(response => this.hotels = response)
    }
}


export default new Hotels()