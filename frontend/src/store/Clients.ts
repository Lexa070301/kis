import {makeAutoObservable} from "mobx";
import {clientsAPI} from "../api/api";

type ClientsType = Array<{
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
}> | null

class Clients {
    clients:ClientsType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadClients() {
        clientsAPI.getClients().then(response => {
            response.map((item: { Sex: string; }) => {
                return item.Sex === "male" ? item.Sex = "Мужчина":
                    item.Sex = "Женищна"
            })
            this.clients = response
        })
    }
}


export default new Clients()