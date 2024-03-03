import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import HomeLayout from './FrontOffice/layouts/home';
import SigninLayout from 'layouts/signIn';
import SignupLayout from 'layouts/signUp';
import ForgotpasswordLayout from './layouts/forgotpassword';
import ResetPassword from './layouts/resetpassword';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import PrivateRoute from 'components/privateRoute/PrivateRoute';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);


	return (
		<ChakraProvider theme={theme}>
			<React.StrictMode>
				<ThemeEditorProvider>
					<HashRouter>
						<Switch>
							{/* Routes accessible to all users */}
							<Route path="/auth" component={AuthLayout} />
							<Route path="/signin" component={SigninLayout} />
							<Route path="/signup" component={SignupLayout} />
							<Route path="/forgot-password" component={ForgotpasswordLayout} />
							<Route path="/passwordReset/:token" component={ResetPassword} />
							<Route path="/home" component={HomeLayout} />
							{/* Routes accessible only to authenticated users with specific roles */}
							<PrivateRoute path="/admin" component={AdminLayout} allowedRoles={['admin']} isLoggedIn={isLoggedIn} />
							{/* Redirect any other path to home */}
							<Redirect from="/" to="/home" />
						</Switch>
					</HashRouter>
				</ThemeEditorProvider>
			</React.StrictMode>
		</ChakraProvider>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
