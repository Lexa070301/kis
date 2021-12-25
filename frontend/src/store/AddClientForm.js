import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import Swal from 'sweetalert2'
import {clientsAPI} from "../api/api";

const plugins = {
  dvr: dvr({
    package: validatorjs,
    extend: ({ validator, form }) => {
      const messages = validator.getMessages('en');
      messages.required = 'Поле обязательно для заполнения';
      messages.numeric = 'Поле должно содержать только цифры';
      messages.between = 'Поле должно содержать от :min до :max символов';
      messages.regex = 'Поле должно содержать только буквы';
      messages.size = 'Дата должна быть после 1900 года и до сегодняшнего дня';
      validator.setMessages('en', messages);
    }
  }),
};

const fields = [{
  name: 'name',
  label: 'Имя',
  placeholder: 'Введите Имя',
  rules: 'required|string|between:1,63|regex:/[a-zA-Zа-яА-Я]+$/',
  type: 'text'
}, {
  name: 'fullName',
  label: 'Ф.И.О.',
  placeholder: 'Введите Ф.И.О.',
  rules: 'required|string|between:1,255|regex:/[a-zA-Zа-яА-Я]+$/',
  type: 'text'
}, {
  name: 'dateOfBirth',
  label: 'Дата рождения',
  placeholder: 'Введите дату рождения',
  rules: 'required|date|size:10',
  type: 'date',
}, {
  name: 'placeOfBirth',
  label: 'Место рождения',
  placeholder: 'Введите место рождения',
  rules: 'required|string|between:1,255',
  type: 'text'
}, {
  name: 'series',
  label: 'Серия паспорта',
  placeholder: 'Введите серию паспорта',
  rules: 'required|numeric',
  type: 'text'
}, {
  name: 'number',
  label: 'Номер паспорта',
  placeholder: 'Введите номер паспорта',
  rules: 'required|numeric',
  type: 'text'
}, {
  name: 'issuanceDate',
  label: 'Дата выдачи паспорта',
  placeholder: 'Введите дату выдачи паспорта',
  rules: 'required|date|size:10',
  type: 'date'
}, {
  name: 'endDate',
  label: 'Дата окончания действия паспорта',
  placeholder: 'Введите дату окончания действия паспорта',
  rules: 'required|date|size:10',
  type: 'date'
}, {
  name: 'issuedAt',
  label: 'Место выдачи',
  placeholder: 'Введите место выдачи паспорта',
  rules: 'required|string|between:1,255',
  type: 'text'
}, {
  name: "sex",
  label: "Пол",
  rules: 'required',
  placeholder: "Выберите пол",
  output: organization => organization && organization.value
}, {
  name: "status",
  label: "Статус",
  rules: 'required',
  placeholder: "Выберите статус",
  output: position => position && position.value
}];

const hooks = {
  onSuccess(form) {
    try {
      clientsAPI.addClient(
          form.values().name,
          form.values().fullName,
          form.values().dateOfBirth,
          form.values().placeOfBirth,
          form.values().series,
          form.values().number,
          form.values().issuanceDate,
          form.values().endDate,
          form.values().issuedAt,
          form.values().sex,
          form.values().status
      ).then(response => {
        if (response !== "error") {
          form.clear()
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
