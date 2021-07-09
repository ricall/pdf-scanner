import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PageGrid } from "../PageGrid";
import { initialState } from "../../types";

describe('PageGrid component', () => {

    it('can be rendered', () => {
        const wrapper = shallow(<PageGrid
            document={initialState}
            setCurrentPage={jest.fn()}
            onRotate={jest.fn()}
            onMoveLeft={jest.fn()}
            onMoveRight={jest.fn()}
            onDelete={jest.fn()}
            onAddDocument={jest.fn()}
        />);
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

});
