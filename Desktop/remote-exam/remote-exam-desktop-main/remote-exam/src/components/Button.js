import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { Flag } from "@material-ui/icons";

export default function RadioButtons(props) {
  let length = props.length;
  const [selectedValue, setSelectedValue] = React.useState(props.selectRadio);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
    console.log(props.id);
    props.addclick(props.id, event.target.value);
  };

  return (
    <div className={"w-50 d-flex justify-content-center"}>
      <span style={{ fontWeight: "bold" }}>A</span>
      <Radio
        checked={selectedValue === "a"}
        onChange={handleChange}
        value="a"
        label="A"
        name="radio-button-demo"
        inputProps={{ "aria-label": "A" }}
      />
      <span style={{ fontWeight: "bold" }}>B</span>

      <Radio
        checked={selectedValue === "b"}
        onChange={handleChange}
        value="b"
        name="radio-button-demo"
        inputProps={{ "aria-label": "B" }}
      />
      <span style={{ fontWeight: "bold" }}>C</span>

      <Radio
        checked={selectedValue === "c"}
        onChange={handleChange}
        value="c"
        name="radio-button-demo"
        inputProps={{ "aria-label": "C" }}
      />
      <span style={{ fontWeight: "bold" }}>D</span>

      <Radio
        checked={selectedValue === "d"}
        onChange={handleChange}
        value="d"
        name="radio-button-demo"
        inputProps={{ "aria-label": "D" }}
      />
      <span style={{ fontWeight: "bold" }}>E</span>

      <Radio
        checked={selectedValue === "e"}
        onChange={handleChange}
        value="e"
        name="radio-button-demo"
        inputProps={{ "aria-label": "E" }}
      />
    </div>
  );
}
