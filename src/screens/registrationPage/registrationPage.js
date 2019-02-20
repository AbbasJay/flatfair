import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./registrationPage.scss";
import MembershipFee from "../../components/membershipFee/membershipFee";
import {
  addChallangeAPI,
  setAmountOption,
  setMembershipFee,
  setRentAmount,
  setErrorMessageRent,
  setRentAmountValidation,
  setIsRentValid,
  setPostcode,
  setErrorMessagePostcode,
  setPostcodeValidation,
  setIsPostcodeValid,
  setCreatedPost
} from "../../actions/actions";

export class RegistrationPage extends Component {
  componentDidMount() {
    axios
      .get(
        "https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/config"
      )
      .then(challangeAPIData =>
        this.props.addChallangeAPI(challangeAPIData.data)
      )
      .catch(error => {
        console.log(error.response);
      });
  }

  handleOption = option => {
    const {
      setAmountOption,
      setRentAmountValidation,
      setErrorMessageRent,
      setIsRentValid,
      setRentAmount
    } = this.props;

    if (option !== this.props.bondData.amountOption) {
      setAmountOption(option);
      setRentAmountValidation("correct-input");
      setErrorMessageRent("");
      setIsRentValid(false);
      setRentAmount(0);

      document.getElementById("rentForm").value = "";
    }
  };

  validateRent = rentAmount => {
    const { fixed_membership_fee } = this.props.bondData.challangeAPIData;
    const {
      minimumRentWeekly,
      minimumRentMonthly,
      maximumRentWeekly,
      maximumRentMonthly
    } = this.props.bondData;
    const {
      setRentAmountValidation,
      setErrorMessageRent,
      setIsRentValid,
      setRentAmount
    } = this.props;

    if (rentAmount === "£") {
      setErrorMessageRent("Numeric values only");
      setRentAmountValidation("incorrect-input");
      return;
    }

    const { amountOption } = this.props.bondData;
    let newRentAmount = rentAmount.match(/^[0-9]*$/);
    rentAmount = parseInt(rentAmount);

    if (!newRentAmount) {
      setErrorMessageRent("Invalid Character");
      setRentAmountValidation("incorrect-input");
      return;
    }

    if (amountOption === "Weekly") {
      if (rentAmount < minimumRentWeekly || rentAmount > maximumRentWeekly) {
        setRentAmountValidation("incorrect-input");
        if (rentAmount < minimumRentWeekly) {
          setErrorMessageRent("Amount too low, minimum is £25");
          setIsRentValid(false);
        }
        if (rentAmount > maximumRentWeekly) {
          setErrorMessageRent("Amount too high, maximum is £2000");
          setIsRentValid(false);
        }
      }
      if (rentAmount >= minimumRentWeekly && rentAmount < maximumRentWeekly) {
        setRentAmountValidation("correct-input");
        setErrorMessageRent("");
        setRentAmount(rentAmount);
        setIsRentValid(true);
      }
    }

    if (amountOption === "Monthly") {
      if (rentAmount < minimumRentMonthly || rentAmount > maximumRentMonthly) {
        setRentAmountValidation("incorrect-input");

        if (rentAmount < minimumRentMonthly) {
          setErrorMessageRent("Amount too low, minimum is £110");
          setIsRentValid(false);
        }
        if (rentAmount > maximumRentMonthly) {
          setErrorMessageRent("Amount too high, maximum is £8660");
        }
      }
      if (rentAmount >= minimumRentMonthly && rentAmount < maximumRentMonthly) {
        setRentAmountValidation("correct-input");
        setErrorMessageRent("");
        setIsRentValid(true);
        setRentAmount(rentAmount);
      }
    }

    if (isNaN(rentAmount) && !fixed_membership_fee) {
      setRentAmountValidation("correct-input");
      setErrorMessageRent("");
      setIsRentValid(false);
      setRentAmount(rentAmount);
    }

    if (isNaN(rentAmount) && fixed_membership_fee) {
      setRentAmountValidation("correct-input");
      setErrorMessageRent("");
      setIsRentValid(true);
      setRentAmount(rentAmount);
    }
  };

  validatePostcode = postcode => {
    const {
      setPostcodeValidation,
      setErrorMessagePostcode,
      setIsPostcodeValid,
      setIsRentValid,
      setPostcode
    } = this.props;
    const { fixed_membership_fee } = this.props.bondData.challangeAPIData;
    if (fixed_membership_fee) {
      setIsRentValid(true);
    }

    if (postcode === "") {
      setPostcodeValidation("correct-input");
      setErrorMessagePostcode("");
      setIsPostcodeValid(false);
      return;
    }
    postcode = postcode.match(/^[A-Z][0-9.]{0,3}[ ][0-9]{1}[A-Z]{2}$/);
    if (!postcode) {
      setPostcodeValidation("incorrect-input");
      setErrorMessagePostcode("Postcode format needs to be N2 7AC");
      setIsPostcodeValid(false);
    }
    if (postcode) {
      setPostcodeValidation("correct-input");
      setErrorMessagePostcode("");
      setIsPostcodeValid(true);
      setPostcode(postcode[0]);
    }
  };

