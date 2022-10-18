import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
// @mui
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import AuthSocial from '../sections/auth/AuthSocial';
// components
import Iconify from '../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../components/hook-form';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

export default function ResetPassword() {

    const queryString = window.location.search;
    const email = queryString.split('?email=')[1];

    const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');

    const [message, setMessage] = useState("");
    const [forget, setForget] = useState(false);

    const navigate = useNavigate();

    const defaultValues = {
        password: '',
        confPassword: ''
    };

    const methods = useForm({
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const resetPassword = async (e) => {
        console.log("Front called...\n", email);
        const newPassword = e.password;
        const confPassword = e.confPassword;
        if (newPassword === confPassword) {
            await axios.put(`http://localhost:9000/api/users/:${email}`,
                {
                    password: newPassword
                })
                .then(res => {
                    setMessage(res.data);
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
        else {
            setMessage("Password must match with confirm password")
        };

    };
    useEffect(() => {

    }, [message]);

    return (
        <Page title="Reset">
            <RootStyle>
                <HeaderStyle>
                    <Logo />
                </HeaderStyle>

                {mdUp && (
                    <SectionStyle>
                        <Typography variant="h3" sx={{ px: 5, mt: 20, mb: 5 }}>
                            Hi, Welcome Back
                        </Typography>
                        <img src="/static/illustrations/illustration_login.png" alt="login" />
                    </SectionStyle>
                )}

                <Container maxWidth="sm">
                    <ContentStyle>
                        <Typography variant="h4" gutterBottom>
                            Reset password
                        </Typography>

                        <Typography sx={{ color: 'text.secondary', mb: 5 }}>Please enter your new password.</Typography>

                        <FormProvider methods={methods} onSubmit={handleSubmit(resetPassword)}>
                            <Stack spacing={3}>
                                <RHFTextField name="password" label="new password" />
                            </Stack>
                            <br />
                            <Stack spacing={3}>
                                <RHFTextField name="confPassword" label="confirm password" />
                            </Stack>
                            <br />
                            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                Save
                            </LoadingButton>
                            <p style={{ marginTop: '20px', textAlign: 'center' }}>{message}</p>
                        </FormProvider>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page>

    );
}
