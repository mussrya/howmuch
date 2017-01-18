export default function(totalNumber){
    let summedTotal;
    if(totalNumber.length > 1){
        summedTotal = totalNumber.reduce(add, 0);

        function add(a, b) {
            if(!b.cost || b.cost < 1){
                b.cost = 0;
            }
            return a + b.cost;
        }
    }else{
        if(!totalNumber.cost || totalNumber.cost < 1){
            totalNumber.cost = 0;
        }
        summedTotal = totalNumber.cost;
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