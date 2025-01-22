import { useContext, useState } from 'react';
import { 
    Container, 
    Typography, 
    TextField, 
    FormControl, 
    FormLabel, 
    Divider,
    Button,
    Box, 
    Grid 
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FieldError } from '../../components/errors/Errors';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/providers/AuthProvider';

const LoginPage = () => {
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const formSubmit = (values) => {    
        const localData = localStorage.getItem("users");
        
        if(!localData) {
            navigate("/register");
        }
        const users = JSON.parse(localData);
        const user = users.find(u => u.email === values.email);
        
        if(user) {
            if(user.password === values.password) {
                localStorage.setItem("auth", JSON.stringify(user));
                login();
                navigate("/");
            } else {
                setSubmitError("Невірний пароль");
            }
        } else {
            setSubmitError(`Користувача з ${values.email} не знайдено`);
        }
    }

    // init values
    const initValues = {
        email: "",
        password: ""
    };

    // validation scheme with yup
    const yupValidationScheme = Yup.object({
        email: Yup.string().email("Не вірний формат пошти").required("Обов'язкове поле"),
        password: Yup.string().min(6, "Мінімальна довжина паролю 6 символів")
    });

    // formik
    const formik = useFormik({
        initialValues: initValues,
        validationSchema: yupValidationScheme,
        onSubmit: formSubmit
    });

    return (
        <Container maxWidth="sm" sx={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)', borderRadius: 2, padding: 4 }}>
            <Typography
                component="h1"
                variant="h4"
                sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: "center", color: 'white', fontWeight: 'bold', marginBottom: 3 }}
            >
                Sign in
            </Typography>

            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <FormControl sx={{ marginBottom: 2 }}>
                    <FormLabel htmlFor="email" sx={{ color: 'white' }}>Email</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { borderColor: '#fff' }, '&:hover .MuiOutlinedInput-root': { borderColor: '#fff' }}}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <FieldError text={formik.errors.email} />
                    ) : null}
                </FormControl>
                
                <FormControl sx={{ marginBottom: 3 }}>
                    <FormLabel htmlFor="password" sx={{ color: 'white' }}>Password</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { borderColor: '#fff' }, '&:hover .MuiOutlinedInput-root': { borderColor: '#fff' }}}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <FieldError text={formik.errors.password} />
                    ) : null}
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: '#2575fc',
                        '&:hover': { backgroundColor: '#6a11cb' },
                        padding: '12px 0',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        textTransform: 'none'
                    }}
                >
                    Sign in
                </Button>
            </Box>

            <Divider sx={{ marginY: 2 }}>
                <Typography sx={{ color: 'white' }}>or</Typography>
            </Divider>

            <Grid container justifyContent="center">
                <Typography sx={{ color: 'white' }}>
                    Don't have account?{' '}
                    <Link to="/register" style={{ color: '#fff', fontWeight: 'bold' }}>
                        Sign up
                    </Link>
                </Typography>
            </Grid>

            <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <FieldError text={submitError} />
            </Box>
        </Container>
    );
}

export default LoginPage;
