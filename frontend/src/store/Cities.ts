import {makeAutoObservable} from "mobx";
import {hotelsAPI} from "../api/api";

type CitiesType = Array<{
    City: string
    Country: string
}> | null

class Cities {
    cities:CitiesType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadCities() {
        hotelsAPI.getCities().then(response => this.cities = response)
    }
}


export default new Cities()