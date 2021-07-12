import React from "react";
import { Input, Tabs, Form, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const { TabPane } = Tabs;

const Profile = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const data = history.location.state.data;
  const [dataProfile,setDataProfile] = useState('');
  const [disable,setDisable] = useState<boolean>(false);
  React.useEffect(()=>{
   if(data){
       setDataProfile(data);
       setDisable(true);
       form.setFieldsValue(data)
   }
  },[data])
  function callback(key: any) {
    console.log(key);
  }

  const handleSubmit = () => {
      if(disable){
          setDisable(!disable);
      }
      else if(!disable){
          
      }
  };
  return (
    <div className="container">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Thông tin" key="1">
          <Form style={{maxWidth: '400px'}} form={form} onFinish={handleSubmit}>
            <Form.Item name="firstname">
              <Input
                style={{ color: "rgba(0,0,0,.7)" }}
                placeholder="First name"
                disabled={disable}
              />
            </Form.Item>
            <Form.Item name="lastname">
              <Input
                 style={{ color: "rgba(0,0,0,.7)" }}
                placeholder="Last name"
                disabled={disable}
              />
            </Form.Item>
            <Form.Item name="phone">
              <Input
                 style={{ color: "rgba(0,0,0,.7)" }}
                placeholder="Phone number"
                disabled={disable}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {disable ? "Thay đổi thông tin": "Hoàn thành"}
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Đổi mật khẩu" key="2">
          <Form style={{ maxWidth: "400px" }}>
            <Form.Item name="password">
              <Input
                style={{ color: "rgba(0,0,0,.7)" }}
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item name="password-new">
              <Input
                 style={{ color: "rgba(0,0,0,.7)" }}
                placeholder="Mật khẩu mới"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Hoàn thành
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
