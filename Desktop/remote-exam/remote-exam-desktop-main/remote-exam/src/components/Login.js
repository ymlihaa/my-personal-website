import React from "react";
import { Link } from "react-router-dom";
import TeacherLogin from "./TeacherLogin";
import "./login.css";
import star from "./stars.svg";
import student_img from "./studentlogin.svg";

export default function Login() {
  return (
    <div className="login-wrapper">
      <div className="cards">
        <div className="card-box card-one">
          <div className="img-wrapper">
            <img src={star} alt="teacher-login" />
          </div>
          <div className="details">
            <h3>Teacher Login</h3>
            <p>Eğer Öğretmen iseniz buradan giriş yapın</p>
            <Link
              to="/teacher"
              className="bttn text-center d-flex align-items-center justify-content-center"
            >
              Öğretmen Girişi
            </Link>{" "}
          </div>
        </div>

        <div className="card-box card-two">
          <div className="img-wrapper">
            <img src={student_img} alt="student-login" />
          </div>
          <div className="details">
            <h3>Sınav Girişi</h3>
            <p>Sınava girmek içinburadan giriş yapın</p>
            <Link
              to="/exam"
              className="bttn text-center d-flex align-items-center justify-content-center"
            >
              Sınava Gir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
