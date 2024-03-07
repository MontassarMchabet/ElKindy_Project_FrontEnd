import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import HomeLayout from './FrontOffice/layouts/home'
import TicketComponent from './views/admin/tickets/index'
import CommentComponent from './views/admin/comments/index'
import EventComponent from './views/admin/events/index'
import SigninLayout from 'layouts/signIn'
import SignupLayout from 'layouts/signUp'
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import PrivateRoute from 'components/privateRoute/PrivateRoute';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<HashRouter>
					<Switch>
						{/* Routes accessible to all users */}
						<Route path="/auth" component={AuthLayout} />
						<Route path="/signin" component={SigninLayout} />
						<Route path="/signup" component={SignupLayout} />
						<Route path="/home" component={HomeLayout} />
						
						{/* Routes accessible only to authenticated users with specific roles */}
						
						{/* <PrivateRoute path="/event/:eventId" component={TicketsLayout} allowedRoles={['admin']}/> */}
						{/* <PrivateRoute path="/admin/event/:eventId/tickets" component={TicketsLayout} allowedRoles={['admin']}/> */}
						
						<PrivateRoute path="/admin" component={AdminLayout} allowedRoles={['admin']} />
						<Route path="/event/:eventId/tickets" component={TicketComponent} />
						<Route path="/event/:eventId/comments" component={CommentComponent} />
						{/* <Route path="/:eventId/tickets" component={TicketComponent} /> */}
						{/* <Route path="admin/event">
							<Route  index element={<EventComponent/>}/>
							<Route  path=":eventId/tickets" element={<TicketComponent/>}/>
							
						</Route>  */}
        				
						{/* <PrivateRoute path="/tickets" component={TicketsLayout} allowedRoles={['admin']}/> */}
						{/* Redirect any other path to home */}
						<Redirect from="/" to="/home" />
					</Switch>
				</HashRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
