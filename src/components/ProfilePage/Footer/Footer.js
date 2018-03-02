import React, { Component } from "react";
import styled from "styled-components";
import iconlogoSwg from "../../../static/media/img/logoProfile.svg";

const Section = styled.footer`
  align-items: center;
  background-color: #1f2022;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 100;
`;
const SectionContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
`;
const Logo = styled.img.attrs({
  src: iconlogoSwg,
  alt: "logo"
})`
  width: 180px;
`;
const Copyright = styled.p`
  line-height: 1.4;
  width: 230px;
`;

export default class Footer extends Component {
  render() {
    return (
      <Section>
        <SectionContainer>
          <Copyright>
            Сделано с любовью и старанием на курсе «React.js» в{" "}
            <a href="https://loftschool.com/">Loftschool</a>. Автор работы:{" "}
            <b>Трубин Евгений</b>.
          </Copyright>
          <Logo />
        </SectionContainer>
      </Section>
    );
  }
}
