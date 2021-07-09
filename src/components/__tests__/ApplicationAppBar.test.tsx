import React from 'react';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { ApplicationAppBar } from "../ApplicationAppBar";

describe('ApplicationAppBar component', () => {

    it('can be rendered', () => {
        const wrapper = shallow(<ApplicationAppBar />);
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

});
