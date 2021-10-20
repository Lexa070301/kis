import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import Swal from 'sweetalert2'
import {loginAPI, usersAPI} from "../api/api";
import {sha512} from "js-sha512";
import {UserInstance} from "./User";

const plugins = {
  dvr: dvr(validatorjs),
};

const fields = [{
  name: 'name',
  label: 'Имя',
  placeholder: 'Введите Имя',
  rules: 'required|string',
  type: 'text'
}, {
  name: 'fullName',
  label: 'Ф.И.О.',
  placeholder: 'Введите Ф.И.О.',
  rules: 'required|string|between:5,25',
  type: 'text'
}, {
  name: 'dateOfBirth',
  label: 'Дата рождения',
  placeholder: 'Введите дату рождения',
  rules: 'required|date',
  type: 'date'
}, {
  name: 'photo',
  label: 'Добавьте фотографию',
  rules: '',
  type: 'file'
}];


const hooks = {
  onSuccess(form) {
    try {
      if(form.$('photo').files)
        usersAPI.addEmployee(form.values().name, form.values().fullName, form.values().dateOfBirth, form.$('photo').files[0]).then(response => {
          if (response !== "error") {
            Swal.fire('Success', 'Сотрудник успешно добавлен', 'success')
          } else {
            Swal.fire('Ошибка', 'Что-то пошло не так', 'error')
          }
        })
      else
        usersAPI.addEmployee(form.values().name, form.values().fullName, form.values().dateOfBirth).then(response => {
          if (response !== "error") {
            Swal.fire('Success', 'Сотрудник успешно добавлен', 'success')
          } else {
            Swal.fire('Ошибка', 'Что-то пошло не так', 'error')
          }
        })
    } catch (e) {
      Swal.fire('Ошибка', String(e), 'error')
    }
  },
  onError(form) {
    Swal.fire('Ошибка', 'Введите корректные данные', 'error')
  }
}

export const form = new MobxReactForm({fields}, {plugins, hooks});