import {makeAutoObservable} from "mobx";
import {documentsAPI} from "../api/api";

export type CurrencyItemType = {
    Id: number
    CurrencyName: string
    Code: number
    Value: number
}

export type CurrencyType = Array<CurrencyItemType> | null

class Currency {
    currencies:CurrencyType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadCurrencies() {
        return documentsAPI.getCurrencies().then((response) => this.currencies = response)
    }

}

export default new Currency()