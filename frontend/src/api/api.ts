import axios from "axios";
import EmployeesInstance from "../store/Employees";
import Client from "../store/Clients";
import PreliminaryAgreement from "../store/PreliminaryAgreement";
import Contract from "../store/Contract";

// export const baseURL = "http://lexa070301.bhuser.ru/kis/api/"
export const baseURL = "http://127.0.0.1:5000/api/"

const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL
});

instance.interceptors.request.use(config => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config
})

export const usersAPI = {
    getUsers() {
        return instance.get(`users`)
            .then(response => response.data);
    },
    getOrganisations() {
        return instance.get(`organisations`)
            .then(response => response.data);
    },
    getPositions() {
        return instance.get(`positions`)
            .then(response => response.data);
    },
    getEmployees() {
        return instance.get(`employees`)
            .then(response => response.data);
    },
    editEmployee(
        id: Number,
        name: String,
        fullName: String,
        dateOfBirth: String,
        email: String,
        organization: String,
        position: String,
    ) {
        return instance.put(`employee`, {
            id,
            name,
            fullName,
            dateOfBirth,
            email,
            organization,
            position
        }).then(response => {
            EmployeesInstance.loadEmployees()
            return response.data
        });
    },
    deleteEmployee(id: Number) {
        return instance.delete(`employee?id=` + id, {}).then(response => {
            EmployeesInstance.loadEmployees()
            return response.data
        });
    },
    async addEmployee(
        name: String,
        fullName: String,
        dateOfBirth: Date,
        email: String,
        password: String,
        organization: String,
        position: String,
        photo?: File
    ) {
        const response1 = await instance.post(`employees`, {
            name,
            fullName,
            dateOfBirth,
            email,
            password,
            organization,
            position
        })
        if (photo) {
            const data = new FormData();
            data.append('image', photo);
            data.append('id', response1.data[0].lastId);
            await instance.put(`employees`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
        }
        EmployeesInstance.loadEmployees()
        return response1
    },
    getAgents() {
        return instance.get(`agents`)
            .then(response => response.data);
    }
}

export const loginAPI = {
    login(
        email: string,
        password: string,
    ) {
        return instance.post(`auth/login`, {
            email,
            password
        }).then(response => response.data);
    },
    checkAuth() {
        return instance.post(`check_auth`, {}).then(response => response.data);
    }
}

export const hotelsAPI = {
    getCountries() {
        return instance.get(`countries`)
            .then(response => response.data);
    },
    getCities() {
        return instance.get(`cities`)
            .then(response => response.data);
    },
    getCitiesToVisit(agreementId: number) {
        return instance.get(`citiesToVisit?agreementId=` + agreementId)
            .then(response => response.data);
    },
    getHotels() {
        return instance.get(`hotels`)
            .then(response => response.data);
    },
}

export const clientsAPI = {
    getClients() {
        return instance.get(`clients`)
            .then(response => response.data);
    },
    getStatuses() {
        return instance.get(`statuses`)
            .then(response => response.data);
    },
    async addClient(
        name: String,
        fullName: String,
        dateOfBirth: Date,
        placeOfBirth: String,
        series: Number,
        number: Number,
        issuanceDate: Date,
        endDate: Date,
        issuedAt: String,
        sex: String,
        status: String,
    ) {
        const response = await instance.post(`clients`, {
            name,
            fullName,
            dateOfBirth,
            placeOfBirth,
            series,
            number,
            issuanceDate,
            endDate,
            issuedAt,
            sex,
            status
        })
        Client.loadClients()
        return response
    },
}

export const documentsAPI = {
    getPreliminaryAgreements() {
        return instance.get(`preliminaryAgreements`)
            .then(response => {
                return response.data
            });
    },
    getContracts() {
        return instance.get(`contracts`)
            .then(response => response.data);
    },
    getNotifications(position: string) {
        return instance.get(`notifications?position=` + position)
            .then(response => response.data);
    },
    async addPreliminaryAgreement(
        Date: String,
        Number: Number,
        StartDate: String,
        EndDate: String,
        MembersCount: Number,
        Employee: Number,
        Organization: Number,
        Client: Number,
        Cities: Array<number>
    ) {
        const response = await instance.post(`preliminaryAgreements`, {
            Date,
            Number,
            StartDate,
            EndDate,
            MembersCount,
            Employee,
            Organization,
            Client,
            Cities,
            Status: "open"
        })
        PreliminaryAgreement.loadPreliminaryAgreements()
        Contract.loadContracts()
        return response
    },
    async addContract(
        Date: String,
        Number: Number,
        StartDate: String,
        EndDate: String,
        MembersCount: Number,
        Agent: Number,
        Organization: Number,
        PreliminaryAgreement_id: Number,
        Client: Number,
        Sum: Number,
        Members: Array<number>,
        Hotels: Array<object>
    ) {
        const response = await instance.post(`contracts`, {
            Date,
            Number,
            StartDate,
            EndDate,
            MembersCount,
            Agent,
            Organization,
            PreliminaryAgreement: PreliminaryAgreement_id,
            Client,
            Sum,
            Members,
            Hotels,
            Status: "active"
        })
        PreliminaryAgreement.loadPreliminaryAgreements()
        Contract.loadContracts()
        return response
    },
}