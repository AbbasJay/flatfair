import { Component } from "react";

class MembershipFee extends Component {
  render() {
    const { rentAmount } = this.props;
    const {
      fixed_membership_fee,
      fixed_membership_fee_amount
    } = this.props.challangeAPIData;

    let newRent;
    if (fixed_membership_fee) {
      if (fixed_membership_fee_amount < 12000) {
        newRent = 120;
      }
      if (fixed_membership_fee_amount >= 12000) {
        newRent = ((fixed_membership_fee_amount / 100) * 1.2).toFixed(2);
      }
      return newRent;
    }
    if (rentAmount < 120 && !fixed_membership_fee) {
      newRent = 120;
    }
    if (rentAmount >= 120 && !fixed_membership_fee) {
      newRent = (rentAmount * 1.2).toFixed(2);
    }
    return newRent;
  }
}

export default MembershipFee;
