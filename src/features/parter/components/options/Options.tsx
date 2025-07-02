import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback, useState } from "react";
import PartnerPopup from "../partner-popup/PartnerPopup";

const Options = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  return (
    <>
      <div className="mb-4 flex justify-between">
        <div className="flex gap-3">
          <span className="underline">Aktiv</span>
          <span>Arxiv</span>
        </div>
        <div>
          <Button onClick={showModal} type="primary">
            <PlusOutlined />
          </Button>
        </div>
      </div>
      {
        isModalOpen &&
        <PartnerPopup
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          // previousData={{fullname:"john", address: "Namangan", phone:"99812345678"}}
        />
      }
    </>
  );
};

export default React.memo(Options);
