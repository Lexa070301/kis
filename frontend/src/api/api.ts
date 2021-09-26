import axios from "axios";

export const baseURL = "http://127.0.0.1:5000/api/"

const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL
});

instance.interceptors.request.use( config => {
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
        return instance.post(`check_auth`,{}).then(response => response.data);
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
}