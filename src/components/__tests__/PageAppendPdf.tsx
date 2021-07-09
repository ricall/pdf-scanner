import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PageAppendPdf } from "../PageAppendPdf";

describe('PageAppendPdf component', () => {

    it('can be rendered', () => {
        const wrapper = shallow(<PageAppendPdf label="label" onAddDocument={jest.fn()} />);
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

});
