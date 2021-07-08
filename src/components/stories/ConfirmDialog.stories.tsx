import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { ConfirmDialog, ConfirmDialogProps } from "../ConfirmDialog";

export default {
    title: 'Example/ConfirmDialog',
    component: ConfirmDialog,
} as Meta;

const Template: Story<ConfirmDialogProps> = (args) => <ConfirmDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
    display: true,
    onAccept: action('onAccept'),
    onReject: action('onReject'),
};
