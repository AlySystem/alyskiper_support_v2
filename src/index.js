import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './scss/styles.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-boost'
import { Router } from "@reach/router";
import Dashboard from './pages/Dashboard/Dashboard'

const client = new ApolloClient({
    uri: 'https://backend-alyskiper.herokuapp.com/graphql',
    //uri: 'http://localhost:3000/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token')
        const authorization = token ? `Bearer ${token}` : ''

        operation.setContext({
            headers: {
                Authorization: authorization
            }
        })
    },
    cache: new InMemoryCache({
        addTypename: false
    }),
    onError: ({ networkError, graphQLErrors }) => {
        networkError && console.log(networkError.message)
        graphQLErrors && console.log(graphQLErrors.message)
        //console.log('graphQLErrors', networkError);
    }
})

ReactDOM.render(
        <ApolloProvider client={client}>
            <Router>
                <Login path='/login' />
                <Home path='/*' />
            </Router>
        </ApolloProvider>
    , document.getElementById('root'))

serviceWorker.unregister()

export {client}