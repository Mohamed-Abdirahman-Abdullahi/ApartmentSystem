import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [message, setMessage] = useState("");
  const [userEmail, setEmail] = useState();
  const [forget, setForget] = useState(false);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e) => {
    await axios.post('http://localhost:9000/api/users/login', {
      email: e.email,
      password: e.password
    })
      .then(res => {
        navigate('/dashboard/app', { replace: true });
      })
      .catch(err => {
        setMessage('Invalid email or password.');
      });
  };

  return (
    <>
      {
        (!forget) ?
          <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <RHFTextField name="email" label="Email address" />

                <RHFTextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <RHFCheckbox name="remember" label="Remember me" />
                <Link variant="subtitle2" underline="hover" onClick={() => setForget(true)}>
                  Forgot password?
                </Link>
              </Stack>

              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Login
              </LoadingButton>
              <p style={{ marginTop: '20px', textAlign: 'center' }}>{message}</p>
            </FormProvider>
          </div> :
          <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>

                <RHFTextField name="email" label="Email address" />

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Reset
                </LoadingButton>
              </Stack>
            </FormProvider>
          </div>
      }



    </>
  );
}
