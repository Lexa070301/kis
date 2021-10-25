import {observer} from "mobx-react";
import classes from "./Clients.module.css";
import React from "react";
import Select from "react-select";


// @ts-ignore
export const AddClientForm = observer(({form, statuses}) => {

        const sex = [
            {
                value: "male",
                label: "Мужчина"
            },
            {
                value: "female",
                label: "Женщина"
            },
        ]

        return (
            <div className={classes.addClient__form}>
                <form className={classes.form}>
                    <div className={classes.addClient__form__inputs}>
                        <div>
                            <label htmlFor={form.$('name').id} className={"common-label"}>
                                {form.$('name').label}
                            </label>
                            <input {...form.$('name').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('name').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('fullName').id} className={"common-label"}>
                                {form.$('fullName').label}
                            </label>
                            <input {...form.$('fullName').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('fullName').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('dateOfBirth').id} className={"common-label"}>
                                {form.$('dateOfBirth').label}
                            </label>
                            <input {...form.$('dateOfBirth').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('dateOfBirth').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('placeOfBirth').id} className={"common-label"}>
                                {form.$('placeOfBirth').label}
                            </label>
                            <input {...form.$('placeOfBirth').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('placeOfBirth').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('series').id} className={"common-label"}>
                                {form.$('series').label}
                            </label>
                            <input {...form.$('series').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('series').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('number').id} className={"common-label"}>
                                {form.$('number').label}
                            </label>
                            <input {...form.$('number').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('number').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('issuanceDate').id} className={"common-label"}>
                                {form.$('issuanceDate').label}
                            </label>
                            <input {...form.$('issuanceDate').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('issuanceDate').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('endDate').id} className={"common-label"}>
                                {form.$('endDate').label}
                            </label>
                            <input {...form.$('endDate').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('endDate').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('issuedAt').id} className={"common-label"}>
                                {form.$('issuedAt').label}
                            </label>
                            <input {...form.$('issuedAt').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('issuedAt').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('sex').id} className={"common-label select-label"}>
                                {form.$('sex').label}
                            </label>
                            <Select
                                isSearchable
                                options={sex}
                                {...form.$("sex").bind()}
                            />
                            <p className={"common-error"}>{form.$('sex').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('status').id} className={"common-label select-label"}>
                                {form.$('status').label}
                            </label>
                            <Select
                                isSearchable
                                options={statuses}
                                {...form.$("status").bind()}
                            />
                            <p className={"common-error"}>{form.$('status').error}</p>
                        </div>
                        <div/>

                        <button type="submit" onClick={form.onSubmit} className={"common-btn"}>
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        )
    }
);