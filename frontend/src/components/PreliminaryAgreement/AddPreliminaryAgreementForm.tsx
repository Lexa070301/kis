import {observer} from "mobx-react";
import classes from "./PreliminaryAgreement.module.css";
import React from "react";
import Select from "react-select";


// @ts-ignore
export const AddPreliminaryAgreementForm = observer(({form, organizations, agents, countries, clients, currentOrganization, cities, currentCountry}) => {

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
                            <label htmlFor={form.$('agent').id} className={"common-label select-label"}>
                                {form.$('agent').label}
                            </label>
                            <Select
                                isClearable
                                isDisabled={currentOrganization}
                                isSearchable
                                options={agents}
                                {...form.$("agent").bind()}
                            />
                            <p className={"common-error"}>{form.$('agent').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('client').id} className={"common-label select-label"}>
                                {form.$('client').label}
                            </label>
                            <Select
                                isSearchable
                                options={clients}
                                {...form.$("client").bind()}
                            />
                            <p className={"common-error"}>{form.$('client').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('membersCount').id} className={"common-label"}>
                                {form.$('membersCount').label}
                            </label>
                            <input {...form.$('membersCount').bind()} className={"common-input"}/>
                            <p className={"common-error"}>{form.$('membersCount').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('startDate').id} className={"common-label"}>
                                {form.$('startDate').label}
                            </label>
                            <input {...form.$('startDate').bind()} className={"common-input"} min="1900-01-01"
                                   max="2100-01-01"/>
                            <p className={"common-error"}>{form.$('startDate').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('endDate').id} className={"common-label"}>
                                {form.$('endDate').label}
                            </label>
                            <input {...form.$('endDate').bind()} className={"common-input"} min="1900-01-01"
                                   max="2100-01-01"/>
                            <p className={"common-error"}>{form.$('endDate').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('country').id} className={"common-label select-label"}>
                                {form.$('country').label}
                            </label>
                            <Select
                                isSearchable
                                options={countries}
                                {...form.$("country").bind()}
                            />
                            <p className={"common-error"}>{form.$('country').error}</p>
                        </div>
                        <div>
                            <label htmlFor={form.$('cities').id} className={"common-label select-label"}>
                                {form.$('cities').label}
                            </label>
                            <Select
                                isMulti
                                isSearchable
                                isDisabled={currentCountry}
                                options={cities}
                                {...form.$("cities").bind()}
                            />
                            <p className={"common-error"}>{form.$('cities').error}</p>
                        </div>
                        <button type="submit" onClick={form.onSubmit} className={"common-btn"}>
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        )
    }
);