import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { App } from '../App';

describe('App component', () => {

    it('can be rendered', () => {
        const wrapper = shallow(<App />);
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

});
