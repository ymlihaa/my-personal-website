import { LocalGasStation } from "@material-ui/icons";
import React, { useState, useRef, useContext } from "react";
import AppContext from "../context/app-context";
import { useAuth } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import "./teacher-login.css";

import bg from "./exam03.svg";
import avatar from "./stars.svg";

export default function TeacherLogin({ dispatch }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("click");
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("İşlem Gerçekleştirilemedi .");
    }

    setLoading(false);
  }

  function addcl(e) {
    let parent = e.target.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl(e) {
    let parent = e.target.parentNode.parentNode;
    if (passwordRef.current.value == "") {
      parent.classList.remove("focus");
    }
  }

  return (
    <>
      <div className="teacher-container">
        <div className="left">
          <img src={bg} alt="bg" className="bg" />
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit}>
            <img src={avatar} alt="avatar" />
            <h2 className="title">Login</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  ref={emailRef}
                  type="text"
                  className="input"
                  onFocus={addcl}
                  onBlur={remcl}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  ref={passwordRef}
                  type="password"
                  className="input"
                  onFocus={addcl}
                  onBlur={remcl}
                />
              </div>
            </div>
            <div className="d-flex flex-col justify-content-between">
              <span>
                <a>Forgot password</a>
              </span>
              <span>
                <Link to="/exam">Sınav Girişi</Link>
              </span>
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <input
              disabled={loading}
              type="submit"
              value="Login"
              className="teacher-btn"
            />
          </form>
        </div>
      </div>
    </>
  );
}

// <div
//       className="container d-flex align-items-center justify-content-center "
//       style={{ minHeight: "100vh" }}
//     >
//       <div className="w-100 mx-auto" style={{ maxWidth: "400px" }}>
//         <div className="card p-3 mb-5 bg-white rounded">
//           <div className="card-body">
//             <h2 className="text-center mb-4">Giriş Yap</h2>
//             {error && (
//               <div className="alert alert-danger" role="alert">
//                 {error}
//               </div>
//             )}
//             <form>
//               <div className="form-col p-3">
//                 <div className=" form-group row mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Kullanıcı Adı:"
//                     ref={emailRef}
//                     required
//                   ></input>
//                 </div>
//                 <div className="form-group row mb-3">
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Parola"
//                     ref={passwordRef}
//                     required
//                   ></input>
//                 </div>

//                 <button
//                   disabled={loading}
//                   onClick={handleSubmit}
//                   type="button"
//                   className="btn btn-primary w-100 text-center mt-3"
//                 >
//                   Giriş Yap
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
