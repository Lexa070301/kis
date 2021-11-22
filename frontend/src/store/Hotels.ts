import {makeAutoObservable, toJS} from "mobx";
import {hotelsAPI} from "../api/api";

export type HotelItemType = {
    Id: number
    Hotel: string
    Address: string
    City: string
    Country: string
}

export type HotelsType = Array<HotelItemType> | null

class Hotels {
    hotels: HotelsType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadHotels() {
        hotelsAPI.getHotels().then(response => this.hotels = response)
    }
}


export default new Hotels()