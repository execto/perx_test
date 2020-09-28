import React from "react";

export default [
  {
    title: "VIN",
    dataIndex: "vin",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Model",
    dataIndex: "model",
  },
  {
    title: "Grade",
    dataIndex: "grade",
  },
  {
    title: "Dealer",
    dataIndex: "dealer",
    render: (dealer) => {
      if (!dealer) {
        return <span>N/A</span>;
      }
      return <span>{dealer}</span>;
    },
  },
  {
    title: "Dealer address",
    dataIndex: "dealerAddresses",
    align: "center",
    render: (addresses) => {
      if (!addresses) {
        return <span>N/A</span>;
      }
      return (
        <ul className="dealers-list">
          {addresses.map((address, idx) => (
            <li key={address + idx}>{address}</li>
          ))}
        </ul>
      );
    },
  },
];
