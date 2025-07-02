import { Button, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import React, { type FC } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useParamsHook } from "@/shared/hooks/useParamsHook";
// import { Link } from "react-router-dom";

interface Props {
  data: undefined | any;
  loading: boolean;
}

const TableView: FC<Props> = ({ data, loading }) => {
  const { getParam } = useParamsHook();
  const page = getParam("page") || "1";
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_value: any, _item: any, index: number) => {
        return <span>{index + 1 + (Number(page) - 1) * 10}</span>;
      },
    },
    {
      title: "Ism",
      dataIndex: "fullname",
      key: "fullname",
      render: (text: any, item: any) => {
        return <Link to={`/partner/${item.id}`}>{text}</Link>;
      },
    },
    {
      title: "Manzil",
      dataIndex: "adress",
      key: "adress",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "adress",
      render: (text: any) => {
        return text[0];
      },
    },
    {
      title: "Balans",
      dataIndex: "balance",
      key: "balance",
      render: (number: number) => {
        return <b style={{color: number < 0 ? "crimson" : number > 0 ? "green" : "grey"}}>{number.fprice()}</b>;
      },
    },
    {
      title: "Option",
      dataIndex: "option",
      key: "option",
      render: () => {
        return (
          <div className="flex gap-2 justify-end">
            <Button>To'lov</Button>
            <Button>
              <MoreOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="w-full overflow-x-auto">
      <Table
        loading={loading}
        dataSource={data}
        rowKey={"id"}
        columns={columns}
        pagination={false}
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default React.memo(TableView);
