import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import Swal from 'sweetalert2'
import {loginAPI} from "../api/api";
import {sha512} from "js-sha512";
import {UserInstance} from "./User";

const plugins = {
  dvr: dvr({
    package: validatorjs,
    extend: ({ validator, form }) => {
      const messages = validator.getMessages('en');
      messages.required = 'Поле обязательно для заполнения';
      messages.email = 'Некорректный формат email';
      messages.between = 'Поле должно содержать от :min до :max символов';
      validator.setMessages('en', messages);
    }
  }),
};

const fields = [{
  name: 'email',
  label: 'Email',
  placeholder: 'Введите Email',
  rules: 'required|email|string',
  type: 'email'
}, {
  name: 'password',
  label: 'Пароль',
  placeholder: 'Введите пароль',
  rules: 'required|string|between:8,63',
  type: 'password'
}];


const hooks = {
  onSuccess(form) {
    try {
      loginAPI.login(form.values().email, sha512(form.values().password + "fn29%$H37y(*&JFd092h3")).then(response => {
        if (response !== "error") {
          UserInstance.login(response[0].Title)
          localStorage.setItem('token', response[1].jwtToken)
        } else {
          Swal.fire('Ошибка', 'Неправильный пароль', 'error')
        }
      })
    } catch (e) {
      Swal.fire('Ошибка', String(e), 'error')
    }
  },
  onError() {
    Swal.fire('Ошибка', 'Введите корректные данные', 'error')
  }
}

export const form = new MobxReactForm({fields}, {plugins, hooks});