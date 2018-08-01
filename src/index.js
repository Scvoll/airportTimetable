import React from 'react'
import {render} from 'react-dom'
import {Buttons, ListTitles} from "./containers"
import {AirList} from "./containers"
import '../styles/style.scss'


class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            arrival: [],
            departure: [],
            filter: "ARRIVAL",
            search: "",
            preloader: 4
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        let timer = setInterval(() => {
            this.setState((prevState) => ({preloader: prevState.preloader +=0.07}))
        },100);
        let a = new XMLHttpRequest();
        a.open('get', 'http://localhost:5000/data', true);
        a.send();
        a.onload = function () {
            let arr = JSON.parse(a.responseText);
            clearInterval(timer);
            this.setState({
                arrival: arr[0],
                departure: arr[1],
        })}.bind(this)
    }

    render () {
        if(this.state.arrival.length !== 0) {
            return (
                 <div className='app'>
                     <a name="top"></a>
                     <div className='title'>Онлайн-табло Шереметьево</div>
                     <input ref={el => this.inputTitle = el}
                            onChange={this.handleChange}/> Поиск по номеру рейса
                     <Buttons state={this.state.filter}
                              click={this.handleClick}/>
                     <table>
                         <tbody>
                             <ListTitles/>
                             <AirList list={this.setResults()}
                                      input={this.state.search}/>
                         </tbody>
                     </table>
                 </div>
            )
        } else {
            return (
                <div className='preloader'
                     style={{fontSize: this.state.preloader + 'em'}}>&#8987;</div>
            )
        }
    }

    handleChange(e) {
        this.setState({search: e.target.value.toUpperCase().trim()});
    }


    handleClick (filter) {
        this.setState ({
            filter: filter,
            search: '',
        });
        this.inputTitle.value = '';
    }


    setResults () {
        switch (this.state.filter) {
            case "ARRIVAL":
                return this.state.arrival;
            case "DEPARTURE":
                return this.state.departure;
            case "DELAY":
                return [...this.state.arrival,...this.state.departure].filter((item) => {
                    if (item.status.indexOf("задержан") !== -1) {
                        return true;
                    }
                })
        }
    }
}

render(
    <App/>,
    document.getElementById('root')
);