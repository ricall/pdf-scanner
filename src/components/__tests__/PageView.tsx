import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PageView } from "../PageView";

describe('PageView component', () => {

    it('can be rendered', () => {
        const wrapper = shallow(<PageView
            index={1}
            page={{
                page: 1,
                angle: 180
            }}
            selected={true}
            onClick={jest.fn()}
            onRotatePage={jest.fn()}
            onMovePageRight={jest.fn()}
            onMovePageLeft={jest.fn()}
            onDeletePage={jest.fn()}
        />);
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

});
