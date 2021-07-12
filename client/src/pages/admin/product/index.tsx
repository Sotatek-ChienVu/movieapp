import React, { useState } from "react";
import {
  Form,
  Button,
  Input,
  Table,
  Popconfirm,
  Image,
  notification,
} from "antd";
import UploadFile from "../../../components/uploadFile";
import ModalCreateProduct from "./modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import apis from "../../../api";
import ModalAntd from "../../../components/Modal";
import { SUCCESS } from "../../../constants";
import './style.scss';
import LoadingPage from "../../../components/LoadingPage";
import ButtonCustom from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ManageProduct = () => {
  const [form] = Form.useForm();
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [keySearch,setKeySearch] = useState('');
  const [product, setProduct]: any = useState([]);
  const [listUrl, setListUrl]: any = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [shoeType, setShoeType] = useState('');
  const handleSubmit = (e: any) => {
    setVisible(false);
    apis.createProduct(e).then((resp: any) => {
      if (resp?.data.status === SUCCESS) {
        if(e.price_sale){
          setProduct([...product, {...e,percent_sale: Math.ceil((1 - (e.price_sale/e.price))*100)}]);
        }
       else setProduct([...product, {...e, percent_sale: null}]);
      }
    });
    form.resetFields();
    setUrl('');
    setListUrl('');
  };
  const handleGetProduct  = () => {
    apis.getProduct().then((resp) => {
      if(resp){
        setLoading(false)
      }
      if(resp.data.status === SUCCESS){
        setProduct(resp.data.data);
        
      }
    });
  }
  React.useEffect(() => {
    apis.getProduct().then((resp) => {
      if(resp){
        setLoading(false)
      }
      if(resp.data.status === SUCCESS){
        setProduct(resp.data.data);
        
      }
    });
  }, []);
  console.log(product)
  const columns = [
    {
      key: 2,
      title: "Name product",
      dataIndex: "title",
    },
    {
      key: 3,
      title: "Description",
      dataIndex: "description",
    },
    {
      key: 4,
      title: "Price",
      dataIndex: "price",
    },
    {
      key: 5,
      title: "Price Sale",
      dataIndex: "price_sale",
    },
    {
      key: 6,
      title: "Percent Sale",
      dataIndex: "percent_sale",
    },
    {
      key: 7,
      title: "image",
      dataIndex: "image",
      render: (text: string, record: any, index: number) => (
        <Image width={40} src={record.image} />
      ),
    },
    {
      key: 8,
      title: "",
      render: (text: string, record: any, index: number) => (
        <div>
          <Popconfirm
            onConfirm={() => DeleteProduct(record?._id)}
            placement="leftTop"
            title="Bạn chắc chắn muốn xóa nhân viên này ?"
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn-delete" shape="circle">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Button
            className="ml-2"
            onClick={() => onOpenEdit(record)}
            shape="circle"
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];
  const DeleteProduct = (e: any) => {
    apis.deleteProduct({ id: e }).then((resp: any) => {
      if (resp.data.status === SUCCESS) {
        notification.success({ message: "Delete success" });
        const dataNew = product?.filter((el: any) => el._id !== e);
        setProduct(dataNew);
      }
    });
  };

  const onOpenEdit = (e: any) => {
    setEdit(true);
    setVisible(true);
    setDataEdit(e);
  };

  const handleEdit = (e: any) => {
      setVisible(false);
      setEdit(false);
       apis.updateProduct({id: e.id, data: e?.e}).then((resp: any)=> {
           if(resp?.data.status === SUCCESS){
               notification.success({message: 'Edit success'});
               const dataNew = product.map((el: any) => {
                 if(el?._id === e.id){
                     const elNew = e?.e;
                     
                   return {...elNew,_id: el._id, percent_sale: e.percent_sale} 
                 }
                 return el;
               })
               setProduct(dataNew);
           }
       });
       form.resetFields()
       setUrl('');
       setListUrl('');
  };
 
  const handleSearchChange = (e: any) => {
      setKeySearch(e.target.value)
      if(e.target.value === ''){
        handleGetProduct();
      }
  }

  const handleSearch =() => {
    apis.searchProduct(keySearch).then((resp: any) =>{
      setProduct(resp.data.result)
    })
  }

  // if(loading){
  //   return <LoadingPage />
  // }
  return (
    <>
      <div className="d-flex justify-content-between pt-4">
        <Form style={{ width: "40%", display: "flex" }}>
          <Form.Item style={{ width: "80%" }}>
            <Input onChange={handleSearchChange}/>
          </Form.Item>
          <Form.Item>
            <Button style={{borderLeft: 'none', height: '40px'}} onClick={handleSearch}><FontAwesomeIcon icon={faSearch}/></Button>
          </Form.Item>
        </Form>
        <ButtonCustom mode="blue" onClick={() => setVisible(true)}>
          + Create Product
        </ButtonCustom>
        {visible &&
        <ModalCreateProduct
          handleEdit={handleEdit}
          setEdit={setEdit}
          dataEdit={dataEdit}
          edit={edit}
          visible={visible}
          setVisible={setVisible}
          form={form}
          url={url}
          setUrl={setUrl}
          shoeType={shoeType}
          setShoeType={setShoeType}
          listUrl={listUrl}
          setListUrl={setListUrl}
          handleSubmit={handleSubmit}
        />
        }
      </div>
      <div className="product-content pt-3">
        <Table columns={columns} dataSource={product} size="middle" />
      </div>
    </>
  );
};

export default ManageProduct;
