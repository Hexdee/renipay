// import Logo from "@app/components/common/Logo";
import React from "react";
// import Card1 from "@app/assets/images/moviecard1.jpg";
// import Card2 from "@app/assets/images/moviecard2.jpg";
// import Card3 from "@app/assets/images/moviecard3.png";

const Layout = ({ children }) => {
  return (
    <section className="w-screen h-screen  relative grid md:flex flex-wrap grid-cols-6  overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between overflow-hidden">
        <p className="text-[#F5F5F5]  font-black md:text-[100px] text-[120px] text-left  opacity-90">Renipay</p>
        <p className="text-[#F5F5F5]  font-black md:text-[100px] text-[120px] text-right -ml-12 opacity-90">Renipay</p>
      </div>
     
      <div className="flex flex-col gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

        {children}
      </div>
    </section>
  );
};

export default Layout;
