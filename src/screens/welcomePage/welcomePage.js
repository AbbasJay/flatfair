import React, { Component } from "react";
import { connect } from "react-redux";
import "./welcomePage.scss";

export class WelcomePage extends Component {
  handleReturn = () => {
    this.props.history.push("/");
  };

  render() {
    const {
      amountOption,
      postcode,
      rentAmount,
      membershipFee
    } = this.props.bondData;

    if (membershipFee) {
      return (
        <div className="welcome-container">
          <div className="display-container" />,
          <div className="info-container">
            <span className="info">
              <ul className="rent-amount">{"Rent Amount : £" + rentAmount}</ul>
              <ul className="membership-fee-text">
                {"Membership Fee : £" + membershipFee}
              </ul>
              <ul className="amount-option">
                {"Amount Option : " + amountOption}
              </ul>
              <ul className="postcode">{"Postcode : " + postcode}</ul>
            </span>
          </div>
          <div className="back-button-container">
            <div className="back-button" onClick={this.handleReturn}>
              {"Back"}
            </div>
          </div>
        </div>
      );
    }
    if (!membershipFee) {
      return (
        <div className="welcome-container">
          <div className="display-container" />
          <div className="back-button-container">
            <div className="back-button" onClick={this.handleReturn}>
              {"Back"}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { bondData: state };
};

export default connect(
  mapStateToProps,
  null
)(WelcomePage);
