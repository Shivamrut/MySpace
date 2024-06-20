import React, { FC } from "react";

interface AlertProps {
  alert: {
    type: string;
    message: string;
  } | null;
}

export const Alert: FC<AlertProps> = ({ alert }) => {

  let AlertTitle: string = "";

  switch (alert ? alert.type : "") {
    case "danger":
      AlertTitle = "Error";
      break;
    default:
      AlertTitle = "Success";
      break;
  }
  
  return (
    alert && (
      <div>
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{AlertTitle + ": "}</strong>
          {alert.message}
        </div>
      </div>
    )
  );
};
