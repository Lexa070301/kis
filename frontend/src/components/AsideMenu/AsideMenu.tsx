import classes from "./AsideMenu.module.css";
import {
    NavLink
} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {UserInstance} from "../../store/User";
import React from "react";

export const AsideMenu = observer(() => {
    const onLeave = () => {
        UserInstance.logout();
    }

    const managerLink = <NavLink to={"/for-manager"} className={classes.link} activeClassName={classes.active}>
        Для менеджера
    </NavLink>

    const accountantLink = <NavLink to={"/for-accountant"} className={classes.link} activeClassName={classes.active}>
        Для бухгалтера
    </NavLink>
    const agentLink = <></>
    const adminLinks = <>
        {managerLink}
        {accountantLink}
        {agentLink}
        <NavLink to={"/for-admin"} className={classes.link} activeClassName={classes.active}>
            Для администратора
        </NavLink>
    </>
    return (
        <div className={classes.AsideMenu}>
            <NavLink to={"/"} exact className={classes.link} activeClassName={classes.active}>
                Главная
            </NavLink>
            { UserInstance.isEntered ?
                <>
                {
                    UserInstance.position === "Менеджер" &&
                    managerLink
                }
                {
                    UserInstance.position === "Бухгалтер" &&
                    accountantLink
                }
                {
                    UserInstance.position === "Агент" &&
                    agentLink
                }
                {
                    UserInstance.position === "Администратор" &&
                    adminLinks
                }
                    <NavLink to={"/login"} onClick={onLeave} className={classes.enter}>
                        Выйти
                    </NavLink>
                </>
                :
                <NavLink to={"/login"} className={classes.enter}>
                    Войти
                </NavLink>
            }
        </div>
    )
})