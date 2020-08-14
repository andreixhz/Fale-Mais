import React from 'react';
import Logo from '../../assets/images/logo.svg'
import Calculator from '../../components/Calculator';

import './style.css';


function Home(){

    return(
        <div className="content-home">
            <img src={Logo} alt="Fale Mais"/>
            <p>A FaleMais está contente em vé-lo aqui.</p>
            <Calculator/>
        </div>
    )
}

export default Home;