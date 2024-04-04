import React, { useEffect, useState } from "react";
import { Skeleton, Table } from "antd";
import ShadowTitle from "../ShadowTitle";
import instance from "@/axios";

const SpecsComparison = ({ specsComparison }) => {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setData(specsComparison);
  }, [specsComparison]);

  useEffect(() => {
    if (data && data.specs) {
      const dynamicColumns = data.specs.map((spec) => ({
        title: spec.text,
        dataIndex: spec.key,
        key: spec.key,
      }));
      setColumns(dynamicColumns);
    }
  }, [data]);

  if (!data) {
    return <Skeleton active />;
  }

  const dataSource = data.items;
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          margin: "2em 0 1em 0",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {data.heading}
      </h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default SpecsComparison;
