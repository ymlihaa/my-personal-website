import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import AddExam from "./AddExam";
import ListedExam from "./ListedExam";
// import { Alert } from "react-bootstrap";
import UpdateProfile from "./UpdateProfile";
// import star from "./stars.svg";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Update } from "@material-ui/icons";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const [content, setContent] = useState("addExam");

  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    Update();
  });

  // return (
  //   <>
  //     {/* className="container d-flex flex-column align-items-center */}
  //     {/* justify-content-center w-100 " */}
  //     {/* <form>
  //             <div class="form-group">
  //               <label for="formGroupExampleInput">Example label</label>
  //               <input
  //                 type="text"
  //                 class="form-control"
  //                 id="formGroupExampleInput"
  //                 placeholder="Example input"
  //               />
  //             </div>
  //             <div class="form-group">
  //               <label for="formGroupExampleInput2">Another label</label>
  //               <input
  //                 type="text"
  //                 class="form-control"
  //                 id="formGroupExampleInput2"
  //                 placeholder="Another input"
  //               />
  //             </div>
  //           </form> */}
  //     {/* <h2 className="text-center mb-4">Profile</h2> */}
  //     {/* {error && <Alert variant="danger">{error}</Alert>} */}
  //     {/* <strong>Email:</strong> {currentUser && currentUser.email} */}
  //     {/* <Link to="/update-profile" className="btn">
  //             Update Profile
  //           </Link> */}

  //     {/* <Datepicker /> */}
  //   </>
  // );

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleChange({ key }) {
    setContent(key);
  }

  const Update = () => {
    switch (content) {
      case "addExam":
        return (
          <div>
            <AddExam />
          </div>
        );
      case "deleteExam":
        return <div>hello delete Exam</div>;
      case "updateProfile":
        return <UpdateProfile />;
      case "listedExam":
        return <ListedExam />;
      default:
        return <div>no content</div>;
    }
  };

  return (
    <Layout>
      <Header className="header" style={{ backgroundColor: "#38d39f" }}>
        {/* <div className="logo" /> */}
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ backgroundColor: "#38d39f", color: "white" }}
        >
          <Menu.Item key="1">Profil</Menu.Item>
          <Menu.Item key="2">Sınavlar</Menu.Item>
          <Menu.Item key="3">Ayarlar</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleChange}
          >
            <SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title="Kullanıcı İşlemleri"
            >
              <Menu.Item key="updateProfile">Profili Güncelle</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<LaptopOutlined />}
              title="Sınav İşlemleri"
            >
              <Menu.Item key="addExam">Sınav Ekle</Menu.Item>
              <Menu.Item key="deleteExam">Sınav Sil</Menu.Item>
              <Menu.Item key="listedExam">Sınavları Listele</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Ayarlar">
              <Menu.Item key={"1"} onClick={handleLogout}>
                Çıkış Yap
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: "100vh",
            }}
          >
            <Update />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
