import React, { useState } from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f79b06', // Color de operadores básicos
    },
    secondary: {
      main: '#313131', // Otros botones
    },
    background: {
      default: '#000', // Fondo negro
    },
    error: {
      main: '#a0a0a0', // Color del botón "AC"
    },
    success: {
      main: '#f79b06', // Color personalizado para el botón "=" (se puede ajustar según tus preferencias)
    },
  },
  typography: {
    fontFamily: 'Helvetica, Arial, sans-serif', // Fuente similar a iOS
  },
});

function Calculadora() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleDigitClick = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const handleOperatorClick = (newOperator) => {
    const inputValue = parseFloat(display);

    if (operator && !isNaN(previousValue)) {
      const result = performCalculation(operator, previousValue, inputValue);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(inputValue);
    }

    setWaitingForOperand(true);
    setOperator(newOperator);
  };

  const handleEqualsClick = () => {
    const inputValue = parseFloat(display);
  
    if (operator && !isNaN(previousValue)) {
      const result = performCalculation(operator, previousValue, inputValue);
      setDisplay(String(result));
      setPreviousValue(null);
      setWaitingForOperand(true); // Restablecer el estado de espera de operando
      setOperator(null);
    } else {
      setWaitingForOperand(true); // Si no hay operador, establece el estado de espera de operando
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performCalculation = (operator, prevValue, currentValue) => {
    switch (operator) {
      case '+':
        return prevValue + currentValue;
      case '-':
        return prevValue - currentValue;
      case '*':
        return prevValue * currentValue;
      case '/':
        return prevValue / currentValue;
      default:
        return currentValue;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', 
        }}
      >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '375px', // Ancho del iPhone 12
          height: '812px', // Alto del iPhone 12 (ajusta esto según tus necesidades)
          padding: 5,
          backgroundColor: theme.palette.background.default,
          borderRadius: '10px',
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4" align="right" sx={{ padding: 1, margin: 2, backgroundColor: theme.palette.background.default, color: '#fff' }}>
              {display}
            </Typography>
          </Grid>
          {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', '=', 'AC', '/'].map((item, index) => (
            <Grid item xs={3} sm={3} key={index} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={() => {
                  if (item === '=') {
                    handleEqualsClick();
                  } else if (item === 'AC') {
                    handleClearClick();
                  } else if (['+', '-', '*', '/'].includes(item)) {
                    handleOperatorClick(item);
                  } else {
                    handleDigitClick(item);
                  }
                }}
                style={{
                  borderRadius: '50%', // Botones redondos
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  margin: '4px',
                  backgroundColor: item === 'AC' ? theme.palette.error.main : item === '=' ? theme.palette.success.main : 
                    /^[0-9.]+$/.test(item) ? theme.palette.secondary.main : theme.palette.primary.main,
                  color:  item === 'AC' ? '#000' : '#fff',
                }}
              >
                {item}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      </div>
    </ThemeProvider>
  );
}

export default Calculadora;
