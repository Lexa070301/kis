import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import Swal from 'sweetalert2'
import Agents from "./Agents";
import {toJS} from "mobx";
import Cities from "./Cities";
import {documentsAPI} from "../api/api";

const plugins = {
  dvr: dvr({
    package: validatorjs,
    extend: ({validator, form}) => {
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

const organizationHandlers = {
  onChange: (field) => (e) => {
    field.set(e);
    form.$('agent').reset()
    Agents.currentOrganization = e.label
  },
}

const countryHandlers = {
  onChange: (field) => (e) => {
    field.set(e);
    form.$('cities').reset()
    Cities.currentCountry = e.label
  },
}

const fields = [{
  name: 'number',
  label: 'Номер',
  placeholder: 'Введите Номер',
  rules: 'required|numeric',
  type: 'text'
}, {
  name: 'date',
  label: 'Дата',
  placeholder: 'Введите дату',
  rules: 'required',
  type: 'datetime-local',
}, {
  name: 'organization',
  label: 'Организация',
  rules: 'required',
  handlers: organizationHandlers,
  placeholder: 'Выберите организацию',
  output: organization => organization && organization.value
}, {
  name: 'agent',
  label: 'Агент',
  rules: '',
  placeholder: 'Выберите агента',
  output: agent => agent && agent.value
}, {
  name: 'country',
  label: 'Страна посещения',
  rules: 'required',
  handlers: countryHandlers,
  placeholder: 'Выберите страну',
  output: country => country && country.value
}, {
  name: 'cities',
  label: 'Города',
  rules: 'required',
  placeholder: 'Выберите города',
  output: cities => cities && cities.map(item => toJS(item).value)
}, {
  name: 'client',
  label: 'Клиент',
  rules: 'required',
  placeholder: 'Выберите клиента',
  output: client => client && client.value
}, {
  name: 'membersCount',
  label: 'Количество участников поездки',
  placeholder: 'Количество участников поездки',
  rules: 'required|numeric',
  type: 'text'
}, {
  name: 'startDate',
  label: 'Дата начала',
  placeholder: 'Введите дату',
  rules: 'required|size:10',
  type: 'date',
}, {
  name: 'endDate',
  label: 'Дата окончания',
  placeholder: 'Введите дату',
  rules: 'required|size:10',
  type: 'date',
}];

const hooks = {
  onSuccess(form) {
    const cities = form.values().cities.map(item => toJS(item))
    try {
      documentsAPI.addPreliminaryAgreement(
          form.values().date,
          form.values().number,
          form.values().startDate,
          form.values().endDate,
          form.values().membersCount,
          form.values().agent,
          form.values().organization,
          form.values().client,
          form.values().cities,
      ).then(response => {
        if (response !== "error") {
          Swal.fire('Success', 'Предварительное соглашение успешно добавлено', 'success')
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