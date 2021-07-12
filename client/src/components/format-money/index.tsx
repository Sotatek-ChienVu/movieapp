import React from 'react';

const FormatMoney = React.memo((props: any) => {
    const {money} = props;
    return(
        <>{new Intl.NumberFormat('de-DE').format(money)}đ</>
    )
});

export default FormatMoney;