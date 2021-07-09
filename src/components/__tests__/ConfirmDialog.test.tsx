import React from 'react';
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { ConfirmDialog } from "../ConfirmDialog";

describe('ConfirmDialog component', () => {

    it('can be rendered', () => {
        const wrapper = shallow(<ConfirmDialog display={false} onAccept={jest.fn()} onReject={jest.fn()} />);
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

});
