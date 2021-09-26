import {makeAutoObservable} from "mobx";
import {hotelsAPI} from "../api/api";

type CountriesType = Array<{
    id: number
    Name: string
}> | null

class Countries {
    countries:CountriesType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadCountries() {
        hotelsAPI.getCountries().then(response => this.countries = response)
    }
}


export default new Countries()