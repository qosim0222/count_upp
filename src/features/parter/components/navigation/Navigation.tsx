import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import PartnerPopup from "../partner-popup/PartnerPopup";
import useGetRole from "@/shared/hooks/useGetRole";
import { Role } from "@/shared/const";
import { useShow } from "@/shared/hooks/useShow";
import Tabs from "@/shared/ui/Tabs";

const Navigation = () => {
  const { handleCancel, handleShow, isModalOpen } = useShow();
  const role = useGetRole();

  const links = [
    {
      id: 1,
      title: "Active",
      path: role === Role.customer ? "/" : "",
    },
    {
      id: 2,
      title: "Arxiv",
      path: role === Role.customer ? "customer/archive" : "archive",
    },
    {
      id: 3,
      title: "O'chirilganlar",
      path: role === Role.customer ? "customer/disabled" : "disabled",
    },
  ];

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Tabs links={links} />

        <div>
          <Button onClick={handleShow} type="primary">
            <PlusOutlined />
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <PartnerPopup
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          // previousData={{fullname:"john", address: "Namangan", phone:"99812345678"}}
        />
      )}
    </>
  );
};

export default React.memo(Navigation);
