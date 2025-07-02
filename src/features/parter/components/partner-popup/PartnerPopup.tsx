import React from "react";
import { Button, Input, Modal, Form } from "antd";
import { useLocation } from "react-router-dom";
import { Role } from "@/shared/const";
import { PatternFormat } from "react-number-format";
import { usePartner } from "../../service/usePartner";

type FieldType = {
  fullname?: string;
  address?: string;
  phone?: string;
  phone2?: string;
  role?: string;
};

interface Props {
  isModalOpen: boolean;
  handleCancel: () => void;
  previousData?: any;
}

const PartnerPopup: React.FC<Props> = ({
  handleCancel,
  isModalOpen,
  previousData,
}) => {
  const { pathname } = useLocation();
  const currentPathname = pathname.split("/")[1];
  const {createPartner} = usePartner()
  const {isPending} = createPartner
  
  const handleSubmit = (values: FieldType) => {
    console.log(values);
    values.role = currentPathname === Role.seller ? Role.seller : Role.customer;
    const phone2 = values.phone2?.replace(/\s/gi, "")

    const newPartner = {
      fullname: values.fullname,
      role: values.role,
      adress: values.address, // ADRESS | ADDRESS
      phone: [
        values.phone?.replace(/\s/gi, ""),
        
      ],
    };
    if(phone2){
        newPartner.phone.push(phone2)
    }
    createPartner.mutate(newPartner, {
        onSuccess:()=>{
            handleCancel()
        }
    })
  };
  return (
    <>
      <Modal
        title={previousData ? "Update" : "Create"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          initialValues={previousData}
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="fullname"
            name="fullname"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="address"
            name="address"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="phone"
            name="phone"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <PatternFormat
              //   className="w-full px-2 border border-gray-300 rounded-md"
              format="+998 ## ### ## ##"
              mask={"_"}
              allowEmptyFormatting
              customInput={Input}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="phone2"
            name="phone2"
            rules={[{ required: false, message: "Please input your password!" }]}
          >
            <PatternFormat
              //   className="w-full px-2 border border-gray-300 rounded-md"
              format="+998 ## ### ## ##"
              mask={"_"}
              allowEmptyFormatting
              customInput={Input}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button loading={isPending} className="w-full" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PartnerPopup;
