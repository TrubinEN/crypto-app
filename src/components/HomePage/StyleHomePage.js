import styled from "styled-components";
import iconPasswordSwg from "../../static/media/img/padlock-unlock.svg";
import iconEmailSwg from "../../static/media/img/user-shape.svg";
import iconlogoSwg from "../../static/media/img/logo.svg";

export const LoginContainer = styled.div`
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

export const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img.attrs({
  src: iconlogoSwg,
  alt: "logo"
})`
  width: 300px;
  height: 144px;
`;

export const ContainerForm = styled.div`
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

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px;
`;

export const FormItem = styled.div`
  position: relative;
`;

export const FormButton = styled.button`
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

export const IconEmail = styled.span`
  background-image: url(${iconEmailSwg});
  width: 19px;
  height: 19px;
  opacity: 0.4;
  background-size: cover;
  position: absolute;
  top: 25px;
  left: 21px;
`;

export const IconPassword = styled.span`
  background-image: url(${iconPasswordSwg});
  width: 19px;
  height: 19px;
  opacity: 0.4;
  background-size: cover;
  position: absolute;
  top: 25px;
  left: 21px;
`;

export const FormInputEmail = styled.input.attrs({
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

export const FormInputPassword = styled.input.attrs({
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
