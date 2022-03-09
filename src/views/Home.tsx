import React from 'react'
import NavigationTemplate from '../templates/NavigationTemplate'

type HomeProps = {
    user: string | null
}
const Home: React.FC<HomeProps> = ({ user }) => {
    return <NavigationTemplate>Home: {user}</NavigationTemplate>
}

export default Home
