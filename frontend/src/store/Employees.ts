import {makeAutoObservable} from "mobx";
import {usersAPI} from "../api/api";

export type EmployeeItemType = {
    id: number
    Name: string
    FullName: string
    DateOfBirth: string
    Email: string
    Office: string
    Position: string
}

export type EmployeesType = Array<EmployeeItemType> | null

class Employees {
    employees:EmployeesType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadEmployees() {
        return usersAPI.getEmployees().then(response => this.employees = response)
    }
}


export default new Employees()