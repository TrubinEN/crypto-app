import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getWalletCoins,
  getWalletIsLoading,
  getWalletError
} from "../../../reducers/wallet";

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
  static defaultProps = {
    isLoading: false,
    coins: {}
  };

  getFraction(number) {
    return Number(((number - this.getWhole(number)) * 1000000000).toFixed(10));
  }
  getWhole(number) {
    return Math.trunc(number);
  }
  getDefaultCoins() {
    return { whole: 0, fraction: 0 };
  }
  render() {
    const { isLoading, coins } = this.props;
    let usd = this.getDefaultCoins(),
      btc = this.getDefaultCoins(),
      eth = this.getDefaultCoins();

    if (coins) {
      // usd
      usd.whole = this.getWhole(coins.usd);
      usd.fraction = this.getFraction(coins.usd);
      // btc
      btc.whole = this.getWhole(coins.btc);
      btc.fraction = this.getFraction(coins.btc);
      // eth
      eth.whole = this.getWhole(coins.eth);
      eth.fraction = this.getFraction(coins.eth);
    }

    return (
      <Fragment>
        <CointInput>
          <CointInputField>
            {!isLoading && (
              <Fragment>
                <CointInputFieldNumber>{usd.whole}</CointInputFieldNumber>.<CointInputFieldRemainder
                >
                  {usd.fraction}
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
                <CointInputFieldNumber>{btc.whole}</CointInputFieldNumber>.<CointInputFieldRemainder
                >
                  {btc.fraction}
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
                <CointInputFieldNumber>{eth.whole}</CointInputFieldNumber>.<CointInputFieldRemainder
                >
                  {eth.fraction}
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
