import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import Swal from 'sweetalert2'
import {loginAPI} from "../api/api";
import {sha512} from "js-sha512";
import {UserInstance} from "./User";

const plugins = {
  dvr: dvr(validatorjs),
};

const fields = [{
  name: 'email',
  label: 'Email',
  placeholder: 'Введите Email',
  rules: 'required|email|string|between:5,25',
  type: 'email'
}, {
  name: 'password',
  label: 'Пароль',
  placeholder: 'Введите пароль',
  rules: 'required|string|between:5,25',
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