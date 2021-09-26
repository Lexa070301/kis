import {ColumnMenu} from "../common/ColumnMenu/ColumnMenu";
export const ForManager = () => {
    return (
        <div className={"common-grid"}>
            <ColumnMenu title={"Компания"}
                        items={[
                            {text: "Организации", link: "/organizations"},
                            {text: "Агенты", link: "/agents"},
                        ]}/>
            <ColumnMenu title={"Клиентский договора"}
                        items={[
                            {text: "Предварительное соглашение", link: "/preliminary-agreement"},
                            {text: "Клиентский договора", link: "/contracts"},
                            {text: "Список ваучеров", link: "/vouchers"},
                            {text: "Клиенты", link: "/clients"},
                        ]}/>
            <ColumnMenu title={"Отчеты"}
                        items={[
                            {text: "Динамика продаж", link: "/sales-trend"},
                            {text: "Неоплаченные договора", link: "/unpaid-contracts"},
                            {text: "Эффективность работы филиалов и агентов", link: "/performance-of-branches-and-agents"},
                        ]}/>
            <ColumnMenu title={"Гостиницы"}
                        items={[
                            {text: "Страны мира", link: "/countries"},
                            {text: "Города мира", link: "/cities"},
                            {text: "Гостиницы", link: "/hotels"},
                            {text: "Виды номеров гостиниц", link: "/types-of-hotel-rooms"},
                        ]}/>
        </div>
    )
}