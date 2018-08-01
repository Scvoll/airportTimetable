import React from 'react'

export const ListTitles = () => {
    return (
        <tr className='tableTitle'>
            <th>Рейс</th>
            <th>Направление</th>
            <th>Время</th>
            <th>Статус</th>
            <th>Терминал</th>
        </tr>
    )
};


export const AirList = (props) => {
    let rawList = props.list.filter((item) => {
        if (item.number.indexOf(props.input) !== -1) {
            return true
        }
    });
    return (
        rawList.map((item) => {
         return (
             <tr key={item.id}>
                 <td>{item.number}</td>
                 <td>{item.city}</td>
                 <td>{item.planTime}</td>
                 <td>{item.status}</td>
                 <td>{item.terminal}</td>
             </tr>
         );
        }))
};


export const Buttons = (props) => {
    return (
        <div className='buttons'>
            <button disabled={props.state === 'ARRIVAL'}
                    onClick={() => props.click("ARRIVAL")}>
                    Прилёт
            </button>
            <button disabled={props.state === 'DEPARTURE'}
                    onClick={() => props.click("DEPARTURE")}>
                    Вылет
            </button>
            <button disabled={props.state === 'DELAY'}
                    onClick={() => props.click("DELAY")}>
                    Задержки
            </button>
            <div className='anchor'><a href="#top" >&#8593;</a></div>
        </div>
    );
};