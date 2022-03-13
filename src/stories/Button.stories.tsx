import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '../components/Atoms/Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/Button',
    component: Button,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        variant: {
            options: ['submit', 'loginToggle'],
            control: { type: 'select' },
        },
        color: { control: 'color' },
    },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>

export const ButtonComponent = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ButtonComponent.args = {
    loginToggle: true,
    variant: 'ssubmit',
    width: '100px',
}
