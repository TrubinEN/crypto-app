import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Graph from "./Graph";
import Coins from "./Coins";
import Transactions from "./Transactions";
import TradeOperations from "./TradeOperations";
import { selectBtc, selectEth, selectOffset } from "../../actions/currency";
import {
  getBtc,
  getEth,
  getCurrEth,
  getCurrBtc,
  getSelected,
  getOffset,
  getIsBtcLoading,
  getIsEthLoading
} from "../../reducers/currency";
import { getUserInfoRequest } from "../../actions/user";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100% - 120px);
  background-color: #f2f3f5;
`;
const MainContainer = styled.div`
  width: 1200px;
  padding-top: 10px;
`;
const MainContainerArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;
const Sidebar = styled.section`
  width: 450px;
`;

export class ProfilePage extends Component {
  state = {
    btc: [],
    eth: []
  };
  componentWillReceiveProps(newProps) {
    const { currencyUrl, currency } = this.props;
    if (currency.selected !== currencyUrl) {
      currencyUrl === "btn" ? selectBtc() : selectEth();
    }
  }

  componentDidMount() {
    const { getUserInfoRequest } = this.props;
    getUserInfoRequest();
  }

  render() {
    const { currencyUrl, currency, selectOffset } = this.props;
    //const { user } = this.state;

    return (
      <div>
        <Header currencyUrl={currencyUrl} />
        <Main>
          <MainContainer>
            <MainContainerArticle>
              <Sidebar>
                <h2>Ваш счет</h2>
                <Coins selected={currencyUrl} />
                <TradeOperations />
              </Sidebar>
              <section>
                <Graph
                  currency={currency}
                  selectOffset={selectOffset}
                  selected={currencyUrl}
                />
                <article>
                  <Transactions currencyUrl={currencyUrl} />
                </article>
              </section>
            </MainContainerArticle>
          </MainContainer>
        </Main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currency: {
    selected: getSelected(state),
    btc: getBtc(state),
    eth: getEth(state),
    currEth: getCurrEth(state),
    currBtc: getCurrBtc(state),
    offset: getOffset(state),
    isBtcLoading: getIsBtcLoading(state),
    isEthLoading: getIsEthLoading(state)
  }
});

const mapDispathToProps = {
  getUserInfoRequest,
  selectBtc,
  selectEth,
  selectOffset
};

export default withRouter(
  connect(mapStateToProps, mapDispathToProps)(ProfilePage)
);