  handleSubmittion = () => {
    const {
      setPostcode,
      setRentAmount,
      setMembershipFee,
      setCreatedPost
    } = this.props;
    const {
      isPostcodeValid,
      isRentValid,
      rentAmount,
      postcode
    } = this.props.bondData;
    const {
      fixed_membership_fee,
      fixed_membership_fee_amount
    } = this.props.bondData.challangeAPIData;

    let membershipFee;

    if (isPostcodeValid && isRentValid) {
      setPostcode(postcode);

      if (fixed_membership_fee) {
        if (fixed_membership_fee_amount < 12000) {
          membershipFee = 120;
        }
        if (fixed_membership_fee_amount >= 12000) {
          membershipFee = ((fixed_membership_fee_amount / 100) * 1.2).toFixed(
            2
          );
        }
        setMembershipFee(membershipFee);
        setRentAmount(fixed_membership_fee_amount / 100);
      }

      if (!fixed_membership_fee) {
        if (rentAmount < 120) {
          membershipFee = 120;
        }
        if (rentAmount >= 120) {
          membershipFee = (rentAmount * 1.2).toFixed(2);
        }
        setMembershipFee(membershipFee);
        setRentAmount(rentAmount);
      }

      axios
        .post(
          "https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/flatbond",
          {
            rent: rentAmount,
            postcode: postcode
          }
        )
        .then(res => {
          setCreatedPost(res.data.status);
        })
        .catch(error => {
          console.log(error.response);
        })
        .then(
          setTimeout(() => {
            this.props.history.push("/welcome");
          }, 2000)
        );
    }
  };

  handleClear = () => {
    this.props.setRentAmountValidation("correct-input");
    this.props.setErrorMessageRent("");
    this.props.setIsRentValid(false);
    this.props.setRentAmount(0);

    this.props.setPostcodeValidation("correct-input");
    this.props.setErrorMessagePostcode("");
    this.props.setIsPostcodeValid(false);
    this.props.setPostcode("");
    this.props.setCreatedPost("");

    document.getElementById("rentForm").value = "";
    document.getElementById("postcodeForm").value = "";
  };

  handleForm = () => {
    const {
      rentAmountValidation,
      postcodeValidation,
      errorMessageRent,
      errorMessagePostcode,
      isRentValid,
      createdPost
    } = this.props.bondData;
    return (
      <div className="form-container">
        <div className="card-container">
          <div className="card">
            <div className="amounts-container">
              <div className="inputs">
                <span className="rent-title">{"Rent Amount "}</span>
                <input
                  id="rentForm"
                  type="text"
                  onChange={e => this.validateRent(e.target.value)}
                  placeholder="Enter rent amount..."
                  className={rentAmountValidation}
                />
              </div>
              {errorMessageRent.length ? (
                <div className="error-message">{errorMessageRent}</div>
              ) : (
                ""
              )}
              <div className="inputs">
                <span className="postcode-title">{"Postcode "}</span>
                <input
                  id="postcodeForm"
                  type="text"
                  onChange={e => this.validatePostcode(e.target.value)}
                  placeholder="Enter postcode..."
                  className={postcodeValidation}
                />
              </div>
              {errorMessagePostcode.length ? (
                <div className="error-message">{errorMessagePostcode}</div>
              ) : (
                ""
              )}
            </div>
            <div className="select-container">
              <select
                className="select-option"
                onChange={e => this.handleOption(e.target.value)}
              >
                <option className="weekly-option" value="Weekly">
                  Weekly
                </option>
                <option className="monthly-option" value="Monthly">
                  Monthly
                </option>
              </select>
            </div>
          </div>
          <div className="form-button">
            <div className="submit-button" onClick={this.handleSubmittion}>
              Submit
            </div>
            <div className="clear-button" onClick={this.handleClear}>
              Clear
            </div>
          </div>
        </div>
        {isRentValid ? (
          <div className="membership-fee">{this.showMembershipFee()}</div>
        ) : (
          ""
        )}
        {createdPost && (
          <div>
            <div className="created-post">{this.showCreatedPost()}</div>
          </div>
        )}
      </div>
    );
  };

  showMembershipFee = () => {
    return (
      <div className="membership-fee-info">
        <span className="fee">{"Membership fee: £"}</span>
        <span className="fee">
          <MembershipFee
            rentAmount={this.props.bondData.rentAmount}
            challangeAPIData={this.props.bondData.challangeAPIData}
          />
        </span>
      </div>
    );
  };

  showCreatedPost = () => {
    return (
      <div className="created-post-info">
        <span className="status">
          {"Status: " + this.props.bondData.createdPost}
        </span>
      </div>
    );
  };

  render() {
    return (
      <div className="registration-container">
        {this.props.bondData.challangeAPIData && <div>{this.handleForm()}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { bondData: state };
};

const mapDispatchToProps = dispatch => {
  return {
    addChallangeAPI: challangeAPIData =>
      dispatch(addChallangeAPI(challangeAPIData)),
    setAmountOption: option => dispatch(setAmountOption(option)),

    setMembershipFee: membershipFee =>
      dispatch(setMembershipFee(membershipFee)),

    setRentAmount: rentAmount => dispatch(setRentAmount(rentAmount)),
    setErrorMessageRent: errorMessageRent =>
      dispatch(setErrorMessageRent(errorMessageRent)),
    setRentAmountValidation: rentAmountValidation =>
      dispatch(setRentAmountValidation(rentAmountValidation)),
    setIsRentValid: isRentValid => dispatch(setIsRentValid(isRentValid)),

    setPostcode: postcode => dispatch(setPostcode(postcode)),
    setErrorMessagePostcode: errorMessagePostcode =>
      dispatch(setErrorMessagePostcode(errorMessagePostcode)),
    setPostcodeValidation: postcodeValidation =>
      dispatch(setPostcodeValidation(postcodeValidation)),
    setIsPostcodeValid: isPostcodeValid =>
      dispatch(setIsPostcodeValid(isPostcodeValid)),

    setCreatedPost: createdPost => dispatch(setCreatedPost(createdPost))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage);
