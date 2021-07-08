import React from 'react';
import { Meta, Story } from '@storybook/react';

import { ApplicationAppBar, ApplicationAppBarProps } from "../ApplicationAppBar";
import { action } from "@storybook/addon-actions";

export default {
    title: 'Example/ApplicationAppBar',
    component: ApplicationAppBar,
} as Meta;

const Template: Story<ApplicationAppBarProps> = (args) => <ApplicationAppBar {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'test-document.pdf',
    pages: 4,
    onMenu: action('onMenu'),
    onNewDocument: action('onNewDocument'),
    onSaveDocument: action('onSaveDocument'),
    onEditMetadata: action('onEditMetadata'),
};
