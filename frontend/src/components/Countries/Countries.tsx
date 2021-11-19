import classes from "./Countries.module.css";
import Country from "../../store/Countries";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import {useEffect, useState} from "react";
import {Loader} from "../common/Loader/Loader";

export const Countries = observer(() => {

    const [render, setRender] = useState(false)

    useEffect(() => {
        async function init() {
            if (!toJS(Country.countries))
                await Country.loadCountries();
            setRender(true)
        }

        init()
    }, []);

    if (render) {

        return (
            <div>
                <Title text={"Страны"}/>
                <div className={classes.countries}>
                    {toJS(Country.countries)?.map((item, index) => {
                        return (
                            <div className={classes.item} key={index} data-name={item.Name}>
                                <span>{item.Name}</span>
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