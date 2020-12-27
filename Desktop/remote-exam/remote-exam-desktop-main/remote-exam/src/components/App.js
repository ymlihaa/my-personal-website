import React, { useEffect, useState, useReducer } from "react";
import Optik from "./Optik";
import ExamAlert from "./ExamAlert";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";
import Join from "./Join";
import { ContactSupportOutlined } from "@material-ui/icons";

export default function App() {
  const [alertType, setAlert] = useState("");
  const history = useHistory();
  const initialState = {
    name: "",
    surName: "",
    studentNumber: "",
    ExamID: "",
    isTrue: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setState":
        return {
          name: action.name,
          surname: action.surname,
          studentNumber: action.studentNumber,
          ExamID: action.ExamID,
          isTrue: action.onAuth,
        };
      case "mounting":
        return {
          name: action.user.name,
          surname: action.user.surname,
          studentNumber: action.user.studentNumber,
          ExamID: action.user.ExamID,
          isTrue: action.user.isTrue,
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      dispatch({ type: "mounting", user: user });
    }
  }, []);

  useEffect(() => {
    const user = {
      name: state.name,
      surname: state.surname,
      studentNumber: state.studentNumber,
      isTrue: state.isTrue,
      examID: state.ExamID,
    };
    localStorage.setItem("user", JSON.stringify(user));
  }, [state.isTrue]);

  const setAlertType = (type) => {
    console.log("setAlertType :", type);
    // console.log(document.documentElement.scrollTop);
    document.documentElement.scrollTop = 0;
    setAlert(type.toString());
  };

  const element = <ExamAlert alertType={alertType} />;

  return (
    <AppContext.Provider value={{ dispatch }}>
      <div className="container d-flex flex-column align-items-center justify-content-center">
        {element !== null && element}

        {state.isTrue ? (
          <Optik userInfo={state} setAlertType={setAlertType} />
        ) : (
          <Join />
        )}
      </div>
    </AppContext.Provider>
  );
}
/**TODO:
 *
 * X LOCAL STORAGE PROBLEMİNİ ÇÖZ
 * X local storage diziye çevirdin diziden istrue değğerine ulaşığ sınava devam çözümü üret
 */
