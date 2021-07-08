import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import { Meta, Story } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { defaultSettings, Settings, SettingsDrawer, SettingsDrawerProps, } from "../SettingsDrawer";

export default {
    title: 'Example/SettingsDrawer',
    component: SettingsDrawer,
} as Meta;

const Simple: Story<SettingsDrawerProps> = (args) => (
    <SettingsDrawer {...args} />
);

const Template: Story<SettingsDrawerProps> = (args) => {
    const [ displayed, setDisplayed ] = useState(false);
    const onChange = (settings: Settings) => {
        setDisplayed(false)
        args.onChange(settings);
    };
    const onDisplay = () => setDisplayed(true);

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={onDisplay}>Configure Settings</Button>
            {displayed && <SettingsDrawer {...args} onChange={onChange}/>}
        </div>
    );
};

export const Default = Simple.bind({});
Default.args = {
    settings: defaultSettings(),
    onChange: action('onChange'),
}

export const PopupEmptyDialog = Template.bind({});
PopupEmptyDialog.args = {
    settings: defaultSettings(),
    onChange: action('onChange'),
};

export const PopupPopulatedDialog = Template.bind({});
PopupPopulatedDialog.args = {
    settings: {
        defaultAuthor: 'John Smith',
        autoRotate: true,
    },
    onChange: action('onChange'),
};
