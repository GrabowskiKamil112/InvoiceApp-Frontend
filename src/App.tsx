import './styles.css'
import img from '../public/assets/hacker.jpg'
import { Counter } from './clickCounter'

export const App = () => {
    const name = '456'
    return (
        <div>
            <h1>
                Hello TS React app - {process.env.NODE_ENV} - {process.env.name}
                {name}
            </h1>
            <img src={img} alt="hacker_image" width="400px" height="auto" color="red" />
            <Counter />
        </div>
    )
}
