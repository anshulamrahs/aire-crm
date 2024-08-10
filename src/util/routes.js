import HomePage from '../components/home-page/home-page.component';
import ForgotPasswordForm from '../components/forgot-password-flow/forgotPasswordForm/forgotPassword';
import VerifyEmailForm from '../components/forgot-password-flow/emailVerificationForm/verifyEmail';
import ResetPasswordForm from '../components/forgot-password-flow/resetPasswordForm/resetPassword';
import Leads from '../components/leads/leads.component';
import Home from '../components/home/home.component';
import Login from '../components/login/login.component';
import RegisterForm from '../components/register/register.component';
import LeadInfoPage from '../components/leads/leadInfoPage.component';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path:'', element: <Home />},
            {path: 'register', element: <RegisterForm />},
            {
                path: 'login', 
                children:[
                    {path: '', element: <Login />},
                    {path: 'forgot-password', element: <ForgotPasswordForm />},
                    {path: 'verify-email', element: <VerifyEmailForm />},
                    {path: 'reset-password', element: <ResetPasswordForm />}
                ]
            },
            {path:'home', element: <HomePage />},
            {
                path:'leads',
                children: [
                    {path: '', element: <Leads />},
                    {path: 'leadInfo', element: <LeadInfoPage /> }
                ]

            },
        ]
    }
])
// const router1 = createBrowserRouter([
//     {
//       path: '/',
//       element: <Home />,
//     },
//     {
//       path: '/register',
//       element: <RegisterForm />,
//     },
//     {
//       path: '/login',
//       element: <Login />,
//     },
//     {
//       path: '/home',
//       element: <HomePage />,
//     },
//     {
//       path: '/login/forgot-password',
//       element: <ForgotPasswordForm />,
//     },
//     {
//       path: '/login/verify-email/:email',
//       element: <VerifyEmailForm />,
//     },
//     {
//       path: '/login/reset-password/:email',
//       element: <ResetPasswordForm />,
//     },
//     {
//       path: '/leads',
//       element: <Leads />,
//     },
// ]);

export default router;