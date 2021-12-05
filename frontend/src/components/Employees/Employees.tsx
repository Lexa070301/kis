import classes from "./Employees.module.css";

import EmployeesInstance from "../../store/Employees";
import Org, {OrganisationItemType, OrganisationsType} from "../../store/Organisations";
import Positions, {PositionItemType, PositionType} from "../../store/Positions";
import {form} from "../../store/AddEmployeeForm";

import React, {useEffect, useState} from "react";

import {observer} from "mobx-react-lite";
import {set, toJS} from "mobx";
import Swal from "sweetalert2";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import Select from "react-select";

import {AddEmployeeForm} from "./AddEmployeeForm";
import {Title} from "../common/Title/Title";

import {download, rootURL, usersAPI} from "../../api/api";

import EditIcon from "../../assets/images/icons/edit.svg";
import DownloadIcon from "../../assets/images/icons/download.svg";
import DeleteIcon from "../../assets/images/icons/delete.svg";
import {Loader} from "../common/Loader/Loader";
import Modal from 'react-modal';
import Upload from "../../assets/images/icons/upload.svg";


type CellValueType = string | number | readonly string[] | undefined

export const Employees = observer(() => {

    const [render, setRender] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    // const [editFormData, setEditFormData] = useState({
    //     name: "",
    //     fullName: "",
    //     date: "",
    //     email: "",
    //     organization: {value: "", label: ""},
    //     position: {value: "", label: ""},
    // });
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [rowId, setRowId] = useState(0);
    // const [selectedImage, setSelectedImage] = useState();

    // const imageChange = (e: any) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setSelectedImage(e.target.files[0]);
    //     }
    // }


    Modal.setAppElement('#root');

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
                }
            },
            {
                name: "Полное имя",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "Дата рождения",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "Email",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "Организация",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "Должность",
                options: {
                    filter: true,
                    sort: true,
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
                                <>
                                    {/*<img src={EditIcon} alt="Edit" className={classes.editEmployee} onClick={() => {*/}
                                    {/*    setEditFormData({*/}
                                    {/*        name: tableMeta.rowData[0],*/}
                                    {/*        fullName: tableMeta.rowData[1],*/}
                                    {/*        date: tableMeta.rowData[2],*/}
                                    {/*        email: tableMeta.rowData[3],*/}
                                    {/*        organization: organizations.filter((item) => item.label === tableMeta.rowData[4])[0],*/}
                                    {/*        position: positions.filter((item) => item.label === tableMeta.rowData[5])[0],*/}
                                    {/*        photoLink: tableMeta.rowData[6]*/}
                                    {/*    })*/}
                                    {/*    setRowId(tableMeta.rowData[tableMeta.rowData.length - 1])*/}
                                    {/*    openModal()*/}
                                    {/*}}/>*/}
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

        // const afterOpenModal = () => {
        //     console.log(rootURL + editFormData.photoLink.slice(1))
        // };
        //
        // const openModal = () => {
        //     setModalIsOpen(true)
        // };
        //
        // const closeModal = () => {
        //     setModalIsOpen(false)
        // };
        //
        // const customStyles = {
        //     content: {
        //         top: '50%',
        //         left: '50%',
        //         right: 'auto',
        //         bottom: 'auto',
        //         marginRight: '-50%',
        //         transform: 'translate(-50%, -50%)',
        //         width: '95%',
        //         maxWidth: '1000px'
        //     },
        // };


        // @ts-ignore
        return (
            <div>
                <Title text={"Сотрудники"}/>
                <button className={"common-btn " + classes.addEmployee__btn} onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                    Новый сотрудник
                </button>
                {/*<Modal*/}
                {/*    isOpen={modalIsOpen}*/}
                {/*    onAfterOpen={afterOpenModal}*/}
                {/*    onRequestClose={closeModal}*/}
                {/*    style={customStyles}*/}
                {/*>*/}
                {/*    <Title text={"Редактировать"}/>*/}
                {/*    <button className={classes.closeModal} onClick={closeModal}>X</button>*/}
                {/*    <form className={classes.form}>*/}
                {/*        <div className={classes.editEmployee__form__inputs}>*/}
                {/*            <div>*/}
                {/*                <input type="text" value={editFormData.name} className={"common-input"}*/}
                {/*                       onChange={(e) => {*/}
                {/*                           setEditFormData({*/}
                {/*                               ...editFormData,*/}
                {/*                               name: e.target.value*/}
                {/*                           })*/}
                {/*                       }}/>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <input type="text" value={editFormData.fullName} className={"common-input"}*/}
                {/*                       onChange={(e) => {*/}
                {/*                           setEditFormData({*/}
                {/*                               ...editFormData,*/}
                {/*                               fullName: e.target.value*/}
                {/*                           })*/}
                {/*                       }}/>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <input type="date" value={editFormData.date?.toString()} className={"common-input"}*/}
                {/*                       onChange={(e) => {*/}
                {/*                           setEditFormData({*/}
                {/*                               ...editFormData,*/}
                {/*                               date: e.target.value*/}
                {/*                           })*/}
                {/*                       }}/>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <input type="email" value={editFormData.email} className={"common-input"}*/}
                {/*                       onChange={(e) => {*/}
                {/*                           setEditFormData({*/}
                {/*                               ...editFormData,*/}
                {/*                               email: e.target.value*/}
                {/*                           })*/}
                {/*                       }}/>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <Select*/}
                {/*                    isSearchable*/}
                {/*                    options={organizations}*/}
                {/*                    value={{*/}
                {/*                        value: editFormData.organization.value,*/}
                {/*                        label: editFormData.organization.label*/}
                {/*                    }}*/}
                {/*                    onChange={(selectedOption: any) => {*/}
                {/*                        setEditFormData({*/}
                {/*                            ...editFormData,*/}
                {/*                            organization: {value: selectedOption.value, label: selectedOption.label}*/}
                {/*                        })*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <Select*/}
                {/*                    isSearchable*/}
                {/*                    options={positions}*/}
                {/*                    value={{value: editFormData.position, label: editFormData.position.label}}*/}
                {/*                    onChange={(selectedOption: any) => {*/}
                {/*                        setEditFormData({*/}
                {/*                            ...editFormData,*/}
                {/*                            position: {value: selectedOption.value, label: selectedOption.label}*/}
                {/*                        })*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <label className={classes.addEmployee__form__photo}>*/}
                {/*            {*/}
                {/*                editFormData.photoLink !== "НЕТ" ?*/}
                {/*                    <div className={classes.editEmployee__photo__wrap}>*/}
                {/*                        <img src={rootURL + editFormData.photoLink.slice(1)} className={classes.editEmployee__photo} alt="photo"/>*/}
                {/*                        <div className={classes.editEmployee__photo__icons}>*/}
                {/*                            <img src={EditIcon} alt="Edit" className={classes.editEmployee__photo__icon}/>*/}
                {/*                            <a onClick={() => {download(rootURL + editFormData.photoLink.slice(1))}}>*/}
                {/*                                <img src={DownloadIcon} alt="DownloadIcon" className={classes.editEmployee__photo__icon}/>*/}
                {/*                            </a>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    :*/}
                {/*                    <>*/}
                {/*                        <span className={classes.addEmployee__form__photo__text}> {form.$('photo').label}</span>*/}
                {/*                        <input type={"file"} onChange={imageChange}/>*/}
                {/*                        {*/}
                {/*                            selectedImage?*/}
                {/*                                <img src={URL.createObjectURL(selectedImage)}*/}
                {/*                                     className={classes.addEmployee__form__loaded}/> :*/}
                {/*                                <img src={Upload} alt="Upload" className={classes.addEmployee__form__icon}/>*/}
                {/*                        }*/}
                {/*                    </>*/}

                {/*            }*/}
                {/*            <p className={"common-error"}>{form.$('photo').error}</p>*/}
                {/*        </label>*/}
                {/*    </form>*/}
                {/*    <button className={"common-btn"} onClick={() => {*/}
                {/*        try {*/}
                {/*            console.log(selectedImage)*/}
                {/*            usersAPI.editEmployee(*/}
                {/*                rowId,*/}
                {/*                editFormData.name,*/}
                {/*                editFormData.fullName,*/}
                {/*                editFormData.date,*/}
                {/*                editFormData.email,*/}
                {/*                editFormData.organization.value,*/}
                {/*                editFormData.position.value,*/}
                {/*                selectedImage*/}
                {/*            ).then(response => {*/}
                {/*                if ("error" !== response.data) {*/}
                {/*                    Swal.fire('Success', 'Данные успешно обновлены', 'success')*/}
                {/*                    closeModal()*/}
                {/*                } else {*/}
                {/*                    Swal.fire('Ошибка', 'Что-то пошло не так', 'error')*/}
                {/*                }*/}
                {/*            })*/}
                {/*        } catch (e) {*/}
                {/*            Swal.fire('Ошибка', String(e), 'error')*/}
                {/*        }*/}
                {/*    }*/}
                {/*    }>Сохранить*/}
                {/*    </button>*/}
                {/*</Modal>*/}
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
