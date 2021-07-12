import React, { useState } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import apis from "../../api";
import { Irespone } from "../../constants/interface";
import FormatMoney from "../format-money";
import LoadingPage from "../LoadingPage";
import "./style.scss";
import { useHistory } from "react-router-dom";
const { Option } = Select;

interface PropsDrawer {
  visible?: boolean;
  setVisible?: any;
}
const DrawerFormFilter = (props: PropsDrawer) => {
  const history = useHistory();
  const { visible, setVisible } = props;
  const [data, setData] = useState<
    {
      color: any,
      createdAt: string,
      description: string,
      image: string,
      percent_sale: number,
      size: any,
      title: string,
      updatedAt: string,
      _id: string,
      price: number,
      price_sale: number
    }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const handleGotoDetail = (id: string) => {
      history.push(`/product/${id}`);
      onClose();
  };
  const handleSearch = (e: any) => {
    let keySearch: string | null = null;
    if (e?.target?.value) {
      keySearch = e?.target?.value;
      setLoading(true);
      setTimeout(() => {
        apis
          .searchProduct(keySearch)
          .then((data: any) => {
            console.log(data);
            if (data?.data?.result) {
              setData(data?.data?.result);
            } else setData([]);
            setLoading(false);
          })
          .catch((err) => {
            setData([]);
            setLoading(false);
          });
      }, 3000);
    }
  };

  const loadingMarkup = loading ? <LoadingPage /> : null;
  return (
    <Drawer
      title="Tìm kiếm sản phẩm"
      width="100%"
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        </div>
      }
    >
      {loadingMarkup}
      <Row gutter={16}>
        <Col span={24}>
          <Input
            onChange={handleSearch}
            placeholder="Nhập tên sản phẩm muốn tìm kiếm"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        {data.length > 0 && Array.isArray(data) ? (
          data?.map((item: any, index: number) => (
            <Col
              onClick={() => handleGotoDetail(item._id)}
              className="product_search-item"
              span={6}
              key={index}
            >
              <Row>
                <Col span={6}>
                  <img width="100%" src={item.image} alt="" />
                </Col>
                <Col className="product_search-content" span={18}>
                  <h5>{item.title}</h5>
                  <div className="product_search-price">
                    <span>
                      <FormatMoney money={item.price} />
                    </span>
                    <span>
                      <FormatMoney money={item.price_sale} />
                    </span>
                  </div>
                </Col>
              </Row>
            </Col>
          ))
        ) : (
          <div>Không có sản phẩm được tìm kiếm</div>
        )}
      </Row>
    </Drawer>
  );
};

export default DrawerFormFilter;
