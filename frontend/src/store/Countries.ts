import {makeAutoObservable} from "mobx";
import {hotelsAPI} from "../api/api";

export type CountryItemType = {
    id: number
    Name: string
}

export type CountriesType = Array<CountryItemType> | null

class Countries {
    countries:CountriesType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadCountries() {
        return hotelsAPI.getCountries().then(response => this.countries = response)
    }
}


export default new Countries()