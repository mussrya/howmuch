var React = require('react');
import {connect} from 'react-redux';
import Comma from '../helpers/Formatter';
import Calculations from '../helpers/Calculations';

class TopMoneyBlock extends React.Component {

    render()
    {
        let topMoney = Calculations(this.props.apps);

        return (
            <div className="row">
                {
                    topMoney.map(
                        function (item, index)
                        {
                            return <div className="col-6 col-sm-3 text-center" key={index}>
                                <div className="whiteBox">
                                    <h4 className="text-muted padding-top-15">{item.name}</h4>
                                    <h1 className="h1--value">£{Comma(item.value)}</h1>
                                </div>
                            </div>
                        }
                    )
                }
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

export default connect(mapStateToProps)(TopMoneyBlock);