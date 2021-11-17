import {makeAutoObservable} from "mobx";
import {clientsAPI} from "../api/api";

export type ClientItemType = {
    Id: Number
    Name: string
    FullName: string
    Sex: string
    DateOfBirth: string
    PlaceOfBirth: string
    Status: string
    Series: number
    Number: number
    IssuanceDate: string
    EndDate: string
    IssuedAt: string
}

export type ClientsType = Array<ClientItemType> | null

class Clients {
    clients: ClientsType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadClients() {
        return clientsAPI.getClients().then(response => {
            response.map((item: { Sex: string; }) => {
                return item.Sex === "male" ? item.Sex = "Мужчина" :
                    item.Sex = "Женщина"
            })
            this.clients = response
        })
    }
}


export default new Clients()