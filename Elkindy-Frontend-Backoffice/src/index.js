import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import TicketComponent from './views/admin/tickets/index'
import CommentComponent from './views/admin/comments/index'
// import EventComponent from './views/admin/events/index'
import RtlLayout from 'layouts/rtl';

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

	const redirectToSecondProjectHome = () => {
		window.location.href = 'https://el-kindy-project-front-end.vercel.app/a';
	};


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
							<Route path="/home" render={redirectToSecondProjectHome} />
							{/* <Route path="/home" render={HomeLayout} /> */}
							{/* Routes accessible only to authenticated users with specific roles */}
							<PrivateRoute path="/admin" component={AdminLayout} allowedRoles={['admin']} isLoggedIn={isLoggedIn} />
							{/* Redirect any other path to home */}
							<Route path="/event/:eventId/tickets" component={TicketComponent} />
						<Route path="/event/:eventId/comments" component={CommentComponent} />
	                                               
							
						</Switch>
					</HashRouter>
				</ThemeEditorProvider>
			</React.StrictMode>
		</ChakraProvider>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));

