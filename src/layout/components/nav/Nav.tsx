import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React, { type FC } from "react";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

const Nav: FC<Props> = ({ setShow, show }) => {
  return (
    <div className="w-full h-14 bg-white sticky top-0 left-0 flex items-center px-4 z-10 border-b border-gray-200">
      <button
        onClick={() => setShow((p) => !p)}
        className="text-xl cursor-pointer"
      >
        {show ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </button>
    </div>
  );
};

export default React.memo(Nav);
