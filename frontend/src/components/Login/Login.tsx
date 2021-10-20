import classes from "./Login.module.css";
import {Title} from "../common/Title/Title";
import {observer} from "mobx-react";
import {UserInstance} from "../../store/User";
import {Redirect} from "react-router-dom";
import React from "react";

// @ts-ignore
export const Login = observer(({form}) => (
    <div className={classes.login}>
        {
            UserInstance.position === "Менеджер" &&
            <Redirect to={"/for-manager"}/>
        }
        {
            UserInstance.position === "Бухгалтер" &&
            <Redirect to={"/for-accountant"}/>
        }
        {
            UserInstance.position === "Агент" &&
            <Redirect to={"/for-agent"}/>
        }
        {
            UserInstance.position === "Администратор" &&
            <Redirect to={"/for-admin"}/>
        }
        <Title text={"Войти"}/>
        <form className={classes.form}>
            <label htmlFor={form.$('email').id} className={"common-label"}>
                {form.$('email').label}
            </label>
            <input {...form.$('email').bind()} className={"common-input"}/>
            <p className={"common-error"}>{form.$('email').error}</p>
            <label htmlFor={form.$('password').id} className={"common-label"}>
                {form.$('password').label}
            </label>
            <input {...form.$('password').bind()} className={"common-input"}/>
            <p className={"common-error"}>{form.$('password').error}</p>
            <button type="submit" onClick={form.onSubmit} className={"common-btn " + classes.btn}>Войти</button>
        </form>

    </div>
));