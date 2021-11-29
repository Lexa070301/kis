import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import Swal from 'sweetalert2'
import Agents from "./Agents";
import {toJS} from "mobx";
import Cities from "./Cities";
import {documentsAPI} from "../api/api";
import Contract from "./Contract";
import Contracts from "./Contract";


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
        form.$('cities').each((item) => item.reset())
        form.$('hotels').each((item) => item.reset())
        Cities.currentCountry = e.label
    },
}

export const citiesHandlers = {
    onChange: (field) => (e) => {
        field.set(e);
        const currentHotel = form.$(`hotels[hotel${Number(field.name.replace("city", ""))}]`)
        currentHotel.reset()
    },
}

const contractHandlers = {
    onChange: (field) => async (e) => {
        field.set(e);
        await Contract.setCurrentContract(e.value)
        const contract = Contracts.currentContract

        form.$('membersCount').set(contract?.MembersCount)
        form.$('startDate').set(contract?.StartDate)
        form.$('endDate').set(contract?.EndDate)
        if (!contract?.OrganizationId)
            form.$('organization').reset()
        else
            form.$('organization').set({value: contract?.OrganizationId, label: contract?.Organization})
        if (!contract?.EmployeeId)
            form.$('agent').reset()
        else
            form.$('agent').set({value: contract?.EmployeeId, label: contract?.Employee})
        form.$('client').set({value: contract?.ClientId, label: contract?.Client})
        if (Contracts.currentCountry.id) {
            form.$('country').set({value: Contracts.currentCountry.id, label: Contracts.currentCountry.Name})
            if (Contracts.currentCountry.Name !== null) {
                Cities.currentCountry = Contracts.currentCountry.Name
            }
            form.$(`cities`).reset()
            form.$(`hotels`).reset()
            form.$(`startDates`).reset()
            form.$(`endDates`).reset()
            Contracts.currentCities?.forEach((item, index) => {
                let number = index + 1
                form.$('hotels').add(
                    {
                        name: 'hotel' + number,
                        label: 'Отель',
                        rules: 'required',
                        placeholder: 'Выберите отель',
                        output: (hotel) => hotel && hotel.value
                    }
                )
                form.$('startDates').add(
                    {
                        name: 'startDate' + number,
                        label: 'Дата начала',
                        placeholder: 'Введите дату',
                        rules: 'required|size:10',
                        type: 'date',
                    }
                )
                form.$('endDates').add(
                    {
                        name: 'endDate' + number,
                        label: 'Дата окончания',
                        placeholder: 'Введите дату',
                        rules: 'required|size:10',
                        type: 'date',
                    }
                )
                form.$('cities').add(
                    {
                        name: 'city' + number,
                        label: 'Город',
                        rules: 'required',
                        handlers: citiesHandlers,
                        placeholder: 'Выберите город',
                        output: (city) => city && city.value
                    }
                )
                form.$(`cities[city${number}]`).set({value: item.Id, label: item.City})
            })
        }
        form.$(`cities`).each((item, index) => {
            if (!item.value) {
                item.del()
            }
        })
        form.$('preliminaryAgreement').set({
            value: contract?.PreliminaryAgreementId,
            label: "№ " + contract?.PreliminaryAgreement + " от " + contract?.PreliminaryAgreementDate
        })
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
    name: 'preliminaryAgreement',
    label: 'Соглашение',
    handlers: contractHandlers,
    placeholder: 'Введите соглашение',
    rules: 'required',
    output: preliminaryAgreement => preliminaryAgreement && preliminaryAgreement.value
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
    name: 'members',
    label: 'Участники поездки',
    rules: 'required',
    placeholder: 'Выберите участников поездки',
    output: members => members && members.map(item => toJS(item).value)
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
    name: 'sum',
    label: 'Сумма',
    placeholder: 'Сумма',
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
}, {
    name: 'cities',
    fields: []
}, {
    name: 'hotels',
    fields: []
}, {
    name: 'startDates',
    fields: []
}, {
    name: 'endDates',
    fields: []
},];


const hooks = {
    onSuccess(form) {
        const hotels = Object.values(form.values().hotels).map((item, index)=> {
            return {
                hotel: item,
                startDate: Object.values(form.values().startDates)[index],
                endDate: Object.values(form.values().endDates)[index]
            }
        })
        try {
            documentsAPI.addContract(
                form.values().date,
                form.values().number,
                form.values().startDate,
                form.values().endDate,
                form.values().membersCount,
                form.values().agent,
                form.values().organization,
                form.values().preliminaryAgreement,
                form.values().client,
                form.values().sum,
                form.values().members,
                hotels,
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

export const form = new MobxReactForm({fields}, {
    plugins,
    hooks,
    options: {validateOnBlur: false, validateOnChange: true}
});