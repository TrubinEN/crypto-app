import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Particles from "react-particles-js";
import particlesProps from "../../lib/particles-params";
import styled from "styled-components";
import iconlogoSwg from "../../static/media/img/logo.svg";
import iconEmailSwg from "../../static/media/img/user-shape.svg";
import iconPasswordSwg from "../../static/media/img/padlock-unlock.svg";
import { loginRequest } from "../../actions/auth";
import { registrationRequest } from "../../actions/reg";
import { getloginError } from "../../reducers/auth";
import { getRegistationError } from "../../reducers/reg";

const LoginContainer = styled.div`
  top: 0;
  align-items: center;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  position: absolute;
  width: 440px;
  z-index: 1;
`;

const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img.attrs({
  src: iconlogoSwg,
  alt: "logo"
})`
  width: 300px;
  height: 144px;
`;

const ContainerForm = styled.div`
  &:before {
    border-radius: 7px;
    background: transparent;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    box-shadow: 0px 0px 68px 4px rgba(0, 0, 0, 0.23);
  }
  background-color: #fff;
  border-radius: 7px;
  padding: 9px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 11px 0;
  position: relative;
  border: 1px solid #c3c3c3;
  text-align: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px;
`;

const FormItem = styled.div`
  position: relative;
`;

const FormButton = styled.button`
  margin: 10px 0;
  background-color: #4db6e2;
  color: #fff;
  border: none;
  font-size: 22px;
  padding: 12px 0;
  font-weight: 300;
  letter-spacing: 1.1px;
  cursor: pointer;
`;

const IconEmail = styled.span`
  background-image: url(${iconEmailSwg});
  width: 19px;
  height: 19px;
  opacity: 0.4;
  background-size: cover;
  position: absolute;
  top: 25px;
  left: 21px;
`;

const IconPassword = styled.span`
  background-image: url(${iconPasswordSwg});
  width: 19px;
  height: 19px;
  opacity: 0.4;
  background-size: cover;
  position: absolute;
  top: 25px;
  left: 21px;
`;

const FormInputEmail = styled.input.attrs({
  type: "email",
  placeholder: "email",
  name: "email"
})`
  &:before {
  }
  margin: 10px 0;
  padding: 16px 6px 16px 53px;
  border: 1px solid #dfdfdf;
  border-radius: 7px;
  width: calc(100% - 62px);
`;

const FormInputPassword = styled.input.attrs({
  type: "password",
  placeholder: "password",
  name: "password"
})`
  &:before {
  }
  margin: 10px 0;
  padding: 16px 6px 16px 53px;
  border: 1px solid #dfdfdf;
  border-radius: 7px;
  width: calc(100% - 62px);
`;

export class HomePage extends Component {
  static defaultProps = {
    errorLogin: null,
    errorRegistration: null
  };
  state = {
    mode: "auth",
    email: null,
    password: null
  };
  handleChangeInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleClickLogin = event => {
    event.preventDefault();
    const { loginRequest } = this.props;
    const { email, password } = this.state;

    loginRequest({ email, password });
  };
  handleClickRegistration = event => {
    event.preventDefault();
    const { registrationRequest } = this.props;
    const { email, password } = this.state;

    registrationRequest({ email, password });
  };
  handleClickRouteForm = event => {
    event.preventDefault();
    const { mode } = this.state;
    const newMode = mode === "auth" ? "reg" : "auth";

    this.setState({
      mode: newMode
    });
  };

  render() {
    const { mode } = this.state;
    const { errorLogin, errorRegistration } = this.props;
    const error = mode === "auth" ? errorLogin : errorRegistration;

    return (
      <main className="homePage">
        <LoginWrapper>
          <LoginContainer>
            <Logo />
            <ContainerForm>
              <Form>
                <FormItem>
                  <IconEmail />
                  <FormInputEmail onChange={this.handleChangeInput} />
                </FormItem>
                <FormItem>
                  <IconPassword />
                  <FormInputPassword onChange={this.handleChangeInput} />
                </FormItem>
                {error && <p>{error}</p>}
                {mode === "auth" ? (
                  <FormButton onClick={this.handleClickLogin}>Войти</FormButton>
                ) : (
                  <FormButton onClick={this.handleClickRegistration}>
                    Зарегистрироваться
                  </FormButton>
                )}
              </Form>
            </ContainerForm>
            <ContainerForm>
              {mode === "auth" ? (
                <p>
                  Впервые на сайте?&nbsp;
                  <a href="/" onClick={this.handleClickRouteForm}>
                    Регистрация
                  </a>
                </p>
              ) : (
                <p>
                  Уже зарегистрированы?&nbsp;
                  <a href="/" onClick={this.handleClickRouteForm}>
                    Войти
                  </a>
                </p>
              )}
            </ContainerForm>
          </LoginContainer>
        </LoginWrapper>
        <Particles params={particlesProps} />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  errorLogin: getloginError(state),
  errorRegistration: getRegistationError(state)
});

const mapDispathToProps = {
  loginRequest,
  registrationRequest
};

export default withRouter(
  connect(mapStateToProps, mapDispathToProps)(HomePage)
);
