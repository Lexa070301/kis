import classes from "./Employees.module.css";

import EmployeesInstance from "../../store/Employees";
import Org, {OrganisationItemType, OrganisationsType} from "../../store/Organisations";
import Positions, {PositionItemType, PositionType} from "../../store/Positions";
import {form} from "../../store/AddEmployeeForm";

import React, {useEffect, useState} from "react";

import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import Swal from "sweetalert2";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import Select from "react-select";

import {AddEmployeeForm} from "./AddEmployeeForm";
import {Title} from "../common/Title/Title";

import {usersAPI} from "../../api/api";

import EditIcon from "../../assets/images/icons/edit.svg";
import DeleteIcon from "../../assets/images/icons/delete.svg";
import Contracts from "../../store/Contract";
import PreliminaryAgreement from "../../store/PreliminaryAgreement";
import {Loader} from "../common/Loader/Loader";


type CellValueType = string | number | readonly string[] | undefined

export const Employees = observer(() => {

    const [render, setRender] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [editEmployee, setEditEmployee] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: "",
        fullName: "",
        date: "",
        email: "",
        organization: {value: "", label: ""},
        position: {value: "", label: ""}
    });

    useEffect(() => {

        async function init() {
            if (!toJS(EmployeesInstance.employees))
                await EmployeesInstance.loadEmployees()
            if (!toJS(Positions.positions))
                await Positions.loadPositions()
            if (!toJS(Org.organisations))
                await Org.loadOrganisations()
            setRender(true)
        }

        init()
    }, []);
    if (render) {

        const organizationList: OrganisationsType = toJS(Org.organisations)
        const positionsList: PositionType = toJS(Positions.positions)

        let organizations: Array<any> = []
        if (organizationList)
            organizations = organizationList.map((item: OrganisationItemType) => {
                return {
                    value: item.id,
                    label: item.Title
                }
            })

        let positions: Array<any> = []
        if (positionsList)
            positions = positionsList.map((item: PositionItemType) => {
                return {
                    value: item.id,
                    label: item.Title
                }
            })

        const columns = [
            {
                name: "Имя",
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value: CellValueType, tableMeta: any, updateValue: any) => (
                        editEmployee !== tableMeta.rowData[tableMeta.rowData.length - 1] ? value :
                            <input type="text" value={editFormData.name} className={"common-input"} onChange={(e) => {
                                setEditFormData({
                                    ...editFormData,
                                    name: e.target.value
                                })
                            }}/>
                    )
                }
            },
            {
                name: "Полное имя",
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value: CellValueType, tableMeta: any, updateValue: any) => (
                        editEmployee !== tableMeta.rowData[tableMeta.rowData.length - 1] ? value :
                            <input type="text" value={editFormData.fullName} className={"common-input"}
                                   onChange={(e) => {
                                       setEditFormData({
                                           ...editFormData,
                                           fullName: e.target.value
                                       })
                                   }}/>
                    )
                }
            },
            {
                name: "Дата рождения",
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value: CellValueType, tableMeta: any, updateValue: any) => (
                        editEmployee !== tableMeta.rowData[tableMeta.rowData.length - 1] ? value :
                            <input type="date" value={editFormData.date?.toString()} className={"common-input"}
                                   onChange={(e) => {
                                       setEditFormData({
                                           ...editFormData,
                                           date: e.target.value
                                       })
                                   }}/>
                    )
                }
            },
            {
                name: "Email",
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (value: CellValueType, tableMeta: any, updateValue: any) => (
                        editEmployee !== tableMeta.rowData[tableMeta.rowData.length - 1] ? value :
                            <input type="email" value={editFormData.email} className={"common-input"} onChange={(e) => {
                                setEditFormData({
                                    ...editFormData,
                                    email: e.target.value
                                })
                            }}/>
                    )
                }
            },
            {
                name: "Организация",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value: CellValueType, tableMeta: any, updateValue: any) => (
                        editEmployee !== tableMeta.rowData[tableMeta.rowData.length - 1] ? value :
                            <Select
                                isSearchable
                                options={organizations}
                                value={{value: editFormData.organization.value, label: editFormData.organization.label}}
                                onChange={(selectedOption: any) => {
                                    setEditFormData({
                                        ...editFormData,
                                        organization: {value: selectedOption.value, label: selectedOption.label}
                                    })
                                }}
                            />
                    )
                }
            },
            {
                name: "Должность",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value: CellValueType, tableMeta: any, updateValue: any) => (
                        editEmployee !== tableMeta.rowData[tableMeta.rowData.length - 1] ? value :
                            <Select
                                isSearchable
                                options={positions}
                                value={{value: editFormData.position, label: editFormData.position.label}}
                                onChange={(selectedOption: any) => {
                                    setEditFormData({
                                        ...editFormData,
                                        position: {value: selectedOption.value, label: selectedOption.label}
                                    })
                                }}
                            />
                    )
                }
            },
            {
                name: "Действия",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value: CellValueType, tableMeta: any, updateValue: any) => (
                        <>
                            {
                                editEmployee !== tableMeta.rowData[tableMeta.rowData.length - 1] ?
                                    <>
                                        <img src={EditIcon} alt="Edit" className={classes.editEmployee} onClick={() => {
                                            setEditFormData({
                                                name: tableMeta.rowData[0],
                                                fullName: tableMeta.rowData[1],
                                                date: tableMeta.rowData[2],
                                                email: tableMeta.rowData[3],
                                                organization: organizations.filter((item) => item.label === tableMeta.rowData[4])[0],
                                                position: positions.filter((item) => item.label === tableMeta.rowData[5])[0]
                                            })
                                            document.querySelector('[data-testid="Filter Table-iconButton"]')?.classList.remove("d-inline-flex");
                                            document.querySelector('[data-testid="Filter Table-iconButton"]')?.classList.add("d-none");
                                            setEditEmployee(tableMeta.rowData[tableMeta.rowData.length - 1])
                                        }}/>
                                        <img src={DeleteIcon} alt="Edit" className={classes.editEmployee}
                                             onClick={() => {
                                                 try {
                                                     usersAPI.deleteEmployee(tableMeta.rowData[tableMeta.rowData.length - 1]).then(response => {
                                                         if (response !== "error") {
                                                             Swal.fire('Success', 'Сотрудник успешно удалён', 'success')
                                                         } else {
                                                             Swal.fire('Ошибка', 'Что-то пошло не так', 'error')
                                                         }
                                                     })
                                                 } catch (e) {
                                                     Swal.fire('Ошибка', String(e), 'error')
                                                 }
                                             }}/>
                                    </>
                                    :
                                    <button className={"common-btn"} onClick={() => {
                                        document.querySelector('[data-testid="Filter Table-iconButton"]')?.classList.remove("d-none");
                                        document.querySelector('[data-testid="Filter Table-iconButton"]')?.classList.add("d-inline-flex");
                                        try {
                                            usersAPI.editEmployee(
                                                tableMeta.rowData[tableMeta.rowData.length - 1],
                                                editFormData.name,
                                                editFormData.fullName,
                                                editFormData.date,
                                                editFormData.email,
                                                editFormData.organization.value,
                                                editFormData.position.value
                                            ).then(response => {
                                                if (response !== "error") {
                                                    Swal.fire('Success', 'Данные успешно обновлены', 'success')
                                                } else {
                                                    Swal.fire('Ошибка', 'Что-то пошло не так', 'error')
                                                }
                                            })
                                        } catch (e) {
                                            Swal.fire('Ошибка', String(e), 'error')
                                        }
                                        setEditEmployee(false)
                                    }
                                    }>Сохранить</button>
                            }
                        </>
                    )
                }
            }
        ];

        const data = EmployeesInstance.employees ?
            EmployeesInstance.employees.map(item => [item.Name, item.FullName, item.DateOfBirth, item.Email, item.Office, item.Position, item.id]) : [[""]]

        let options: MUIDataTableOptions = {
            pagination: true,
            selectableRows: "none",
            print: false,
            rowsPerPageOptions: [5, 10, 15, 20, 25]
        }

        return (
            <div>
                <Title text={"Сотрудники"}/>
                <button className={"common-btn " + classes.addEmployee__btn} onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                    Новый сотрудник
                </button>

                {isOpen && <AddEmployeeForm form={form} organizations={organizations} positions={positions}/>}
                <div className={classes.table}>
                    <MUIDataTable
                        title={"Список Сотрудников"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </div>
            </div>
        )
    } else {
        return <Loader/>
    }
});
