import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import {Button, createTheme, Grid, Modal, TextField, ThemeProvider, Typography} from "@mui/material";
import Web3 from "web3";
import {DydxClient} from '@dydxprotocol/v3-client';

export function InputWithIcon() {
    const theme = React.useMemo(() => createTheme({palette: {mode: 'dark', primary: {main: "#5973fe"}}}));
    const [ethKey, setEthKey] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    const [starkKey, setStarkKey] = React.useState('');
    const handleClose = () => setOpenModal(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        color: 'white'
    };

    const onChangeString = (event, setVariable) => {
        let value = event.target.value;
        setVariable(value);
    }

    const convertToStark = async () => {
        const starkKey = ethKey;
        setEthKey('');
        try {
            const web3 = new Web3();
            const account = web3.eth.accounts.privateKeyToAccount('0x' + starkKey);
            web3.eth.accounts.wallet.add(account);
            web3.eth.defaultAccount = account.address;
            const clientByWeb3 = new DydxClient('https://api.dydx.exchange', {web3: web3});
            const apiKey = {
                starkPrivateKey: await clientByWeb3.onboarding.deriveStarkKey(account.address),
                apiKeyCredentials: await clientByWeb3.onboarding.recoverDefaultApiCredentials(account.address),
            }
            setStarkKey(JSON.stringify(apiKey));
        } catch (e) {
            console.error("ERROR", e);
            setStarkKey(e.message);
        }
        setOpenModal(true);
    }

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Your Stark Key
                    </Typography>
                    <Grid container
                          spacing={2}
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                    >
                        <Grid item xs={8}>
                            <TextField
                                multiline
                                value={starkKey}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained"
                                    onClick={() => navigator.clipboard.writeText(starkKey)}>
                                Copy Key
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <Box sx={{'& > :not(style)': {m: 1}, color: 'white'}}>
                <TextField
                    id="eth-key"
                    label="ERC20 Private Key"
                    color="primary"
                    type="password"
                    onChange={(e) => onChangeString(e, setEthKey)}
                    value={ethKey}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon/>
                            </InputAdornment>
                        )
                    }}
                />
                <Button variant="contained" onClick={convertToStark}>Convert</Button>
            </Box>
        </ThemeProvider>
    );
}
