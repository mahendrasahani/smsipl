import React from "react";
import Tabledata from "./Tabledata";
import styled from "styled-components";

const Tr = styled.tr`
  background: rgba(237, 242, 247, 1);
  width: 100%;
  text-align: left;

  .status {
    text-align: center;
  }

  th {
    padding: 0 15px;
    height: 54px;
    font-family: Public Sans;
    font-size: 23px;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: left;
    color: rgba(37, 37, 37, 1);
  }
  

  @media only screen and (max-width: 1536px) {
    th {
      font-size: 21px;
    }

    @media only screen and (max-width: 1440px) {
      th {
        font-size: 17px;
      }
    }
  }
`;

const Table = ({ messages }) => {
  return (
    <>
      <table className="table">
        <thead>
          <Tr>
            <th>
              <p>#</p>
            </th>
            <th>
              <p>Date</p>
            </th>
            <th className="message">
              <p>Message</p>
            </th>
            <th className="status">
              <p>Status</p>
            </th>
            <th>
              <p>Actions</p>
            </th>
          </Tr>
        </thead>

        {messages ? (
          messages.map((item) => (
            <Tabledata
              key={item.id}
              Sno={item.id}
              date={item.row_created.slice(0, 10)}
              message={item.message}
              status={item.status_code}
              statusdesc={item.status_desc}
            />
          ))
        ) : (
          <h1>No data</h1>
        )}
      </table>
    </>
  );
};

export default Table;
