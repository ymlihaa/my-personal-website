import React from "react";

import { Result, Button } from "antd";
import { Link } from "@material-ui/core";

const ResultComponent = (props) => {
  return (
    <Result
      status="success"
      title="Tebrikler ..."
      subTitle={props.message}
      extra={[
        <Button type="primary" key="console">
          <Link to="/teacher">Anasayfa</Link>
        </Button>,
        <Button onClick={props.handleLogout}>Çıkış Yap</Button>,
      ]}
    />
  );
};

export default ResultComponent;
