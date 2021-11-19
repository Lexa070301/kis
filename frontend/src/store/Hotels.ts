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
    currentCities: Array<string> = []

    constructor() {
        makeAutoObservable(this)
    }

    loadHotels() {
        hotelsAPI.getHotels().then(response => this.hotels = response)
    }

    getCurrentHotels() {
        return toJS(this.hotels?.map((item: HotelItemType) => {
            if (this.currentCities.includes(item.City)) {
                return {
                    value: item.Id,
                    label: item.Hotel
                }
            }
        }).filter(item => item !== undefined))
    }
}


export default new Hotels()