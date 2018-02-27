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

    return (
      <Fragment>
        <CointInput>
          <CointInputField>
            {!isLoading && (
              <Fragment>
                <CointInputFieldNumber>
                  {Math.trunc(coins.usd)}
                </CointInputFieldNumber>.<CointInputFieldRemainder>
                  {coins.usd - Math.floor(coins.usd)}
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
                <CointInputFieldNumber>
                  {Math.trunc(coins.btc)}
                </CointInputFieldNumber>.<CointInputFieldRemainder>
                  {coins.btc - Math.floor(coins.btc)}
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
                <CointInputFieldNumber>
                  {Math.trunc(coins.eth)}
                </CointInputFieldNumber>.<CointInputFieldRemainder>
                  {coins.eth - Math.floor(coins.eth)}
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
