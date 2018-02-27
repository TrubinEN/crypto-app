import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import iconlogoSwg from "../../static/media/img/logoProfile.svg";
import { loginOut } from "../../actions/auth";
import {
  getUserIsLoading,
  getUserError,
  getUserInfo
} from "../../reducers/user";
import {
  getBtc,
  getEth,
  getCurrEth,
  getCurrBtc,
  getSelected
} from "../../reducers/currency";
import { selectBtc, selectEth } from "../../actions/currency";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2c2e;
  height: 80px;
  color: #fff;
`;

const HeaderContent = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.img.attrs({
  src: iconlogoSwg,
  alt: "logo"
})`
  width: 180px;
`;
const ChangeRate = styled.div`
  display: flex;
  flex-direction: row;
`;
const SelectCurrency = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 80px;
  justify-content: center;
  margin: 0 8px;
  text-decoration: none;
  cursor: auto;
  color: white;
`;

class HeaderPage extends Component {
  rounded(number) {
    return +number.toFixed(2);
  }

  handleClickLogout = event => {
    event.preventDefault();
    this.props.loginOut();
  };
  render() {
    const {
      user,
      currency: { currEth: eth, currBtc: btc },
      currencyUrl,
      selectBtc,
      selectEth
    } = this.props;
    const email = user.info ? user.info.email : "";

    return (
      <Header>
        <HeaderContent>
          <Logo />
          <ChangeRate>
            <Link
              to="/trade/btc"
              onClick={selectBtc}
              className={`change-rate ${
                currencyUrl === "btc" ? "current" : ""
              }`}
            >
              <SelectCurrency>
                {btc ? this.rounded(btc) : 0}
                <b>1 BTN</b>
              </SelectCurrency>
            </Link>
            <Link
              to="/trade/eth"
              onClick={selectEth}
              className={`change-rate ${
                currencyUrl === "eth" ? "current" : ""
              }`}
            >
              <SelectCurrency>
                {eth ? this.rounded(eth) : 0}
                <b>1 ETH</b>
              </SelectCurrency>
            </Link>
          </ChangeRate>
          <span>
            {email}
            {"  "}
            <a
              style={{ color: "#6ab4dd" }}
              href="/"
              onClick={this.handleClickLogout}
            >
              Выход
            </a>
          </span>
        </HeaderContent>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  user: {
    info: getUserInfo(state),
    isLoading: getUserIsLoading(state),
    error: getUserError(state)
  },
  currency: {
    selected: getSelected(state),
    btc: getBtc(state),
    eth: getEth(state),
    currEth: getCurrEth(state),
    currBtc: getCurrBtc(state)
  }
});

const mapDispathToProps = {
  selectBtc,
  selectEth,
  loginOut
};

export default connect(mapStateToProps, mapDispathToProps)(HeaderPage);
