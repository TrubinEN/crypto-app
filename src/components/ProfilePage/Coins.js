import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getWalletCoins,
  getWalletIsLoading,
  getWalletError
} from "../../reducers/wallet";

const CointInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 298px;
`;
const CointInputCurrency = styled.p`
  flex: 1 1;
  text-align: left;
  margin: 15px 0 0 15px;
`;
const CointInputField = styled.div`
  background-color: #414244;
  border: 1px solid #000;
  color: #ffffff;
  border-radius: 4px;
  padding: 6px 0;
  flex: 1 1 150px;
  margin: 5px 0;
`;
const CointInputFieldNumber = styled.span`
  width: 55%;
  display: inline-block;
  text-align: right;
`;
const CointInputFieldRemainder = styled.span`
  color: #8a8a8a;
  max-width: 78px;
  display: inline-block;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
`;

class Coins extends Component {
  render() {
    const { isLoading, coins } = this.props;
    const usd = coins ? coins.usd : 0;
    const btc = coins ? coins.btc : 0;
    const eth = coins ? coins.eth : 0;

    return (
      <Fragment>
        <CointInput>
          <CointInputField>
            {!isLoading && (
              <Fragment>
                <CointInputFieldNumber>{Math.trunc(usd)}</CointInputFieldNumber>.<CointInputFieldRemainder
                >
                  {Number(((usd - Math.trunc(usd)) * 1000000000).toFixed(10))}
                </CointInputFieldRemainder>
              </Fragment>
            )}
          </CointInputField>
          <CointInputCurrency>$</CointInputCurrency>
        </CointInput>

        <CointInput>
          <CointInputField>
            {!isLoading && (
              <Fragment>
                <CointInputFieldNumber>{Math.trunc(btc)}</CointInputFieldNumber>.<CointInputFieldRemainder
                >
                  {Number(((btc - Math.trunc(btc)) * 1000000000).toFixed(10))}
                </CointInputFieldRemainder>
              </Fragment>
            )}
          </CointInputField>
          <CointInputCurrency>BTC</CointInputCurrency>
        </CointInput>

        <CointInput>
          <CointInputField>
            {!isLoading && (
              <Fragment>
                <CointInputFieldNumber>{Math.trunc(eth)}</CointInputFieldNumber>.<CointInputFieldRemainder
                >
                  {Number(((eth - Math.trunc(eth)) * 1000000000).toFixed(10))}
                </CointInputFieldRemainder>
              </Fragment>
            )}
          </CointInputField>
          <CointInputCurrency>ETH</CointInputCurrency>
        </CointInput>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  coins: getWalletCoins(state),
  isLoading: getWalletIsLoading(state),
  error: getWalletError(state)
});

export default connect(mapStateToProps)(Coins);
