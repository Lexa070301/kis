import {ColumnMenu} from "../common/ColumnMenu/ColumnMenu";
export const ForAccountant = () => {
    return (
        <div className={"common-grid"}>
            <ColumnMenu title={"Валютный учет"}
                        items={[
                            {text: "Валюты", link: "/currencies"},
                            {text: "Курсы валют", link: "/currency-rates"},
                        ]}/>
            <ColumnMenu title={"Клиентский договора"}
                        items={[
                            {text: "Клиентский договора", link: "/contracts"},
                            {text: "Оплаты", link: "/payments"},
                            {text: "Клиенты", link: "/clients"},
                            {text: "Организации", link: "/organizations"},
                        ]}/>
            <ColumnMenu title={"Отчеты"}
                        items={[
                            {text: "Неоплаченные договора", link: "/unpaid-contracts"},
                        ]}/>
            <ColumnMenu title={"Сервис"}
                        items={[
                            {text: "Загрузка курсов валют", link: "/currency-rates-load"},
                        ]}/>
        </div>
    )
}