import React, { useRef, useState } from "react";
import { DatePicker, Space, ConfigProvider, Input, Row, Col } from "antd";
import { Link, useHistory } from "react-router-dom";
import ResultComponent from "./Result";
import moment from "moment";
import tr from "antd/lib/locale/tr_TR";
import "antd/dist/antd.css";
import axios from "axios";

export default function AddExam({ setDate }) {
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const [answerKey, setKey] = useState();
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setStopTime] = useState("");

  const history = useHistory();

  const onChange = (dates, dateStrings) => {
    // console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    setStartTime(dateStrings[0].toString());
    setStopTime(dateStrings[1].toString());
    console.log("start:", startTime);
    console.log("stop", endTime);
  };

  function handleChange(e) {
    setKey(e.target.value);
  }

  async function handleSubmit() {
    try {
      await axios
        .post("http://localhost:8099/exam/create", {
          startTime: startTime,
          endTime: endTime,
          answerKey: answerKey,
        })
        .then(function (response) {
          console.log(response);
          // history.push("/success-create");
          setResult(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch {
      console.log("not created");
    }
  }

  const element = () => {};
  return (
    <div className="text-center">
      {!result ? (
        <Space direction="vertical" size={12}>
          <ConfigProvider locale={tr}>
            <div className="mb-3">
              <RangePicker
                ranges={{
                  Today: [moment(), moment()],
                  "This Month": [
                    moment().startOf("month"),
                    moment().endOf("month"),
                  ],
                }}
                showTime
                format="YYYY/MM/DD HH:mm:ss"
                onChange={onChange}
              />
            </div>
            <div className="card p-3 w-100" style={{ borderRadius: " 20px" }}>
              <div className="d-flex align-items-center justify-content-center  flex-column">
                <div
                  class="alert alert-danger"
                  style={{ padding: "5px" }}
                  role="alert"
                >
                  Lütfen Cevap Anahtarını Giriniz .
                </div>
                <TextArea rows={20} onChange={handleChange} />
                <button
                  className="teacher-btn "
                  style={{ width: "50%" }}
                  onClick={handleSubmit}
                >
                  Kaydet
                </button>
              </div>
            </div>
          </ConfigProvider>
        </Space>
      ) : (
        <ResultComponent message={"Sınavınız başarıyla kaydedildi ."} />
      )}
    </div>
  );
}
