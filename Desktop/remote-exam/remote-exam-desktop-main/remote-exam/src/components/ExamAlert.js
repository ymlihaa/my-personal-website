import { AirlineSeatReclineExtraTwoTone } from "@material-ui/icons";
import React from "react";

const ExamAlert = (props) => {
  if (props.alertType == "upperAlert") {
    return (
      <div className="alert alert-warning w-50 mt-3 text-center" role="alert">
        Bu testi bitirdiniz .{" "}
        <a href="#" className="alert-link text-center">
          Buradan bir sonraki derse geçebilirsiniz.
        </a>
        Başarılar...
      </div>
    );
  } else if (props.alertType == "lowerAlert") {
    return (
      <div className="alert alert-warning w-50 mt-3 text-center" role="alert">
        Daha fazla geriye gidemezsiniz .{" "}
        <a href="#" className="alert-link text-center">
          Zaten İlk sorudasınız.
        </a>
        Başarılar...
      </div>
    );
  } else if (props.alertType == "finishAlert") {
    <div class="alert alert-success" role="alert">
      Sınav Başarıyla Sonlandırıldı .
    </div>;
  }
  return false;
};

ExamAlert.defaultProps = {
  alertType: "",
};

export default ExamAlert;
