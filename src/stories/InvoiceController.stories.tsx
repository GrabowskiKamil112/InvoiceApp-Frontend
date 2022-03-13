import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Header from '../components/Atoms/Header'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/Header',
    component: Header,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    //argTypes: {},
} as ComponentMeta<typeof Header>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = () => <Header size="big" />

export const HeaderComponent = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HeaderComponent.args = {}
