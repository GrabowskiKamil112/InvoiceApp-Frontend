import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Spartan:wght@300;500;700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900');

    *,*::before,*::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
       //outline: 1px dashed rgba(255, 0, 0, 0.5)
    }
    html{
       height:100vh;
        font-size:62.5%;
        width: 100vw;
        overflow-x: hidden;
        overflow-y: initial;
    }
    body{ 
        -webkit-font-smoothing: antialiased;
         -moz-osx-font-smoothing: grayscale;
        line-height: 1.125;
        letter-spacing: -0.25px;
        font-size: 1.6rem;
        font-family: 'Spartan', sans-serif;
       
    }
`

export default GlobalStyle
