import React, { useState, useRef   } from "react";
import { Image, Pagination } from "antd";
import "./style.scss";
import apis from "../../../api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player/lazy";
import { Link } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import MessengerCustomerChat from 'react-messenger-customer-chat';
const HomePage = () => {
  const [product, setProduct] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loading,setLoading] = useState(true);
  const message: any = useRef();
  const handleChangePage = (page: number) => {
    setCurrent(page);
    setLoading(true);
    apis
      .getProductPage(page)
      .then((resp: any) => {
        setProduct(resp.data.product);
        setLoading(false);
      });
  };
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  React.useEffect(() => {
    apis.getProductPage(1).then((resp: any) => {
      if(resp){
        setProduct(resp.data.product);
        setLoading(false);
      }
      });
  }, []);
  if(loading){
    return <LoadingPage />
  }
  return (
    <>
      <div className="home-page container">
        <div className="row">
          <div className="home-slide">
            <Image src="/images/slide.jpg" />
            <div className="d-flex">
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 card-intro">
                <img src="/images/ship.png" />
                <h5>Giao hàng toàn quốc</h5>
                <p>Vận chuyển khắp Việt Nam</p>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 card-intro">
                <img src="/images/payment.png" />
                <h5>Thanh toán khi nhận hàng</h5>
                <p>Nhận hàng tại nhà rồi thanh toán</p>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 card-intro">
                <img src="/images/warranty.png" />
                <h5>Bảo hành dài hạn</h5>
                <p>Bảo hành lên đến 60 ngày</p>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 card-intro">
                <img src="/images/change_product.png" />
                <h5>Đổi hàng dễ dàng</h5>
                <p>Đổi hàng thoải mái trong 30 ngày</p>
              </div>
            </div>
          </div>
          
          <div className="home-content">
            <h2 className="home-content-title">Sản phẩm của shop</h2>
            <div className="row">
              {Array.isArray(product) &&
                product.length > 0 &&
                product?.map((item: any, index: number) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 product-card"
                    key={`card_${item._id}`}
                  >
                    <div>
                      <Link to={`/product/${item._id}`}><img width="100%" src={item.image} /></Link>
                      {item.percent_sale && (
                        <span className="product-card_percent">
                          Giảm {item.percent_sale}%
                        </span>
                      )}
                      <p className="product-card_title">{item.title}</p>
                      <p>
                        <span className="product-card_price-sale">
                          {item.price_sale && `${item.price_sale}đ`}
                        </span>{" "}
                        <span
                          className={
                            item.price_sale
                              ? "product-card_price"
                              : "product-card_price-bold"
                          }
                        >
                          {item.price && item.price}đ
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            {product ? (
              <Pagination
                current={current}
                onChange={handleChangePage}
                total={50}
              ></Pagination>
            ) : null}
          </div>
          <div className="home-feedback">
            <h2 className="home-content-title">Khách hàng nói gì về menshop</h2>
            <Carousel
              showThumbs={false}
              centerSlidePercentage={3}
              selectedItem={3}
              showStatus={false}
              showArrows={false}
              emulateTouch={true}
              infiniteLoop={true}
              onChange={(e) => {
              }}
            >
              <div className="slide-item">
                <div>
                  <p>
                    Giày bên shop có nhiều mẫu đẹp lắm , nhưng mà mình ưa mỗi
                    van cá mập thôi , vừa mới mua bên shop, giày vừa, đẹp, sau
                    ra mua ủng hộ shop tiếp
                  </p>
                </div>
                <span>Đức Nguyễn</span>
              </div>
              <div className="slide-item">
                <div>
                  <p>
                    {" "}
                    Em mua đôi converse của shop cách đây 2 days 💙 Rất đẹp
                    ạ.Giao hàng cũng rất nhanh. Mọi người nhớ ghé ủng hộ shop
                    nhá 💦. Có dịp em sẽ ghé lại shop!
                  </p>
                </div>
                <span>Nguyễn Thị Lan Chinh</span>
              </div>
              <div className="slide-item">
                <div>
                  <p>
                    {" "}
                    Mới mua nên chưa biết độ bền thế nào nhưng giày đẹp, đúng
                    đợt khuyến mãi nên giá rẻ, chủ shop nhiệt tình, shop nhiều
                    quà tặng và ưu đãi.
                  </p>
                </div>
                <span>Nguyễn Thạch Thảo</span>
              </div>
              <div className="slide-item">
                <div>
                  <p>
                    {" "}
                    2 lần mua ở shop rồi chất lượng và mọi thứ đều Oke ủng hộ
                    shop dài. Cảm ơn shop đã có nhiều đôi giày đẹp . Shop nhớ
                    cập nhật mẫu mã liên tục nhé
                  </p>
                </div>
                <span>Hoàng Minh Tâm</span>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="home-count">
        <div className="container px-0">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 pl-0">
              <p className="text-intro">
                MENSHOP luôn mang đến cho khách hàng những sản phẩm chất lượng
                tốt nhất với giá cả hơp lí nhất đến tay người tiêu dùng với
                phương châm thuận mua vừa bán và chất lượng luôn đặt lên hàng
                đầu .
              </p>
              <h1>1 349 840</h1>
              <p className="text-description">Số Sản phẩm đã bán</p>
              <h1>567 789</h1>
              <p className="text-description">Khách Hàng Đã Mua</p>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 pr-0">
              <ReactPlayer width="100%" height="400px" url="https://www.youtube.com/watch?v=V82P_JP7Drc" />
            </div>
          </div>
        </div>
        </div>
    </>
  );
};

export default HomePage;
