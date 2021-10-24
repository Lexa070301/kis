import classes from "./Employees.module.css";
import EmployeesInstance from "../../store/Employees";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Title} from "../common/Title/Title";
import {useEffect} from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import {AddEmployeeForm} from "./AddEmployeeForm";
import {form} from "../../store/AddEmployeeForm";
import Org, {OrganisationsType} from "../../store/Organisations";
import Positions, {PositionType} from "../../store/Positions";


export const Employees = observer(() => {
    useEffect(() => {
        if (!toJS(EmployeesInstance.employees)) EmployeesInstance.loadEmployees().then(() => {
            if (!toJS(Positions.positions)) Positions.loadPositions().then(() => {
                if (!toJS(Org.organisations)) Org.loadOrganisations().then()
            });
        });
    }, []);

    const organizationList: OrganisationsType = toJS(Org.organisations)
    const positionsList: PositionType = toJS(Positions.positions)

    const columns = [
        {
            name: "Имя",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Полное имя",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Дата рождения",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Email",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Организация",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "Должность",
            options: {
                filter: true,
                sort: true
            }
        }
    ];

    const data = EmployeesInstance.employees ?
        EmployeesInstance.employees.map(item => [item.Name, item.FullName, item.DateOfBirth, item.Email, item.Office, item.Position]) : [[""]]

    const options: MUIDataTableOptions = {
        pagination: false,
        selectableRows: "none",
        print: false
    }

    return (
        <div>
            <Title text={"Сотрудники"}/>
            <button className={"common-btn " + classes.addEmployee__btn}>Новый сотрудник</button>
            <AddEmployeeForm form={form} organizationList={organizationList} positionsList={positionsList}/>
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
});
