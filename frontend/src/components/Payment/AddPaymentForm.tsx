import {observer} from "mobx-react";
import classes from "./Payment.module.css";
import React from "react";
import Select from "react-select";
import {form} from "../../store/AddPaymentForm";


// @ts-ignore
export const AddPaymentForm = observer(({form, organizations, contracts}) => {

    return (
            <div className={classes.addClient__form}>
                <form className={classes.form}>
                    <div className={classes.addClient__form__inputs}>
                        <div>
                            <label htmlFor={form.$('number').id} className={"common-label"}>
                                {form.$('number').label}
                            </label>
                            <input {...form.$('number').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('number').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('date').id} className={"common-label"}>
                                {form.$('date').label}
                            </label>
                            <input {...form.$('date').bind()} className={"common-input"} min="1900-01-01" max="2100-01-01"/>
                            <p className={"common-error"}>{form.$('date').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('organization').id} className={"common-label select-label"}>
                                {form.$('organization').label}
                            </label>
                            <Select
                                isSearchable
                                options={organizations}
                                {...form.$("organization").bind()}
                            />
                            <p className={"common-error"}>{form.$('organization').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('contract').id} className={"common-label select-label"}>
                                {form.$('contract').label}
                            </label>
                            <Select
                                isClearable
                                isSearchable
                                options={contracts}
                                {...form.$("contract").bind()}
                            />
                            <p className={"common-error"}>{form.$('contract').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('sum').id} className={"common-label"}>
                                {form.$('sum').label}
                            </label>
                            <input {...form.$('sum').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('sum').error}</p>
                        </div>
                        <div/>
                        <button type="submit" onClick={form.onSubmit} className={"common-btn"}>
                            Записать
                        </button>
                    </div>
                </form>
            </div>
        )
    }
);