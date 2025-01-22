import * as React from 'react';
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
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const formSubmit = (values) => {
        delete values.confirmPassword;

        const users = localStorage.getItem("users");
        if(!users) {
            localStorage.setItem("users", JSON.stringify([{ ...values, id: 1 }]))
        } else {            
            const array = JSON.parse(users);
            values.id = array[array.length - 1].id + 1;            
            array.push(values);
            localStorage.setItem("users", JSON.stringify(array))
        }
    }

    // init values
    const initValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    // validation scheme with yup
    const yupValidationScheme = Yup.object({
        firstName: Yup.string().max(50, "Максимальна довжина 50 символів"),
        lastName: Yup.string().max(50, "Максимальна довжина 50 символів"),
        email: Yup.string().email("Не вірний формат пошти").required("Обов'язкове поле"),
        password: Yup.string().min(6, "Мінімальна довжина паролю 6 символів"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Паролі не збігаються')
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
                Sign up
            </Typography>

            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <FormControl sx={{ marginBottom: 2 }}>
                    <FormLabel htmlFor="firstName" sx={{ color: 'white' }}>First name</FormLabel>
                    <TextField
                        autoComplete="firstName"
                        name="firstName"
                        fullWidth
                        id="firstName"
                        placeholder="Jon"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                        sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { borderColor: '#fff' }, '&:hover .MuiOutlinedInput-root': { borderColor: '#fff' }}}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <FieldError text={formik.errors.firstName} />
                    ) : null}
                </FormControl>

                <FormControl sx={{ marginBottom: 2 }}>
                    <FormLabel htmlFor="lastName" sx={{ color: 'white' }}>Last name</FormLabel>
                    <TextField
                        autoComplete="lastName"
                        name="lastName"
                        fullWidth
                        id="lastName"
                        placeholder="Snow"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                        sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { borderColor: '#fff' }, '&:hover .MuiOutlinedInput-root': { borderColor: '#fff' }}}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <FieldError text={formik.errors.lastName} />
                    ) : null}
                </FormControl>

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

                <FormControl sx={{ marginBottom: 2 }}>
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

                <FormControl sx={{ marginBottom: 3 }}>
                    <FormLabel htmlFor="confirmPassword" sx={{ color: 'white' }}>Confirm password</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        placeholder="••••••"
                        type="password"
                        id="confirmPassword"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        onBlur={formik.handleBlur}
                        sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { borderColor: '#fff' }, '&:hover .MuiOutlinedInput-root': { borderColor: '#fff' }}}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <FieldError text={formik.errors.confirmPassword} />
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
                    Sign up
                </Button>
            </Box>

            <Divider sx={{ marginY: 2 }}>
                <Typography sx={{ color: 'white' }}>or</Typography>
            </Divider>

            <Grid container justifyContent="center">
                <Typography sx={{ color: 'white' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#fff', fontWeight: 'bold' }}>
                        Sign in
                    </Link>
                </Typography>
            </Grid>
        </Container>
    );
}

export default RegisterPage;
