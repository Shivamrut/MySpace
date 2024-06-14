import React from "react";

export default function Alert(props) {
  let AlertTitle = ""
  switch (props.alert?props.alert.type:"") {
    case "danger":
      AlertTitle = "Error"
      break;
  
    default:
      AlertTitle = "Success"
      break;
  } 
  return (
    props.alert && (
      <div>
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>
            {AlertTitle + ": "}
          </strong>
          {props.alert.message}
        </div>
      </div>
    )
  );
}