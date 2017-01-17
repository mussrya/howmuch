var React = require('react');

class Store extends React.Component {
    constructor(props)
    {
        super(props);
        let data = JSON.parse(localStorage.getItem('howmuch'));

        if (!data) {
            data = [
            ];
            localStorage.setItem('howmuch', JSON.stringify(data));
        }

        data.map(function(item, index){
            item.type = 'ADDAPP';
            this.props.store.dispatch(item);
        }, this);

    }

    render()
    {
        return null;
    }

};

export default Store;