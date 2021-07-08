import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import { Meta, Story } from '@storybook/react';
import { MetadataForm, MetadataFormProps } from '../MetadataForm';
import { PdfMetadata } from "../../types";

export default {
    title: 'Example/PdfMetadata',
    component: MetadataForm,
} as Meta;

const Simple: Story<MetadataFormProps> = (args) => (
    <MetadataForm {...args} />
);

const Template: Story<MetadataFormProps> = (args) => {
    const [ displayed, setDisplayed ] = useState(false);
    const onChange = (metadata: PdfMetadata) => setDisplayed(false);
    const onDisplay = () => setDisplayed(true);

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={onDisplay}>Enter Metadata</Button>
            {displayed && <MetadataForm
                {...args}
                onChange={onChange}/>}
        </div>
    );
}

export const Default = Simple.bind({});
Default.args = {
    metadata: {
        title: 'Title',
        author: 'Author',
        subject: 'Subject',
        creator: 'Creator',
        keywords: 'Keywords',
        producer: 'Producer',
        creationDate: new Date(),
        modificationDate: new Date(),
    },
}

export const PopupEmptyDialog = Template.bind({});
PopupEmptyDialog.args = {
    metadata: {
        title: '',
        author: '',
        subject: '',
        creator: '',
        keywords: '',
        producer: 'pdf-scanner',
        creationDate: undefined,
        modificationDate: undefined,
    },
};

export const PopupPopulatedDialog = Template.bind({});
PopupPopulatedDialog.args = {
    metadata: {
        title: 'Title',
        author: 'Author',
        subject: 'Subject',
        creator: 'Creator',
        keywords: 'Keywords',
        producer: 'Producer',
        creationDate: new Date(),
        modificationDate: new Date(),
    },
};
