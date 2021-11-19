import classes from "./Organizations.module.css";
import Org from "../../store/Organisations";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import {useEffect, useState} from "react";
import {Loader} from "../common/Loader/Loader";

export const Organizations = observer(() => {

    const [render, setRender] = useState(false)

    useEffect(() => {
        async function init() {
            if (!toJS(Org.organisations))
                await Org.loadOrganisations();
            setRender(true)
        }

        init()
    }, []);

    if (render) {

        return (
            <div>
                <Title text={"Организации"}/>
                <div className={classes.organizations}>
                    {toJS(Org.organisations)?.map((item, index) => {
                        return (
                            <div className={classes.item} key={index}>
                                <span>{item.Title}</span>
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