import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Row, Col, Table, Pagination } from "antd";
import carTableCols from "./cols";
import { getCars } from "../../actions/carActions";
import { getDealers } from "../../actions/dealerActoins";

import "./carsTableStyles.css";

const createRows = (carsList) => {
  if (!carsList) return null;
  return Object.keys(carsList).map((key) => ({ key, ...carsList[key] }));
};

const selectCarsState = createSelector(
  [
    ({ cars }) => cars.cars,
    ({ cars }) => cars.totalCars,
    ({ cars }) => cars.loading,
  ],
  (cars, totalCars, loading) => {
    return {
      cars: createRows(cars),
      totalCars,
      loading,
    };
  }
);

export const CarsTable = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const dispacth = useDispatch();
  const { loading, cars, totalCars } = useSelector(selectCarsState);

  React.useEffect(() => {
    dispacth(getCars(currentPage)).then(() => dispacth(getDealers()));
  }, [currentPage]);

  const onPaginationClick = React.useCallback((selectedPage) => {
    setCurrentPage(selectedPage);
  }, []);

  return (
    <div className="cars-page">
      <Row justify="center" className="cars-table">
        <Col span="20">
          <Table
            columns={carTableCols}
            dataSource={cars}
            pagination={false}
            loading={loading}
            tableLayout="fixed"
          />
        </Col>
      </Row>
      <Row justify="center" className="cars-table-pagination">
        <Col>
          <Pagination
            current={currentPage}
            total={totalCars - 20}
            pageSize={20}
            showSizeChanger={false}
            onChange={onPaginationClick}
          />
        </Col>
      </Row>
    </div>
  );
};
