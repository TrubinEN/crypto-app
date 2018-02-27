import React, { Component } from "react";
import styled from "styled-components";
import { LineChart } from "react-easy-chart";
import moment from "moment";

const GraphContent = styled.article`
  width: 750px;
`;
const GraphContentItem = styled.div`
  border: 1px solid #edf0f1;
  height: 448px;
  margin-top: 15px;
  border-radius: 3px;
`;
const GraphMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #edf0f1;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const GraphMenuItem = styled.button`
  margin: 0 4px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
  color: #9998a1;
  padding: 2px 16px;
`;

export default class Footer extends Component {
  static defaultProps = {
    offsets: {
      "2h": "2ч",
      "4h": "4ч",
      "8h": "8ч",
      "1d": "1д",
      "7d": "7д"
    }
  };
  handleClickChangePeriod = newOffset => {
    this.props.selectOffset(newOffset);
  };
  render() {
    const { currency, offsets, selected } = this.props;

    return (
      <GraphContent>
        <h2>Окно графика</h2>
        <GraphContentItem>
          <GraphMenu>
            {Object.keys(offsets).map((item, i) => {
              return (
                <GraphMenuItem
                  key={i}
                  onClick={this.handleClickChangePeriod.bind(null, item)}
                  className={currency.offset === item && "current-offset"}
                >
                  {offsets[item]}
                </GraphMenuItem>
              );
            })}
          </GraphMenu>
          {!currency.isBtcLoading &&
            !currency.isEthLoading && (
              <LineChart
                lineColors={["blue", "red"]}
                axes
                grid
                verticalGrid
                interpolate={"cardinal"}
                xType={"time"}
                datePattern={"%d-%m %H:%M"}
                width={750}
                height={400}
                style={{
                  ".axis path": {
                    stroke: "#EDF0F1"
                  }
                }}
                data={[
                  currency[selected].map(({ mts, sell, purchase }) => ({
                    x: moment(mts).format("DD-MM HH:mm"),
                    y: sell
                  })),
                  currency[selected].map(({ mts, sell, purchase }) => ({
                    x: moment(mts).format("DD-MM HH:mm"),
                    y: purchase
                  }))
                ]}
              />
            )}
        </GraphContentItem>
      </GraphContent>
    );
  }
}
