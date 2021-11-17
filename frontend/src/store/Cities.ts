import {makeAutoObservable, toJS} from "mobx";
import {hotelsAPI} from "../api/api";

export type CityItemType = {
    Id: number
    City: string
    Country: string
}

export type CitiesType = Array<CityItemType> | null

class Cities {
    cities:CitiesType = null
    currentCity = ''

    constructor() {
        makeAutoObservable(this)
    }

    loadCities() {
        return hotelsAPI.getCities().then(response => this.cities = response)
    }

    getCurrentCities() {
        return toJS(this.cities?.map((item: CityItemType) => {
            if(item.Country === this.currentCity) {
                return {
                    value: item.Id,
                    label: item.City
                }
            }
        }).filter(item => item !== undefined))
    }
}


export default new Cities()