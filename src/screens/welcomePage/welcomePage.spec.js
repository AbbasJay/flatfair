import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { WelcomePage } from "./welcomePage";

configure({ adapter: new Adapter() });

let mockDetails = {
  amountOption: "Weekly",
  postcode: "N1 7BZ",
  rentAmount: "60",
  membershipFee: "120"
};

describe("WelcomePage component", () => {
  it("should render", () => {
    let mountedComponent = shallow(<WelcomePage bondData={mockDetails} />);
    expect(mountedComponent.length).toBe(1);
  });

  it("should show rent amount", () => {
    let mountedComponent = shallow(<WelcomePage bondData={mockDetails} />);
    let rentText = mountedComponent.find("ul.rent-amount").text();
    expect(rentText).toEqual("Rent Amount : £60");
  });

  it("should show amount option", () => {
    let mountedComponent = shallow(<WelcomePage bondData={mockDetails} />);
    let amountOptionText = mountedComponent.find("ul.amount-option").text();
    expect(amountOptionText).toEqual("Amount Option : Weekly");
  });

  it("should show membership fee", () => {
    let mountedComponent = shallow(<WelcomePage bondData={mockDetails} />);
    let membershipFeeText = mountedComponent
      .find("ul.membership-fee-text")
      .text();
    expect(membershipFeeText).toEqual("Membership Fee : £120");
  });

  it("should show postcode", () => {
    let mountedComponent = shallow(<WelcomePage bondData={mockDetails} />);
    let postcodeText = mountedComponent.find("ul.postcode").text();
    expect(postcodeText).toEqual("Postcode : N1 7BZ");
  });

  it("should show back buton", () => {
    let mountedComponent = shallow(<WelcomePage bondData={mockDetails} />);
    let welcomeOption = mountedComponent.find("div.back-button").text();
    expect(welcomeOption).toEqual("Back");
  });
});
