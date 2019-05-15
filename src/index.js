import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import Amplify from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import config from "./secrets/config";

import rootReducer from './reducer.root';
import rootSaga from './saga.root';

import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID
	},
	Storage: {
		region: config.s3.REGION,
		bucket: config.s3.BUCKET,
		identityPoolId: config.cognito.IDENTITY_POOL_ID
	},
	API: {
		endpoints: [
			{
				name: "notes",
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION
			},
			{
				name: "tasks",
				endpoint: 'https://qyzdkjqogd.execute-api.us-east-1.amazonaws.com/demo',
				region: config.apiGateway.REGION
			},
		]
	}
});

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

export const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(
		sagaMiddleware
	)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById("root")
);

registerServiceWorker();
