import Button from "@app/components/common/Button";
import Input from "@app/components/common/Input";
import Skeleton from "@app/components/common/Skeleton";
import {
  Board,
  Copy,
  Exit,
  InclinedLeftRightArrow,
  Padlock,
  Pencil,
  Placeholder,
  PlaceholderNoSpace,
  Settings,
  UpwardArrow,
} from "@app/components/Icon/icons";
import { PAYMENT_LINK } from "@app/constants";
import capitalize from "@app/helpers/capitalize";
import { useAuthContext } from "@app/utils/contexts.js/AuthProvider";
import useCopyToClipboard from "@app/utils/hooks/useCopyClipboard";
import classNames from "classnames";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const options = [
  {
    Icon: InclinedLeftRightArrow,
    option: "Transactions History",
    link: "/profile/transactions",
  },
  // {
  //   Icon: Padlock,
  //   option: "Privacy and Security",
  // },
  {
    Icon: Pencil,
    option: "Edit beneficiaries",
    link: "/profile",
  },
  {
    Icon: Placeholder,
    option: "Customer Care",
    link: "/profile",
  },
  {
    Icon: Settings,
    option: "Settings",
    link: "/profile",
  },
];

const Profile = ({ isLoadingUser }) => {
  const { pathname } = useLocation();

  const { logout } = useAuthContext();
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState("renipay.onrender.com/payment/abass");
  const [copiedText, copy] = useCopyToClipboard();
  const { user } = useAuthContext();

  const handleLinkCopy = () => {
    copy(PAYMENT_LINK + user?.username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  console.log({ user });
  return (
    <div className="py-6 space-y-8 min-h-screen ">
      <section className="w-11/12 p-4 rounded-md shadow-[0px_2px_2px_rgba(0,0,0,0.15)] max-w-3xl mx-auto flex gap-8  justify-between md:flex-col  items-end">
        <div className="flex gap-8 items-center ">
          {
            <span className="inline-block w-20 p-6 bg-neutral-01 h-20 rounded-full text-h6">
              <Placeholder />
            </span>
          }
          <div>
            {isLoadingUser || !user?.first_name ? (
              <Skeleton width={280} height={80} />
            ) : (
              <>
                <p className="text-h2">
                  {capitalize(user?.first_name) +
                    " " +
                    capitalize(user?.last_name)}
                </p>
                <div className="flex gap-4 items-center">
                  <Input
                    placeholder="renipay"
                    value={PAYMENT_LINK + user?.username}
                    disabled={true}
                    inputClassName="w-52"
                    // className="w-52"
                  />
                  <button
                    className={classNames(
                      "w-9 h-9 inline-block bg-primary-01 rounded-[4px] p-2 text-[#fff]",
                      {
                        "text-h1 min-w-9 w-max": copied,
                      }
                    )}
                    disabled={isLoadingUser}
                    onClick={handleLinkCopy}
                  >
                    {copied ? "Copied!" : <Copy />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <Button
          letterCase="capitalize"
          // loading={isLoading}
          className=""
          type="button"
          // disabled={disableButton}
          size="large"
        >
          Edit my profile
        </Button>
      </section>
      <section className="w-11/12 mx-auto bg-primary-01 rounded-md text-[#fff] max-w-md p-8">
        <p className="uppercase text-h2 font-semibold my-3">Current Balance</p>
        {isLoadingUser ? (
          <Skeleton width={100} height={40} />
        ) : (
          <p className="font-bold text-h4">
            $ <span className="text-h7 -mb-1">{user?.balance}</span>
          </p>
        )}
      </section>
      {pathname === "/profile" && (
        <ul className="grid md:block grid-cols-2  gap-3 w-11/12 max-w-3xl mx-auto">
          {options.map(({ Icon, option, link }) => (
            <Link to={link}>
              <li className="flex md:flex-row flex-col items-center gap-3 md:bg-transparent bg-neutral-02 md:p-2 md:my-3 p-6 rounded-[4px] cursor-pointer  hover:bg-primary-01 hover:text-[#fff] group">
                <span className="inline-block w-10 h-10  p-2 rounded-full bg-primary-01/30 text-primary-01 group-hover:text-[#fff] group-hover:border-[1px] group-hover:border-[#fff]">
                  <Icon />
                </span>
                <span className="text-h2 text-[#121212] group-hover:text-[#fff]">
                  {option}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      )}
      <div className="w-[95%] max-w-3xl mx-auto">
        <Outlet />
      </div>
      <div className="w-11/12 max-w-3xl mx-auto md:pt-12 pt-36">
        <Button
          icon={Exit}
          iconPosition="left"
          buttonTextClassName="text-primary-01"
          tintButtonBg
          className=""
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
