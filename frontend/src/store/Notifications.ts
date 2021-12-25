import {makeAutoObservable} from "mobx";
import {documentsAPI} from "../api/api";

export type NotificationItemType = {
    Id: number
    Type: string
    Text: string
}

export type NotificationsType = Array<NotificationItemType> | null

class Notifications {
    notifications:NotificationsType = null

    constructor() {
        makeAutoObservable(this)
    }

    async loadNotifications(position: string | null) {
        return documentsAPI.getNotifications(position).then(response => this.notifications = response)
    }
}


export default new Notifications()