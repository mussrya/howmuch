var React = require('react');
var ReactDOM = require('react-dom');
var Style = require('./main.css');
import {Provider} from "react-redux";
import {createStore} from "redux";
import Store from './store/Store';
import reducers from './store/reducers';
const store = createStore(reducers);

import Home from './components/Home';
import TopMoneyBlock from './components/TopMoney';

store.subscribe(
    () =>
    {
        //console.log(store.getState());
    }
);

var Header = React.createClass(
    {
        render: function ()
        {
            return (
                <div className="row header">
                    <div className="col-xs-3">
                        <a href="/"><h3>HowMuch</h3></a>
                    </div>
                </div>
            )
        }
    }
);

var Footer = React.createClass(
    {
        render: function ()
        {
            return (
                <footer className="footer">
                    <div className="container">
                        <p className="text-muted">Copyright 2017</p>
                    </div>
                </footer>
            )
        }
    }
);

var HomePage = React.createClass(
    {
        render: function ()
        {
            return (
                <div>
                    <div className="container-fluid">
                        <Header/>
                        <Store store={store}/>
                        <TopMoneyBlock />
                        <Home />
                    </div>
                </div>
            )
        }
    }
);

ReactDOM.render(
    <Provider store={store}>
        <HomePage/>
    </Provider>,
    document.getElementById('app')
);