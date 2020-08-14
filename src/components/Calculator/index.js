import React, {useState, useEffect} from 'react';
import {FormControl, MenuItem, Select, Button,Slider,Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import Plans from '../../data/Plans';
import Locales from '../../data/Locales';


import './style.css';

//Alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Calculator() {

    //Estados de erros e progresso
    const [state, setState] = useState(0);
    const [errorAlert, setErrorAlert] = useState(false);


    //informações coletadas
    const [planId, setPlanId] = useState(-1);
    const [fromDDDId, setfromDDDId] = useState(-1);
    const [toDDDId, settoDDDId] = useState(-1);

    //Componetes dos selectors
    const [planItemMenu, setPlanItemMenu] = useState([])
    const [fromDDDItemMenu, setfromDDDItemMenu] = useState([])
    const [toDDDItemMenu, setToDDDItemMenu] = useState([])

    //Valores finais de comparação
    const [withoutPlanValue, setWithoutPlanValue] = useState(0);
    const [withPlanValue, setWithPlanValue] = useState(0);

    //Textos dinamicos
    const calculatorTitle = [
        'Escolha o plano ideal para você',
        'Escolha de e para onde você que falar',
        'Escolha o tempo que deseja falar'
    ]

    //Inicialização
    useEffect(() => {
        //Bucas por planos
        Plans.forEach((element, index) => {
            setPlanItemMenu(planItemMenu => [...planItemMenu, <MenuItem key={index} value={index}>{element.name}</MenuItem>])
        })
        //Busca por DDD's
        Locales.forEach((element, index) => {
            setfromDDDItemMenu(fromDDDItemMenu => [...fromDDDItemMenu, <MenuItem key={index} value={index}>{element.name}</MenuItem>])
        });
    }, [])

    //Função para verificação de dados selecionados
    function HandleNextStep(){

        if(planId !== -1 && state === 0){
            setState(state+1);
            setErrorAlert(false);
            return; 
        }

        if((fromDDDId !== -1 && toDDDId!== -1) && state === 1){
            setState(state+1);
            setErrorAlert(false);
            return; 
        }

        setErrorAlert(true);
        
    }

    //DDD Primario selecionado
    function HandleFromSelected(e){
        setfromDDDId(e.target.value)
        setToDDDItemMenu([]);
        settoDDDId(-1);
        if(e.target.value === '-1')
            return;
        Locales[e.target.value].to.forEach((element, index) => {
            setToDDDItemMenu(toDDDItemMenu => [...toDDDItemMenu, <MenuItem key={index} value={index}>{element.name}</MenuItem>])
        });
    }

    //Calcular preços
    function HandleCalculePrice(value){

        const LocalePrice = Locales[fromDDDId].to[toDDDId].price;
        const totalValue = ((value - Plans[planId].time) * LocalePrice);
        const incrementValue = totalValue * (10/100);
        const finalValue = totalValue + incrementValue;

        if(finalValue <= 0)
            setWithPlanValue(0);
        else
            setWithPlanValue(Number(finalValue).toFixed(2));

        setWithoutPlanValue(Number(value * LocalePrice).toFixed(2));

    }

    //Todo corpo em html
    return (
        <div className="content-calculator">
            <h1 data-testid="section-title">{calculatorTitle[state]}</h1>
            {
                state === 0 ?
                <div className="plan-container">
                    <FormControl line="false" variant="filled" className="Input_Plan">
                        <Select
                        style={{lineHeight:"3px", borderRadius:'5px', height:'45px'}}
                        className="Input_Plan_Select"
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={planId}
                        disableUnderline 
                        onChange={(e) => setPlanId(e.target.value)}
                        >
                        <MenuItem value={-1}>
                            <em>Escolha um plano para começar</em>
                        </MenuItem>
                        {planItemMenu}
                        </Select>
                    </FormControl>
                </div>
                : state === 1 ? 
                <div className="locale-container">
                    <div>
                        <h1 style={{margin:0,marginRight: '10px'}}>De:</h1>
                        <FormControl line="false" variant="filled" className="Input_locale">
                            <Select
                            required
                            style={{paddingBottom: '13px', borderRadius:'5px', height:'45px'}}
                            className="Input_locale_Select"
                            inputProps={{ 'aria-label': 'Without label' }}
                            value={fromDDDId}
                            disableUnderline 
                            onChange={HandleFromSelected}
                            >
                            <MenuItem key={-1} value="-1">
                                <em>DDD</em>
                            </MenuItem>
                            {fromDDDItemMenu}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <h1 style={{margin:0, marginRight: '10px'}}>Para:</h1>
                        <FormControl line="false" variant="filled" className="Input_locale">
                            <Select
                            required
                            style={{paddingBottom: '13px', borderRadius:'5px', height:'45px'}}
                            className="Input_locale_Select"
                            inputProps={{ 'aria-label': 'Without label' }}
                            value={toDDDId}
                            disableUnderline 
                            onChange={(e) => settoDDDId(e.target.value)}
                            >
                            <MenuItem value="-1">
                                <em>DDD</em>
                            </MenuItem>
                            {toDDDItemMenu}
                            </Select>
                        </FormControl>
                    </div>                            
                </div>
                :
                <div className="minutes-container">
                    <div className="service-info-container">
                            <div>De: {Locales[fromDDDId].name} para: {Locales[fromDDDId].to[toDDDId].name}</div>
                            <div>Plano: {Plans[planId].name}</div>
                    </div>
                    <Slider
                        defaultValue={0}
                        //getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={500}
                        getAriaValueText={HandleCalculePrice}
                    />
                    <div className="info-container">
                        <div>
                            <p>Com FaleMais</p>
                            <h1>{withPlanValue}$</h1>
                        </div>
                        <div>
                            <p>Sem FaleMais</p>
                            <h1>{withoutPlanValue}$</h1>
                        </div>
                    </div>
                </div>
            }
            <div>
                {
                    state === 0 ? <></> :
                    <Button onClick={() => setState(state-1)} variant="contained" style={{color:"#fff", marginRight:"20px", background:"#1976D2"}}>
                        Voltar
                    </Button>
                }
                {
                    state === 2 ? <></> :
                    <Button onClick={() => HandleNextStep()} variant="contained" style={{color:"#fff",background:"#1976D2"}}>
                        Continuar
                    </Button>
                }

            </div>  

            <Snackbar open={errorAlert} autoHideDuration={6000}>
                <Alert severity="error">
                    Selecione as opções acima
                </Alert>
            </Snackbar>

        </div>
    );
}

export default Calculator;