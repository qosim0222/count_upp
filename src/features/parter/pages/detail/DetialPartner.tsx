import Box from "@/shared/ui/Box";
import Title from "@/shared/ui/Title";
import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { usePartner } from "../../service/usePartner";
import { Badge, Button, Skeleton, Tag, type MenuProps } from "antd";
import Options from "@/shared/ui/Options";
import TelPopup from "@/shared/components/tel-popup/TelPopup";
import useGetRole from "@/shared/hooks/useGetRole";
import { Role } from "@/shared/const";
import PaymentPopup from "@/features/payment/components/payment-popup/PaymentPopup";
import { useShow } from "@/shared/hooks/useShow";
import PartnerPopup from "../../components/partner-popup/PartnerPopup";
import Tabs from "@/shared/ui/Tabs";

const DetialPartner = () => {
  const { id } = useParams();
  const { getPartner, updatePartner } = usePartner();
  const { data, isPending } = getPartner(id || "");
  const role = useGetRole();
  const { handleCancel, handleShow, isModalOpen } = useShow();
  const navigate = useNavigate();

  const isCustomer = role === Role.customer;
  const isActive = data?.isActive && !data?.isArchive;

  const previousData = {
    id: data?.id,
    adress: data?.adress,
    fullname: data?.fullname,
    phone_primary: data?.phone[0]?.slice(4),
    phone_secondary: data?.phone[1]?.slice(4) || "",
  };

  const handleArchive = () => {
    updatePartner.mutate({
      id: id || "",
      body: { isArchive: !data?.isArchive },
    });
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <span className=" block" onClick={handleShow}>
          O'zgartirish
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span className="block" onClick={handleArchive}>
          {data?.isArchive ? "Arxivdan chiqarish" : "Arxivlash"}
        </span>
      ),
      key: "1",
    },
    {
      label: <span className=" block">Lokatsiya</span>,
      key: "2",
    },
  ];

  return (
    <div className="flex gap-4 flex-col">
      {isPending ? (
        <Box>
          <Skeleton active />
        </Box>
      ) : (
        <Box>
          <div className="flex justify-between max-[550px]:flex-col relative">
            <div className=" flex flex-col items-start gap-2">
              <Badge
                count={data?.role === Role.customer ? "Mijoz" : "Sotuvchi"}
                style={{ backgroundColor: "#000" }}
              >
                <Title>{data?.fullname}</Title>
              </Badge>
              <p className=" text-gray-500">{data?.adress}</p>
              <Tag
                color={isActive ? "green" : data?.isArchive ? "gold" : "red"}
              >
                {isActive
                  ? "Active"
                  : data?.isArchive
                  ? "Arxiv"
                  : "O'chirilgan"}{" "}
              </Tag>
              <div className="text-sm text-gray-500">
                <p>Ro'yxatga olgan shaxs:</p>
                <Link to={"/"} className="font-bold">
                  {data?.createdBy?.fname} {data?.createdBy?.lname}
                </Link>
              </div>
            </div>
            <div className=" flex items-end flex-col gap-2">
              <div className="max-[550px]:absolute top-0 right-0">
                <Options items={items} />
              </div>
              <h2
                style={{
                  color:
                    data?.balance < 0
                      ? "crimson"
                      : data?.balance > 0
                      ? "green"
                      : "grey",
                }}
                className="text-2xl font-bold"
              >
                {data?.balance?.fprice()}
              </h2>
              <div>
                <p className="text-xs text-gray-500">Asosiy raqam</p>
                <TelPopup phoneNumber={data?.phone[0]} />
              </div>
              {data?.phone[1] && (
                <div>
                  <p className="text-xs text-gray-500">Ikkinchi raqam</p>
                  <TelPopup phoneNumber={data?.phone[1]} />
                </div>
              )}
              <div className="flex gap-3">
                <Button onClick={() => navigate(isCustomer ? "sell" : "buy")}>
                  {role === Role.customer ? "Sotish" : "Xarid qilish"}
                </Button>
                <PaymentPopup role={role} id={data?.id}>
                  <Button>To'lov</Button>
                </PaymentPopup>
              </div>
            </div>
          </div>
        </Box>
      )}
      <Box>
        <Tabs
          links={[
            { id: 1, path: "", title: "Xaridlar" },
            { id: 2, path: "payments", title: "To'lovlar" },
            {
              id: 3,
              path: isCustomer ? "sell" : "buy",
              title: isCustomer ? "Sotish" : "Xarid qilish",
            },
          ]}
        />
      </Box>
      <Box>
        <Outlet />
      </Box>
      {isModalOpen && (
        <PartnerPopup
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          previousData={previousData}
        />
      )}
    </div>
  );
};

export default React.memo(DetialPartner);
