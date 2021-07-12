import React, { useEffect } from "react";
import apis from "../../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faDollarSign, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./style.scss";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Irespone } from "../../../constants/interface";
import { SUCCESS } from "../../../constants";
import FormatMoney from "../../../components/format-money";

const MangerStatistical = () => {
  const [order, setOrder] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [total, setTotal] = React.useState(0);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    apis.getAllOrder().then((data: any) => {
      if (data) {
        setOrder(data?.data?.data?.reverse());
        setLoading(false);
        let sumTotal = 0;
        data?.data?.data?.forEach((item: any) => sumTotal = sumTotal + item.product?.sum_price);
        setTotal(sumTotal);
      }
    });
  }, []);
  React.useEffect(()=> {
    apis.getAccount().then(({data}: {data: Irespone})=>{
       if(data.status === SUCCESS){
          setAccount(data.data);
          setLoading(false)
       }
    })
},[])
  return (
    <div>
      <div className="row list-statistical">
        <div className="col-3">
          <div className="card-infor">
            <h5>Tài khoản</h5>
            <div>{account?.length}</div>
            <div className="card-infor__icon card-infor__icon-account"><FontAwesomeIcon icon={faUserCircle}/></div>
          </div>
        </div>
        <div className="col-3">
          <div className="card-infor">
            <h5>Đơn hàng</h5>
            <div>{order?.length}</div>
            <div className="card-infor__icon card-infor__icon-order"><FontAwesomeIcon icon={faChartBar}/></div>
          </div>
        </div>
      
      <div className="col-3">
        <div className="card-infor">
          <h5>Lượt xem</h5>
          <div>13131313</div>
          <div className="card-infor__icon card-infor__icon-follow"><FontAwesomeIcon icon={faEye}/></div>

        </div>
      </div>
      <div className="col-3">
        <div className="card-infor">
          <h5>Doanh thu</h5>
          <div><FormatMoney money={total} /> </div>
          <div className="card-infor__icon card-infor__icon-total"><FontAwesomeIcon icon={faDollarSign}/></div>

        </div>
      </div>
    </div>
    </div>
    
  );
};
export default MangerStatistical;
