import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { RegistrationPage } from "./registrationPage";

configure({ adapter: new Adapter() });

let mockDetails = {
  amountOption: "Weekly",
  postcode: "N1 7BZ",
  rentAmount: 60,
  membershipFee: 120,
  errorMessageRent: "correct-input",
  errorMessagePostcode: "correct-input",
  challangeAPIData: true
};

describe("RegistrationPage component", () => {
  it("should render", () => {
    let mountedComponent = shallow(<RegistrationPage bondData={mockDetails} />);
    expect(mountedComponent.length).toBe(1);
  });

  it("should show rent amount", () => {
    let mountedComponent = shallow(<RegistrationPage bondData={mockDetails} />);
    let rentText = mountedComponent.find("span.rent-title").text();
    expect(rentText).toBe("Rent Amount ");
  });

  it("should show rent amount", () => {
    let mountedComponent = shallow(<RegistrationPage bondData={mockDetails} />);
    let postcodeText = mountedComponent.find("span.postcode-title").text();
    expect(postcodeText).toBe("Postcode ");
  });

  it("should show submit button", () => {
    let mountedComponent = shallow(<RegistrationPage bondData={mockDetails} />);
    let submitButton = mountedComponent.find("div.submit-button").text();
    expect(submitButton).toBe("Submit");
  });

  it("should show weekly option", () => {
    let mountedComponent = shallow(<RegistrationPage bondData={mockDetails} />);
    let weeklyOption = mountedComponent.find("option.weekly-option").text();
    expect(weeklyOption).toBe("Weekly");
  });

  it("should show monthly option", () => {
    let mountedComponent = shallow(<RegistrationPage bondData={mockDetails} />);
    let monthlyOption = mountedComponent.find("option.monthly-option").text();
    expect(monthlyOption).toBe("Monthly");
  });
});
