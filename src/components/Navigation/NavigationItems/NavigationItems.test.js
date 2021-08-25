import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import { configure } from "@testing-library/dom";
import NavigationItems from "./NavigationItems";
import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
	it("should render two <NavigationItem /> elements if not authenticated", () => {
		const wrapper = shallow(<NavigationItems />);
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
});
