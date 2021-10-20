import {observer} from "mobx-react";
import classes from "./Employees.module.css";
import React, {useState} from "react";
import Upload from "../../assets/images/icons/upload.svg"


// @ts-ignore
export const AddEmployeeForm = observer(({form}) => {
        const [selectedImage, setSelectedImage] = useState();
        const imageChange = (e: any) => {
            if (e.target.files && e.target.files.length > 0) {
                form.$('photo').files = e.target.files
                setSelectedImage(e.target.files[0]);
            }
        };
        return (
            <div className={classes.addEmployee__form}>
                <form className={classes.form}>
                    <div className={classes.addEmployee__form__inputs}>
                        <label htmlFor={form.$('name').id} className={"common-label"}>
                            {form.$('name').label}
                        </label>
                        <input {...form.$('name').bind()} className={"common-input"}/>
                        <p className={"common-error"}>{form.$('name').error}</p>
                        <label htmlFor={form.$('fullName').id} className={"common-label"}>
                            {form.$('fullName').label}
                        </label>
                        <input {...form.$('fullName').bind()} className={"common-input"}/>
                        <p className={"common-error"}>{form.$('fullName').error}</p>
                        <label htmlFor={form.$('dateOfBirth').id} className={"common-label"}>
                            {form.$('dateOfBirth').label}
                        </label>
                        <input {...form.$('dateOfBirth').bind()} className={"common-input"}/>
                        <p className={"common-error"}>{form.$('dateOfBirth').error}</p>
                        <button type="submit" onClick={form.onSubmit} className={"common-btn " + classes.btn}>Добавить
                        </button>
                    </div>
                    <label className={classes.addEmployee__form__photo}>
                        <span className={classes.addEmployee__form__photo__text}> {form.$('photo').label}</span>
                        <input type={"file"} onChange={imageChange}/>
                        {selectedImage ?
                            <img src={URL.createObjectURL(selectedImage)} className={classes.addEmployee__form__loaded}/> :
                            <img src={Upload} alt="Upload" className={classes.addEmployee__form__icon}/>
                        }
                        <p className={"common-error"}>{form.$('photo').error}</p>
                    </label>
                </form>
            </div>
        )
    }
);