import React from "react";
import {
  // ToastIconError,
// ToastIconError,
  // ToastIconInfo,
  // ToastIconSuccess,
  //   ToastIconWarning,
  ToastIconError,
  ToastIconInfo,
  ToastIconSuccess,
  ToastIconWarning
} from "@app/components/Icon/icons";

const ICONS = {
  error: ToastIconError,
  success: ToastIconSuccess,
  //   warning: ToastIconWarning,
  info: ToastIconInfo,
};

const HEADINGS = {
  error: "Error Message",
  warning: "Warning Message",
  success: "Success Message",
  info: "Information",
};

const Toast = ({ toastType, message, ...props }) => {
  const Icon = ICONS[toastType];
  const heading = HEADINGS[toastType];
  return (
    <div role="alert" className="flex-auto">
      <div className="flex gap-3">
        <span className="w-5 h-5">
          <Icon />
        </span>
        <p className="font-medium text-h3 text-[#170000]">{heading}</p>
      </div>
      <p className="ml-8 text-h2 text-[#170000]" {...props}>
        {message}
      </p>
    </div>
  );
};

export default Toast;
