import React from 'react';
import { Meta, Story } from '@storybook/react';
import { App } from '../App';

export default {
    title: 'Example/Application',
    component: App,
    argTypes: {
        label: { control: 'text' },
    },
} as Meta;

const Template: Story = () => <App/>;

export const Default = Template.bind({});
Default.args = {};
