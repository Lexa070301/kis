import {observer} from "mobx-react";
import classes from "./Contract.module.css";
import React from "react";
import Select from "react-select";
import {form} from "../../store/AddContractForm";


// @ts-ignore
export const AddContractForm = observer(({form, organizations, agents, countries, clients, hotels, currentOrganization, cities, currentCountry, members, preliminaryAgreements, currentContract, currentCities}) => {

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
                            <label htmlFor={form.$('preliminaryAgreement').id} className={"common-label select-label"}>
                                {form.$('preliminaryAgreement').label}
                            </label>
                            <Select
                                isSearchable
                                options={preliminaryAgreements}
                                {...form.$("preliminaryAgreement").bind()}
                            />
                            <p className={"common-error"}>{form.$('preliminaryAgreement').error}</p>
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
                                {form.$('endDate').label}clickHandle
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
                            <label htmlFor={form.$('members').id} className={"common-label select-label"}>
                                {form.$('members').label}
                            </label>
                            <Select
                                isMulti
                                isSearchable
                                options={members}
                                {...form.$("members").bind()}
                            />
                            <p className={"common-error"}>{form.$('members').error}</p>
                        </div>

                        {
                            form.$('cities').map((item:any, index:any) => <div className={classes.hotel}>
                                    <div>
                                        <label htmlFor={item.id} className={"common-label select-label"}>
                                            {item.label}
                                        </label>
                                        <Select
                                            isSearchable
                                            isDisabled={currentCountry}
                                            options={cities}
                                            {...item.bind()}
                                        />
                                        <p className={"common-error"}>{item.error}</p>
                                    </div>
                                    <div>
                                        <label htmlFor={form.$(`hotels[hotel${index+1}]`).id} className={"common-label select-label"}>
                                            {form.$(`hotels[hotel${index+1}]`).label}
                                        </label>
                                        <Select
                                            isSearchable
                                            isDisabled={form.$(`hotels[hotel${index+1}]`).disabled}
                                            options={hotels}
                                            {...form.$(`hotels[hotel${index+1}]`).bind()}
                                        />
                                        <p className={"common-error"}>{form.$(`hotels[hotel${index+1}]`).error}</p>
                                    </div>
                                    <div>
                                        <label htmlFor={form.$(`startDates[startDate${index+1}]`).id} className={"common-label"}>
                                            {form.$(`startDates[startDate${index+1}]`).label}
                                        </label>
                                        <input {...form.$(`startDates[startDate${index+1}]`).bind()} className={"common-input"} min="1900-01-01"
                                               max="2100-01-01"/>
                                        <p className={"common-error"}>{form.$(`startDates[startDate${index+1}]`).error}</p>
                                    </div>
                                    <div>
                                        <label htmlFor={form.$(`endDates[endDate${index+1}]`).id} className={"common-label"}>
                                            {form.$(`endDates[endDate${index+1}]`).label}
                                        </label>
                                        <input {...form.$(`endDates[endDate${index+1}]`).bind()} className={"common-input"} min="1900-01-01"
                                               max="2100-01-01"/>
                                        <p className={"common-error"}>{form.$(`endDates[endDate${index+1}]`).error}</p>
                                    </div>
                                </div>)
                        }
                        <div className={classes.addNewBtnWrap}>
                            <button type="button" className={"common-btn"} onClick={form.onAdd}>Добавить отель</button>
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