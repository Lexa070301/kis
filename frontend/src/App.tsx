import React, {useEffect} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route, Switch
} from "react-router-dom";
import {AsideMenu} from "./components/AsideMenu/AsideMenu";
import {UserInstance} from "./store/User";
import {observer} from "mobx-react-lite";
import {ForManager} from "./components/ForManager/ForManager";
import {Organizations} from "./components/Organizations/Organizations";
import {Login} from "./components/Login/Login";
import {form} from "./store/LoginForm";
import {Agents} from "./components/Agents/Agents";
import {Countries} from "./components/Countries/Countries";
import {Cities} from "./components/Cities/Cities";
import {Hotels} from "./components/Hotels/Hotels";
import {Clients} from "./components/Clients/Clients";
import {ForAccountant} from "./components/ForAccountant/ForAccountant";
import {ForAdmin} from "./components/ForAdmin/ForAdmin";
import {Employees} from "./components/Employees/Employees";
import {ForAgent} from "./components/ForAgent/ForAgent";
import {PreliminaryAgreement} from "./components/PreliminaryAgreement/PreliminaryAgreement";

const App = observer(() => {
    useEffect(() => {
        UserInstance.checkAuth();
    }, []);

    const managerRoutes = <>
        <Route path="/for-manager">
            <ForManager/>
        </Route>
        <Route path="/organizations">
            <Organizations/>
        </Route>
        <Route path="/agents">
            <Agents/>
        </Route>
        <Route path="/countries">
            <Countries/>
        </Route>
        <Route path="/cities">
            <Cities/>
        </Route>
        <Route path="/hotels">
            <Hotels/>
        </Route>
        <Route path="/clients">
            <Clients/>
        </Route>
        <Route path="/preliminary-agreement">
            <PreliminaryAgreement/>
        </Route>
    </>

    const accountantRoutes = <>
        <Route path="/for-accountant">
            <ForAccountant/>
        </Route>
        <Route path="/organizations">
            <Organizations/>
        </Route>
        <Route path="/clients">
            <Clients/>
        </Route>
    </>
    const agentRoutes = <>
        <Route path="/for-agent">
            <ForAgent/>
        </Route>
        <Route path="/preliminary-agreement">
            <PreliminaryAgreement/>
        </Route>
    </>
    const adminRoutes = <>
        <Route path="/for-admin">
            <ForAdmin/>
        </Route>
        <Route path="/for-agent">
            <ForAgent/>
        </Route>
        <Route path="/for-manager">
            <ForManager/>
        </Route>
        <Route path="/for-accountant">
            <ForAccountant/>
        </Route>
        <Route path="/organizations">
            <Organizations/>
        </Route>
        <Route path="/agents">
            <Agents/>
        </Route>
        <Route path="/employees">
            <Employees/>
        </Route>
        <Route path="/countries">
            <Countries/>
        </Route>
        <Route path="/cities">
            <Cities/>
        </Route>
        <Route path="/hotels">
            <Hotels/>
        </Route>
        <Route path="/clients">
            <Clients/>
        </Route>
        <Route path="/preliminary-agreement">
            <PreliminaryAgreement/>
        </Route>
    </>
    return (
        <Router>
            <AsideMenu/>
            <div className="App">
                <div className="container">
                    <Switch>
                        <Route path="/login">
                            <Login form={form}/>
                        </Route>
                        {
                            UserInstance.position === "Менеджер" &&
                            managerRoutes
                        }
                        {
                            UserInstance.position === "Бухгалтер" &&
                            accountantRoutes
                        }
                        {
                            UserInstance.position === "Агент" &&
                            agentRoutes
                        }
                        {
                            UserInstance.position === "Администратор" &&
                            adminRoutes
                        }
                    </Switch>
                </div>
            </div>
        </Router>
    );
});

export default App;
