import {ColumnMenu} from "../common/ColumnMenu/ColumnMenu";

export const ForAgent = () => {
    return (
        <div className={"common-grid"}>
            <ColumnMenu title={"Клиентский договора"}
                        items={[
                            {text: "Предварительное соглашение", link: "/preliminary-agreement"},
                            {text: "Клиентский договора", link: "/contracts"},
                            {text: "Список ваучеров", link: "/vouchers"},
                            {text: "Клиенты", link: "/clients"},
                        ]}/>
        </div>
    )
}