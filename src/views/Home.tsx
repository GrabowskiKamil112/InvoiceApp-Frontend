import React from 'react'
import NavigationTemplate from '../templates/NavigationTemplate'

type HomeProps = {
    user: string | null
}
const Home: React.FC<HomeProps> = () => {
    return <NavigationTemplate>Home</NavigationTemplate>
}

export default Home
