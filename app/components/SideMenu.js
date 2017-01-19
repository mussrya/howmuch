var React = require('react');
import {connect} from 'react-redux';

class SideMenu extends React.Component {
    constructor(props)
    {
        super(props);
        this.removeApp.bind(this);
        this.editApp.bind(this);
        this.viewApp.bind(this);

    }

    removeApp(item)
    {
        item.type = 'REMOVEAPP';
        this.props.dispatch(
            item
        );
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

    viewApp(item)
    {
        item.type = 'VIEWAPP';
        item.viewingApp = true;
        this.props.dispatch(
            item
        );
    }

    render()
    {
        return (
            <div className="col-5 col-sm-4">
                <div id="sideBlock" className="whiteBox resetPadding">
                    <h4 className="text-center muted padding-top-30">Saved Outgoings</h4>
                    <div className="paddedContainer--10">
                        {
                            (this.props.apps.length) ? this.props.apps.map(
                                    function (item, index)
                                    {
                                        return <div className="appBlock row" key={index}>
                                            <div className="col-12 col-md-2 noPadding"><i
                                                className={"appIcon--border fa " + item.icon}> </i></div>
                                            <div className="col-12 col-md-7 margin-top-15"><h5
                                                onClick={() => this.viewApp(item)}>
                                                {item.name} - (£{item.cost})
                                            </h5>
                                            </div>
                                            <div className="col-12 col-md-3 noPaddingLeftRight margin-top-15">
                                                <i onClick={() => this.removeApp(item)}
                                                   className="pull-right removeItem fa fa-remove btn-circle btn-red"> </i>
                                                <i onClick={() => this.editApp(item)}
                                                   className="pull-right editItem fa fa-pencil btn-circle btn-blue"> </i>
                                            </div>
                                        </div>
                                    }, this
                                ) : <h5 className="text-center margin-top-10 accent">No Apps Yet Added</h5>
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

export default connect(mapStateToProps)(SideMenu);