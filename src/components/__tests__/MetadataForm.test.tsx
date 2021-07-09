import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MetadataForm } from "../MetadataForm";
import { initialState } from "../../types";

describe('MetadataForm component', () => {

    it('can be rendered', () => {
        const wrapper = shallow(
            <MetadataForm metadata={initialState.metadata} onChange={jest.fn()} />
        );
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

});
