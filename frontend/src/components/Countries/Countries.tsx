import classes from "./Countries.module.css";
import Country from "../../store/Countries";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import {useEffect} from "react";
import {MUIDataTableOptions} from "mui-datatables";

export const Countries = observer(() => {
    useEffect(() => {
        if(!toJS(Country.countries)) Country.loadCountries();
    }, []);


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
});