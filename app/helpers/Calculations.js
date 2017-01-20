export default function (totalNumber)
{
    let summedTotal;
    if (totalNumber.length > 0) {

        summedTotal = totalNumber.reduce(add, 0);

        function add(a, b)
        {
            if (!b.cost || b.cost < 1) {
                b.cost = 0;
            }
            return a + b.cost;
        }
    } else {
        if (typeof(totalNumber) !== 'undefined' && typeof(totalNumber.cost) !== 'undefined') {
            summedTotal = totalNumber.cost;
        }
        else {
            summedTotal = 0;
        }
    }

    summedTotal = parseFloat(summedTotal).toFixed(1);

    let topMoney = [
        {
            name: '1 Month',
            value: (parseFloat(summedTotal) % 1 != 0) ? parseFloat(summedTotal).toFixed(1) : parseFloat(
                    summedTotal)
        },
        {
            name: '3 Months',
            value: (parseFloat(summedTotal * 3) % 1 != 0) ? parseFloat(summedTotal * 3).toFixed(1) : parseFloat(
                    summedTotal * 3
                )
        },
        {
            name: '1 Year',
            value: (parseFloat(summedTotal * 12) % 1 != 0) ? parseFloat(summedTotal * 12).toFixed(1) : parseFloat(
                    summedTotal * 12
                )
        },
        {
            name: '3 Years',
            value: (parseFloat(summedTotal * 36) % 1 != 0) ? parseFloat(summedTotal * 36).toFixed(1) : parseFloat(
                    summedTotal * 36
                )
        }
    ];

    return topMoney;
};