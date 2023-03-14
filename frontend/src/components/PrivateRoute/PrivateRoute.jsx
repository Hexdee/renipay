import { useAuthContext } from "@app/utils/contexts.js/AuthProvider";
import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

function PrivateRoute({
  component: Component,
  exclusivelyForSuperAdmin,
  ...rest
}) {
  const { user, setLocation } = useAuthContext();
  const { pathname } = useLocation();
  // alert(location.pathname);
  // const ComponentToDisplay =
  //   user?.type !== SUPER_ADMIN
  //     ? NotFound
  //     : Component;
  useEffect(() => {
    // if (pathname === "/notifications") {
    //   setLocation("/");
    // } else {
      setLocation(pathname);
    // }

    return () => {};
  }, [pathname, setLocation, user]);

  return (
    <>
      {user ? (
        <Component {...rest} />
      ) : (
        <Navigate
          to={"/auth/signin"}
          state={{ from: pathname }}

          // replace
        />
      )}
    </>
  );
}

export default PrivateRoute;
