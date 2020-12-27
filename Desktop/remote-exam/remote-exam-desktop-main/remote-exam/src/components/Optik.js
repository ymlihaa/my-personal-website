/* eslint-disable */
import { Hearing, SignalCellularNullRounded } from "@material-ui/icons";
import axios from "axios";
import React, { Component } from "react";
import Button from "./Button";

class Optik extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      startIndex: 0,
      wait: false,
    };
    this.addClick = this.addClick.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.finishExam = this.finishExam.bind(this);
  }

  componentDidMount() {
    let tempArr = [];
    tempArr = { ...JSON.parse(localStorage.getItem("resultArr")) };

    let arr = [];
    arr = Object.keys(tempArr);

    // console.log("component-value", value);
    // sayfayı yüklerken
    // Eğerki App componentinden gelen propsun içindeki isFinish datası true ise
    // state deki finish i true yap
    // değilse state deki limit değerini ve localStorage ' daki resulArr ı güncelle
    this.setState({
      result: tempArr,
    });
    // console.log("cDM : optk", typeof tempArr);
  }

  // Componentte bir değişiklik meydana geldiğinde
  // localStorage daki resultArrı update et
  componentDidUpdate() {
    localStorage.setItem("resultArr", JSON.stringify(this.state.result));
  }

  // Button componenti içerisinden aldığı index ve flag bilgileri ne göre
  // arrayin index numaralı indisine flag datasını yazar
  // Sonrasında state i günceller
  addClick(index, flag) {
    const arr = { ...this.state.result };
    arr[index] = flag;
    this.setState({
      result: arr,
    });
  }

  async finishExam() {
    this.setState({
      wait: true,
    });
    await axios
      .post("http://localhost:8099/exam/finish", {
        data: {
          user: this.props.userInfo,
          result: this.state.result
            ? this.state.result
            : localStorage.getItem("result"),
        },
      })
      .then((response) => {
        console.log(response);
        this.props.setAlertType;
        this.setState({
          wait: false,
        });
        // this.props.setAlertType("finishAlert");
        // localStorage.removeItem("user");
      })
      .catch((error) => {
        this.setState({
          wait: false,
        });
        console.log(error);
      });
  }

  nextPage() {
    if (this.state.startIndex > 20) {
      this.props.setAlertType("upperAlert");
      return;
    }
    this.setState((prevState) => {
      return {
        startIndex: parseInt(prevState.startIndex) + 10,
      };
    });
  }

  prevPage() {
    console.log("click", this.state.startIndex);
    if (this.state.startIndex < 10) {
      this.props.setAlertType("lowerAlert");

      this.setState({
        alert: true,
      });
      return;
    }
    this.setState((prevState) => {
      return {
        startIndex: parseInt(prevState.startIndex) - 10,
      };
    });
  }
  render() {
    // İşaretlenin her bir soruyu local storage den getiriyor

    const localResultArr = {
      ...JSON.parse(localStorage.getItem("resultArr")),
    };

    // 10 ar 10 ar oluşturduğumuz Radio buttonlarımızı içerek olan dizi yi tanımlıyoruz
    const questionList = [];

    // Sınav tamamen bitince finish alert çalışacak
    const finishAlert = (
      <div className="alert alert-success" role="alert">
        Congratilations . Your finish exam . <h3>Results:</h3>
      </div>
    );

    // questinList in stil değişkeni
    const questionListStyle = {
      width: "100%",
      listStyleType: "none",
      display: " flex",
      justifyContent: "center",
      alignSelf: "center",
    };

    const s1 = {
      width: "100%",
    };
    const s2 = {
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "1em",
    };

    // App componentinden gelen startIndex bilgisinden başlayıp radio buttonlarımızı
    // 10 defa oluşturacak döngümüz
    // elementimizi her iterasyonda questionList e push luyoruz

    for (let i = this.state.startIndex; i < this.state.startIndex + 10; i++)
      [
        questionList.push(
          <>
            <span style={s2}>{i + 1}. Soru</span>
            <li className=" border rounded" style={questionListStyle} key={i}>
              <Button
                id={i}
                addclick={this.addClick}
                selectRadio={localResultArr[i] !== "" ? localResultArr[i] : ""}
              />
            </li>
          </>
        ),
      ];

    return (
      // App componentinden sınav tamamen bittiğinde finish bilgisi gönderilecek
      // Eğer sınav tamamen bittiyse finishAlert i çalıştır
      // Bitmediyse radio buttonları döndür

      <div className="card p-3 mb-5 bg-white rounded">
        <div className="card-body">
          {/* {!this.state.finish === true ? questionList : finishAlert} */}
          {questionList}
        </div>
        <div
          className="btn-group  d-flex 
            justify-content-center
            align-items-center
            pt-3"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            className="btn btn-primary  m-1"
            onClick={this.prevPage}
          >
            Önceki Sayfa
          </button>
          <button
            type="button"
            className="btn btn-success m-1"
            onClick={this.nextPage}
          >
            Sonraki Sayfa
          </button>
          <button
            onClick={this.finishExam}
            type="button"
            className="btn btn-danger  m-1"
            disabled={this.state.wait}
          >
            Sınavı Bitir
          </button>
        </div>
      </div>
    );
  }
}

export default Optik;

/**TODO:
 *
 * LOCAL STORAGE PROBLEMİNİ ÇÖZ
 *
 * pagination problemini çöz
 * limit değerlerini propstan alma burada lifecycle içerisinde hallet
 * sayfayı yenilemeden pagination işini halletmenin bir yolunu bul .
 *
 */
