import classes from "./Notifications.module.css";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import React, {useEffect, useState} from "react";
import {Loader} from "../common/Loader/Loader";
import Notices from "../../store/Notifications";
import {useHistory} from "react-router-dom";
import Contract from "../../store/Contract";

export const Notifications = observer((props: any) => {

    let history = useHistory();
    const [render, setRender] = useState(false)

    useEffect(() => {
        async function init() {
            if (!toJS(Notices.notifications))
                await Notices.loadNotifications(props.position);
            setRender(true)
        }

        init()
    }, []);

    if (render) {
        return (
            <div>
                <Title text={"Уведомления"}/>
                <div className={classes.notifications}>
                    {toJS(Notices.notifications)?.map((item, index) => {
                        return (
                            <div onClick={() => {
                                Contract.currentAgreement = String(item.Id)
                                history.push('/contracts')
                            }} className={classes.item} key={index}>
                                <span>{item.Text}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return <Loader/>
    }
});