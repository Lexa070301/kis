import {makeAutoObservable} from "mobx";
import {usersAPI} from "../api/api";

type EmployeesType = Array<{
    Name: string
    FullName: string
    DateOfBirth: string
    Email: string
    Office: string
}> | null

class Employees {
    employees:EmployeesType = null

    constructor() {
        makeAutoObservable(this)
    }

    loadEmployees() {
        usersAPI.getEmployees().then(response => this.employees = response)
    }
}


export default new Employees()