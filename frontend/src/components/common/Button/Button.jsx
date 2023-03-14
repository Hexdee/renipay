// import { Spinner } from "@app/components/Icon/icons";
import classNames from "classnames";
import React from "react";
import Spinner from "@app/components/Spinner";
// import Spinner from "@app/components/Icon/icons/Spinner";

// variant = "standard" | "transparent" | "link"
// size = "small" | "medium" | "large"
const Button = ({
  isCaretIcon,
  variant = "standard",
  disabled = false,
  iconPosition = "",
  icon: Icon,
  children,
  loading = false,
  spinner: SpinnerComponent = Spinner,
  size = "medium",
  letterCase = "capitalize",
  className,
  type = "button",
  theme = "purple",
  buttonTextClassName,
  tintButtonBg,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "flex items-center justify-center rounded-[8px]  relative font-normal ",
        {
          "font-normal py-[8px] px-3": size === "small",
          "py-[10px] px-4": size === "medium",
          " py-[16px] px-4": size === "large",
          "font-semibold": size !== "small",
          "flex items-center gap-2": Icon,
          // "border-[1px] border-primary-05":
          // (variant === "standard" || variant === "transparent") &&
          // theme === "red",
          // "border-[1px] border-[#fff]":
          //   theme === "white" && variant === "transparent",

          // "bg-primary-01 text-[#ffffff] hover:bg-primary-04 active:bg-primary-06":
          //   variant === "standard" && !disabled,
          // " text-[#fff]": variant === "transparent" && !disabled,
          // "border-black-03 text-black-03":
          // variant === "transparent" && disabled,
          "bg-primary-01 text-[#ffffff] hover:bg-opacity-80   active:border-primary-04 active:bg-primary-04":
            theme === "purple" && variant !== "link",
          //  &"border-[#fff] text-[#fff]  ": theme === "white" && disable,
          "border-none hover:underline p-2 hover:bg-transparent active:bg-transparent hover:underline-offset-4 bg-transparent text-primary-01":
            variant === "link",
          "bg-black-03 text-[#ffffff] hover:bg-black-03 border-black-03":
            variant === "standard" && disabled,
          "bg-opacity-30 text-primary-01 hover:text-[#fff]": tintButtonBg,
        },
        className
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {loading ? (
        // <span className="text-inherit w-10 h-10">
        <Spinner show={loading} />
      ) : (
        <>
          {iconPosition === "left" && (
            <span className="text-inherit w-[15px] h-full  relative ">
              {Icon && <Icon className="absolute top-0 -translate-y-1/2" />}
            </span>
          )}
          <span
            style={{ color: "inherit" }}
            className={classNames(
              "font-poppins font-medium ",
              {
                " text-h1 leading-l7": size === "small",
                "text-h2 leading-l6": size !== "small",
                uppercase: letterCase === "uppercase",
                lowercase: letterCase === "lowercase",
                capitalize: letterCase === "capitalize",
              },
              buttonTextClassName
            )}
          >
            {children}
          </span>
          {iconPosition === "right" && (
            <span
              className={classNames("text-inherit w-[15px] h-full  relative ", {
                "w-[10px]": isCaretIcon,
              })}
            >
              {Icon && <Icon className="absolute top-0 -translate-y-1/2" />}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
