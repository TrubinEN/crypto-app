import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Particles from "react-particles-js";
import particlesProps from "../../lib/particles-params";
import { loginRequest } from "../../actions/auth";
import { registrationRequest } from "../../actions/reg";
import { getloginError } from "../../reducers/auth";
import { getRegistationError } from "../../reducers/reg";
import {
  LoginContainer,
  LoginWrapper,
  Logo,
  ContainerForm,
  Form,
  FormItem,
  FormButton,
  IconEmail,
  IconPassword,
  FormInputEmail,
  FormInputPassword
} from "./StyleHomePage";

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
