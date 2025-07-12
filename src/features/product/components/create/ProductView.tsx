import { useParamsHook } from '@/shared/hooks/useParamsHook';
import { Button, Table } from 'antd';
import React, { type FC } from 'react'
import { Link } from 'react-router-dom';

interface Props {
    data: any
    // isLoading: any
}

const ProductView: FC<Props> = ({ data }) => {
    console.log(data);

    const { getParam } = useParamsHook();
    const page = getParam("page") || "1";

    const columns = [
        {
            title: "№",
            dataIndex: "index",
            key: "index",
            render: (_value: any, _item: any, index: number) => {
                return <span>
                    <span>{index + 1 + (Number(page) - 1) * 10}</span>
                </span>;
            },
        },
        {
            title: "Nomi",
            dataIndex: "title",
            key: "title",
            render: (name: any, item: any) => {
                return <Link to={`/product/${item.id}`}>{name}</Link>
            }
        },
        {
            title: "Narxi",
            dataIndex: "price",
            key: "price",
            render: (price: number) => {
                return (
                    <b
                        style={{
                            color: price < 0 ? "crimson" : price > 0 ? "green" : "grey",
                        }}
                    >
                        {price.fprice()}
                    </b>
                )
            }
        },
        {
            title: "Code",
            dataIndex: "productCode",
            key: "productCode"
        },
        {
            title: "Soni",
            dataIndex: "quantity",
            key: "quantity"
        },
        {
            title: "Jami Narxi",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (price: number) => {
                return (
                    <b
                        style={{
                            color: price <= 0 ? "crimson" : price > 0 ? "green" : "grey",
                        }}
                    >
                        {price.fprice()}
                    </b>
                )
            }
        },
        {
            title: "Option",
            dataIndex: "option",
            key: "option",
            render: (_text: any, _item: any) => {
                return (
                    <div className="flex gap-2 justify-end">
                        <Button>Sotish</Button>
                    </div>
                );
            },
        },
    ];

    return (
        <>

            <Table
                // loading={isLoading}
                dataSource={data}
                rowKey={"id"}
                columns={columns}
                pagination={false}
                scroll={{ x: 900 }}
            />

        </>
    )
}

export default React.memo(ProductView)