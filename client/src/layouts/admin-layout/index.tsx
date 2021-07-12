import  React,{useState} from 'react';
import MenuAdmin from './menu';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import ManageProduct from '../../pages/admin/product';
import './style.scss';
import {Badge} from 'antd';
import Dashboard from '../../pages/admin/dashboard';
import MangerAccount from '../../pages/admin/account';
import socketIOClient from "socket.io-client";
import Notify from './notify';
import OrderForm from '../../pages/admin/order-form';
import {Irespone} from '../../constants/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'
import apis from '../../api';
import { SUCCESS } from '../../constants';
import MangerStatistical from '../../pages/admin/statistical';



const LayoutAdmin = () => {
    const [collapse,setCollapse] = useState(false);
    const [showNoti,setShowNoti] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data,setData] = useState('');
    const [count, setCount]: any = useState(0);
    const rule = localStorage.getItem("rule");
    const history = useHistory();
    const ENDPOINT  = "http://localhost:3002";
    React.useEffect(()=> {
        if(rule !== '2'){
           window.location.href = "/"
        }
    },[])
    
    // const socket = socketIOClient(ENDPOINT,{
    //     reconnectionDelay: 100,
    //     reconnection:true,
    //     reconnectionAttempts: 5000,
    //     transports: ['websocket', 'polling', 'flashsocket'],
    //     agent: false, // [2] Please don't set this to true
    //     upgrade: false,
    //     rejectUnauthorized: false
    // });
    React.useEffect(()=> {
        apis.getNotify().then(({data}:{data: Irespone}) =>{
            if(data.status === SUCCESS){
            setCount(data?.data?.length);
            setData(data.data)
            }
         
        })
    },[])
    // React.useEffect(() => {
        
    //     socket.on("Order", (data: any) => {
    //         if(data){
    //             setCount(data.length);
    //             setData(data);
    //             setLoading(false)
    //         }
    //     });
        
    // },[])
    
    const handleShowNotify = () => {
        setShowNoti(!showNoti);
    }
    const handlePreview = (id: string) => {
    //     socket.emit("Preview", id);
    //     socket.on('PreviewSuccess', (data: any) => {
    //         if(data){
    //                 history.push('/admin/order-form');
    //         }
    //     })
        
    }


  
    return (
        <div className="container-fluid layout-page">
            <div className="row justify-content-between">
                <div className="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3 pl-0 menu-admin
                ">
                    <MenuAdmin collapse={collapse} setCollapse={setCollapse} />
                </div>
                <div id="layout-content" className={`col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 layout-content ${collapse && 'layout-collapse'}`}>
                    <div className="layout-header d-flex justify-content-between">
                        <div><img src="/images/logo.png"/></div>
                        <div style={{paddingTop: '10px',paddingRight: '10px'}}>
                        
                        <div onClick={handleShowNotify} style={{display: 'block', cursor: 'pointer'}}>
                            <Badge count={count !== 0 ? count : null}>
                            <FontAwesomeIcon icon={faBell} style={{fontSize: '24px', color: '#675b5b'}}/>
                           {/* <i onBlur={()=>setShowNoti(false)} style={{fontSize: '24px', color: '#675b5b'}} className="fas fa-bell"></i>  */}
                        </Badge>
                            </div>
                          {showNoti && <Notify data={data} handlePreview={handlePreview}/>}
                        </div>
                    </div>
                    <div style={{marginTop: 70}}>
                    
                    </div>
                    <Switch>
                            <Route path="/admin/create-product" component={ManageProduct} />
                            <Route path="/admin/manager-account" component={MangerAccount} />
                            <Route path="/admin/statistical" component={MangerStatistical} />
                            <Route path="/admin/order-form" component={OrderForm} />
                            <Route path="/admin" exact component={Dashboard} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
export default LayoutAdmin;