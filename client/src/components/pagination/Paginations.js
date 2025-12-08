import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = () => {
  return (
    <>
      <div className="pagination_div d-flex justify-content-end mx-5">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item>{14}</Pagination.Item>
          <Pagination.Item>{15}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </>
  );
};

export default Paginations;
