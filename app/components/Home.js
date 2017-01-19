var React = require('react');
import {bindActionsCreators} from 'redux';
import {connect} from 'react-redux';
import GetApp from '../helpers/AllApps';
import SideMenu from '../components/SideMenu';
import Calculations from '../helpers/Calculations';
import Comma from '../helpers/Formatter';

class MainBlock extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            allApps: GetApp()
        };

        this.editApp.bind(this);

    }

    editApp(item)
    {
        item.type = 'EDTIAPP';
        item.active = true;
        item.cost = parseInt(item.cost);
        this.props.dispatch(
            item
        );
    }

    render()
    {
        let view = null;
        let activeApp = false;
        let viewingApp = false;

        if (this.props.apps.length) {
            this.props.apps.map(
                function (item, key)
                {
                    if (item) {
                        if (typeof(item.active) !== 'undefined' && item.active) {
                            activeApp = item;
                        } else if (typeof(item.viewingApp) !== 'undefined' && item.viewingApp) {
                            viewingApp = item;
                        }
                    }
                }
            );
        }

        if (activeApp) {
            view = <EditApp app={activeApp} store={this.props.dispatch}/>;
        } else if (viewingApp) {
            view = <ViewApp app={viewingApp} store={this.props.dispatch}/>;
        } else {
            view = <MainView allApps={this.state.allApps} editAction={this.editApp.bind(this)}/>;
        }

        return (
            <div>
                <div className="row mainBlock">
                    <SideMenu />
                    <div className="col-7 col-sm-8">
                        <div id="mainBlock" className="resetPadding row-fluid whiteBox">
                            {view}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

var MainView = React.createClass(
    {
        render: function ()
        {
            return (
                <div>
                    <h4 className="text-center muted padding-top-30">Add Outgoing</h4>
                    <div className="paddedContainer">
                        <div className="row">
                            {
                                this.props.allApps.map(
                                    function (app, index)
                                    {
                                        return <div key={index} className="col-12 col-sm-6 col-md-4">
                                            <div className="entryBox" onClick={() => this.props.editAction(app)}>
                                                <div className="appIcon text-center">
                                                    <div className="fa-container">
                                                        <i className={"fa " + app.icon}></i>
                                                    </div>
                                                    <h4 className="margin-top-10">{app.name}</h4>
                                                </div>
                                            </div>
                                        </div>;
                                    }, this
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
);

class EditApp extends React.Component {

    constructor(props)
    {
        super(props);
        let appCost = (this.props.app.cost > 0) ? this.props.app.cost : '';
        let appTitle = (this.props.app.title) ? this.props.app.title : '';

        this.state = {
            value: appCost,
            title: appTitle
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event)
    {
        if (event.target.name === 'cost') {
            this.setState({value: parseInt(event.target.value)});
        } else {
            this.setState({title: event.target.value});
        }
    }

    handleSave()
    {
        this.props.store(
            {
                type: 'UPDATEAPP',
                id: this.props.app.id,
                name: this.props.app.name,
                title: this.state.title,
                cost: this.state.value,
                icon: this.props.app.icon,
                active: false
            }
        );
    }

    handleKeyPress(event)
    {
        if (event.key === 'Enter') {
            this.handleSave(event);
        }
    }

    render()
    {
        return (
            <div>
                <h4 className="text-center muted padding-top-10">Add Outgoing</h4>
                <div className="paddedContainer">
                    <div className="row">
                        <h4 className="muted">{this.props.app.name}</h4>
                    </div>

                    <div className="row margin-top-15">
                        <h4>Title</h4>
                    </div>
                    <div className="row">
                        <input name="title" placeholder="Expenditure Title" className="col-12 reducePadding"
                               value={this.state.title} onChange={this.handleChange}/>
                    </div>
                    <div className="row margin-top-15">
                        <h4>Cost Per Month</h4>
                    </div>
                    <div className="row">
                        <input name="cost" type="number" placeholder="Cost Per Month"
                               className="col-12 reducePadding"
                               value={this.state.value} onKeyPress={this.handleKeyPress} onChange={this.handleChange}/>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-outline-primary margin-top-15"
                                onClick={this.handleSave}>
                            Save
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}

class ViewApp extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose()
    {
        let item = {};
        item.type = 'VIEWALL';
        this.props.store(
            item
        );
    }

    render()
    {
        let topMoney = Calculations(this.props.app);

        return (
            <div>
                <h4 className="text-center muted padding-top-30">{this.props.app.title}
                    <div onClick={() => this.handleClose()} className="closeBox"><span
                        className="hidden-xs-down">Close</span> <i className="fa fa-close"> </i></div>
                </h4>
                <div className="paddedContainer">
                    <div className="row">
                        {
                            topMoney.map(
                                function (item, index)
                                {
                                    return <div className="col-12 col-sm-6 col-md-3 text-center" key={index}>
                                        <div className="whiteBox">
                                            <h5 className="text-muted padding-top-15">{item.name}</h5>
                                            <h2 className="h1--value">£{Comma(item.value)}</h2>
                                        </div>
                                    </div>
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return {
        apps: state
    };
}

export default connect(mapStateToProps)(MainBlock);