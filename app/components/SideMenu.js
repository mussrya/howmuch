var React = require('react');
import {connect} from 'react-redux';

class SideMenu extends React.Component {
    constructor(props)
    {
        super(props);
        this.removeApp.bind(this);
        this.editApp.bind(this);

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
        console.log(item);
        item.type = 'EDTIAPP';
        item.active = true;
        item.cost = parseInt(item.cost);
        this.props.dispatch(
            item
        );
    }

    render()
    {
        return (
            <div className="col-4">
                <div id="sideBlock" className="whiteBox resetPadding">
                    <h4 className="text-center muted padding-top-30">Saved Outgoings</h4>
                    <div className="paddedContainer--10">
                        {
                            this.props.apps.map(
                                function (item, index)
                                {
                                    return <div className="appBlock row" key={index}>
                                        <i className={"col-2 appIcon--border fa " + item.icon}> </i>
                                        <h5 className="col-7 margin-top-15">{item.name} - (£{item.cost})</h5>
                                        <div className="col-3 noPaddingLeftRight margin-top-15">
                                            <i onClick={() => this.removeApp(item)}
                                               className="pull-right removeItem fa fa-remove btn-circle btn-red"> </i>
                                            <i onClick={() => this.editApp(item)}
                                               className="pull-right editItem fa fa-pencil btn-circle btn-blue"> </i>
                                        </div>
                                    </div>
                                }, this
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

export default connect(mapStateToProps)(SideMenu);