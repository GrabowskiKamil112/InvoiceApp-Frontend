import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Spartan:wght@300;500;700&display=swap');

    *,*::before,*::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: 0;
    }
    html{
        font-size:62.5%;
    }
    body{
        font-size: 1.6rem;
        font-family: 'Spartan', sans-serif;
    }
`

export default GlobalStyle
