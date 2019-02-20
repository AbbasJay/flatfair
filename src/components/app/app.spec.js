import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

configure({ adapter: new Adapter() });

describe("App component", () => {
  it("should render", () => {
    let mountedComponent = shallow(<App />);
    expect(mountedComponent.length).toBeGreaterThan(0);
  });
});
