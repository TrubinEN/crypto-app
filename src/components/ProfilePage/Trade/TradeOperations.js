import React, { PureComponent } from "react";
import { compose, mapProps } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentCurrencyPurchase,
  getCurrentCurrencySell,
  getSelectedCurrency
} from "../../../reducers/currency";
import {
  buyCurrencyRequest,
  sellCurrencyRequest
} from "../../../actions/currency";
import styled from "styled-components";
import { getWalletError } from "../../../reducers/wallet";
import {
  getNumber,
  INPUT_FIAT,
  INPUT_PURCHASE,
  INPUT_SELL,
  CURRENT_INPUT
} from "./helper";

const enhance = compose(
  withRouter,
  connect(
    state => ({
      currentCurrentPurchase: getCurrentCurrencyPurchase(state),
      currentCurrentSell: getCurrentCurrencySell(state),
      selectedCurrency: getSelectedCurrency(state),
      error: getWalletError(state)
    }),
    {
      buyCurrencyRequest,
      sellCurrencyRequest
    }
  ),
  mapProps(
    ({
      buyCurrencyRequest,
      sellCurrencyRequest,
      selectedCurrency,
      currentCurrentPurchase,
      currentCurrentSell,
      error
    }) => ({
      selectedCurrency,
      buyCurrencyRequest,
      sellCurrencyRequest,
      purchase: currentCurrentPurchase,
      sell: currentCurrentSell,
      error
    })
  )
);

const Container = styled.article`
  padding-top: 40px;
`;

const InputWrapper = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  margin: 5px 0;
  width: 218px;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  text-align: right;
  width: 100%;
  padding: 5px 0 3px;
  padding-right: 50px;
  box-sizing: border-box;
`;

const Currency = styled.span`
  position: absolute;
  right: 8px;
  width: 38px;
  text-align: left;
  color: #adadad;
  top: 5px;
`;

const Button = styled.button`
  width: 100px;
  margin-left: 20px;
  border: 0;
  color: #fff;
  padding: 5px 0 3px;
  border-radius: 3px;
`;

const ButtonSell = Button.extend`
  background-color: #cb5f58;
  &:hover {
    background-color: #ba564f;
  }
`;
const ButtonPurchase = Button.extend`
  background-color: #69b3dc;
  &:hover {
    background-color: #63acd5;
  }
`;

class TradeOperations extends PureComponent {
  state = {
    [INPUT_FIAT]: 1,
    [INPUT_SELL]: this.props.sell,
    [INPUT_PURCHASE]: this.props.purchase,
    [CURRENT_INPUT]: INPUT_FIAT
  };

  componentWillReceiveProps(nextProps) {
    const { sell, purchase } = nextProps;
    const { currentInput } = this.state;
    this.changeInputs(currentInput, sell, purchase);
  }

  handleChange = event => {
    const { name, value } = event.target;
    const { sell, purchase } = this.props;

    this.setState(state => ({ [name]: value }));
    if (isNaN(event.target.value) || event.target.value === "") return;
    else this.changeInputs(event.target.name, sell, purchase);
  };

  handleBlur = () => {
    this.setState({ [CURRENT_INPUT]: INPUT_FIAT });
  };

  handleFocus = event => {
    this.setState({ [CURRENT_INPUT]: event.target.name });
  };

  handleSell = () => {
    const { selectedCurrency } = this.props;
    const { inputFiat } = this.state;
    this.props.sellCurrencyRequest({ selectedCurrency, value: inputFiat });
  };

  handleBuy = event => {
    const { selectedCurrency } = this.props;
    const { inputFiat } = this.state;
    this.props.buyCurrencyRequest({ selectedCurrency, value: inputFiat });
  };

  changeInputs(name, sell, purchase) {
    switch (name) {
      case INPUT_FIAT: {
        this.setState(({ inputFiat }) => {
          const parsed = getNumber(inputFiat);
          return {
            [INPUT_SELL]: parsed * sell,
            [INPUT_PURCHASE]: parsed * purchase
          };
        });
        break;
      }
      case INPUT_SELL:
        this.setState(({ inputSell }) => {
          const parsedSell = getNumber(inputSell);
          const nextFiat = parsedSell / sell;
          return {
            [INPUT_FIAT]: nextFiat,
            [INPUT_PURCHASE]: nextFiat * purchase
          };
        });
        break;
      case INPUT_PURCHASE:
        this.setState(({ inputPurchase }) => {
          const parsedPurchase = isNaN(inputPurchase)
            ? 0
            : parseFloat(inputPurchase);
          const nextFiat = parsedPurchase / purchase;
          return {
            [INPUT_FIAT]: nextFiat,
            [INPUT_SELL]: nextFiat * sell
          };
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { error, selectedCurrency } = this.props;
    let { inputFiat, inputSell, inputPurchase } = this.state;
    inputFiat = getNumber(inputFiat);
    inputSell = getNumber(inputSell);
    inputPurchase = getNumber(inputPurchase);

    return (
      <Container>
        <h2>Покупка/продажа</h2>
        <InputWrapper>
          <Input
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            name={INPUT_FIAT}
            value={inputFiat}
          />
          <Currency>{selectedCurrency.toUpperCase()}</Currency>
        </InputWrapper>
        <div>
          <InputWrapper>
            <Input
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              name={INPUT_PURCHASE}
              value={inputPurchase}
            />
            <Currency>$</Currency>
          </InputWrapper>
          <ButtonSell onClick={this.handleSell}>Продать</ButtonSell>
        </div>
        <div>
          <InputWrapper>
            <Input
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              name={INPUT_SELL}
              value={inputSell}
            />
            <Currency>$</Currency>
          </InputWrapper>
          <ButtonPurchase onClick={this.handleBuy}>Купить</ButtonPurchase>
        </div>
        {error && <p className="error-text">{error}</p>}
      </Container>
    );
  }
}

export default enhance(TradeOperations);
