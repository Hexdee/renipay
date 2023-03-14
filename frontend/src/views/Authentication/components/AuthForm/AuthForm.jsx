import Button from "@app/components/common/Button";
import RenipayLogo from "@app/components/Icon/icons/RenipayLogo";
// import { Facebook, Google } from "@app/components/Icon/icons";
import Layout from "@app/views/Authentication/Layout";
import classNames from "classnames";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

// const SOCIAL_ICONS = [
//   {
//     icon: Facebook,
//     name: "facebook",
//     color: "#1877F2",
//   },
//   {
//     icon: Google,
//     name: "google",
//     color: "#fff",
//   },
// ];

const AuthForm = ({
  text,
  title,
  isLoading,
  children,
  handleSubmit,
  description2,
  // handleSocialIconClick,
  description,
  icon: Icon,
  belowButtonText,
  showSocials = true,
  //this prop signigies the current page is password-reset-page
  isReset,
  disableButton = false,
  nonAuth,
}) => {
  //   const [isLoading] = useState(false);
  // const handleSubmit = () => {};
  const HtmlTag = useMemo(
    () =>
      nonAuth
        ? (props) => (
            <section className="flex items-center h-full w-full">
              {props.children}
            </section>
          )
        : Layout,
    [nonAuth]
  );
  return (
    <HtmlTag>
      <form
        onSubmit={handleSubmit}
        className="py-7 px-5 rounded-[4px] space-y-1 w-[389px] md:w-[95vw] md:max-w-[400px] mx-auto text-center"
      >
        <div className="flex justify-center">
          <Link to="/">
            <span className=" aspect-square">
              <RenipayLogo
                className={classNames("ml-0 ", {
                  "md:hidden": nonAuth,
                })}
                // hide={false}
              />
            </span>
          </Link>
        </div>

        {Icon && (
          <div className="text-primary-01 flex justify-around text-center self-center mb-8 mt-4">
            <Icon className="w-20 h-20" />
          </div>
        )}
        <p className="typography-semibold-28px font-semibold b-1 text-primary-01">
          {title}
        </p>

        {description && (
          <p
            className={classNames(
              "typography-normal-14px text-[12px]  text-primary-01",
              {
                // "pt-10 ": !showSocials && !isReset,
              }
            )}
          >
            {description}
          </p>
        )}
        {description2 && (
          <p
            className={classNames(
              "typography-normal-14px text-[12px]  text-primary-01 text-left",
              {
                // "pt-10 ": !showSocials && !isReset,
              }
            )}
          >
            {description2}
          </p>
        )}
        <div className="h-8 w-full" />

        <div className="flex flex-col gap-2">{children}</div>
        {/* {showSocials && (
          <>
            <div className="h-10 w-full" />
            <div className="w-full h-[1px] relative bg-[#fff]">
              <span className="text-[#fff] bg-[#060606] px-3 absolute -translate-y-1/2 left-1/2 -translate-x-1/2">
                OR
              </span>
            </div>
            <div className="h-6 w-full" />

            <div className="flex justify-center gap-5">
              {SOCIAL_ICONS.map((item) => (
                <button
                  onClick={() => handleSocialIconClick(item.name)}
                  className="w-10 h-10 p-2 rounded-[5px] hover:rounded-[0px]"
                  style={{
                    background: item.color,
                  }}
                >
                  <item.icon />
                </button>
              ))}
            </div>
          </>
        )} */}
        <div className="h-6 w-full" />
        {text && (
          <Button
            letterCase="capitalize"
            loading={isLoading}
            className="w-full "
            type="submit"
            disabled={disableButton}
            size="large"
          >
            {text}
          </Button>
        )}
        <>
          {belowButtonText && (
            <>
              {/* <div className="h-6" /> */}
              <p className="text-gray-02 text-h1 ">{belowButtonText}</p>
            </>
          )}
        </>
      </form>
    </HtmlTag>
  );
};

export default AuthForm;
