import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import moment from "moment";
import {
  getTransactionsRecords,
  getTransactionsIsLoading,
  getTransactionsError
} from "../../reducers/transactions";

const Table = styled.table`
  margin: 40px 0;
  width: 100%;
  border: 1px solid #edf0f1;
  border-collapse: collapse;
  border-radius: 3px;
`;
const TableHeaderTR = styled.tr`
  background-color: #edf0f1;
  border: 1px solid #edf0f1;
`;
const TableTH = styled.th`
  border: 1px solid #edf0f1;
  padding: 5px 10px;
  text-align: left;
`;
const TableTR = styled.tr`
  border: 1px solid #edf0f1;
`;
const TableTD = styled.td`
  border: 1px solid #edf0f1;
  padding: 5px 10px;
`;

class Transactions extends Component {
  render() {
    const { currencyUrl, records, isLoading } = this.props;

    return (
      <Table>
        <thead>
          <TableHeaderTR>
            <TableTH>Операция</TableTH>
            <TableTH>Дата</TableTH>
            <TableTH>{currencyUrl}</TableTH>
            <TableTH>USD</TableTH>
          </TableHeaderTR>
        </thead>
        {!isLoading &&
          records && (
            <tbody>
              {records
                .filter(item => {
                  return item[`${currencyUrl}_delta`];
                })
                .map((item, i) => {
                  return (
                    <TableTR key={i}>
                      <TableTD>
                        {item.usd_delta > 0 ? "Продажа" : "Покупка"}
                      </TableTD>
                      <TableTD>
                        {moment(item.created_at).format("YYYY.MM.DD, hh:mm:ss")}
                      </TableTD>
                      <TableTD>{item.eth_delta}</TableTD>
                      <TableTD>{item.usd_delta}</TableTD>
                    </TableTR>
                  );
                })}
            </tbody>
          )}
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  records: getTransactionsRecords(state),
  isLoading: getTransactionsIsLoading(state),
  error: getTransactionsError(state)
});

export default withRouter(connect(mapStateToProps)(Transactions));
