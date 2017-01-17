export default function(totalNumber){
    let summedTotal = totalNumber.reduce(add, 0);

    function add(a, b) {
        return a + b.cost;
    }

    let topMoney = [
        {
            name: '1 Month',
            value: summedTotal
        },
        {
            name: '3 Months',
            value: summedTotal * 3
        },
        {
            name: '1 Year',
            value: summedTotal * 12
        },
        {
            name: '3 Years',
            value: summedTotal * 36
        }
    ];

    return topMoney;
};