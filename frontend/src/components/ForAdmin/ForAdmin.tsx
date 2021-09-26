import {ColumnMenu} from "../common/ColumnMenu/ColumnMenu";
export const ForAdmin = () => {
    return (
        <div className={"common-grid"}>
            <ColumnMenu title={"Механизм бизнес-процессов"}
                        items={[
                            {text: "Оформление поездки", link: "/travel-arrangement"},
                            {text: "Список задач пользователей", link: "/tasks"},
                            {text: "Регистр адресации", link: "/addressing-register"},
                            {text: "Сотрудники", link: "/employees"},
                            {text: "Роли сотрудников", link: "/roles"},
                        ]}/>
            <ColumnMenu title={"Обмен с филиалами"}
                        items={[
                            {text: "Загрузить данные филиалов", link: "/branch-data-load"},
                            {text: "Обмен с филиалами", link: "/exchange-with-branches"},
                        ]}/>
            <ColumnMenu title={"Сервис"}
                        items={[
                            {text: "Название компании", link: "/company-name"},
                            {text: "Путь к папке с сообщениями", link: "/messages-folder-path"},
                        ]}/>
            <ColumnMenu title={"См. также"}
                        items={[
                            {text: "Общий журнал документов", link: "/general-document-journal"},
                        ]}/>
        </div>
    )
}