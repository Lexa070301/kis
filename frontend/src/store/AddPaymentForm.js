import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import Swal from 'sweetalert2'
import Agents from "./Agents";
import Payments from "./Payments";
import {toJS} from "mobx";
import payments from "./Payments";
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
        Payments.setCurrentOrganization(e.value, e.label)
    },
}

const contractHandlers = {
    onChange: (field) => (e) => {
        field.set(e);
        Payments.setCurrentPayment(e.value)
        form.$('sum').set(Payments.currentPayment.Sum)
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
    name: 'contract',
    label: 'Договор',
    rules: 'required',
    handlers: contractHandlers,
    placeholder: 'Выберите договор',
    output: contract => contract && contract.value
}, {
    name: 'sum',
    label: 'Сумма в рублях',
    placeholder: 'Сумма',
    rules: 'required|numeric',
    type: 'text'
},];


const hooks = {
    onSuccess(form) {
        try {
            documentsAPI.addPayment(
              form.values().date,
              form.values().number,
              form.values().contract,
              form.values().sum,
            ).then(response => {
                if (response !== "error") {
                    form.clear()
                    Swal.fire('Success', 'Оплата успешно проведена', 'success')
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

export const form = new MobxReactForm({fields}, {
    plugins,
    hooks,
    options: {validateOnBlur: false, validateOnChange: true}
});
