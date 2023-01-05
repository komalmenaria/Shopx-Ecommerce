import React from 'react';
import { Link } from 'react-router-dom';
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

Bugsnag.start({
  apiKey: 'c65be705ee4923b7263c07c82e551d19',
  plugins: [new BugsnagPluginReact()]
})

const ErrorBoundary = Bugsnag.getPlugin('react')
  .createErrorBoundary(React)

function ErrorView() {
  return (
    <>
      <div className='container my-3 d-flex flex-column justify-content-center'>
      <h1>404 Page Not Found</h1>
        <Link to="/">back to Home Page</Link>
      </div>
      {/* <ErrorBoundary>
    <YourApp />
  </ErrorBoundary> */}
    </>
  )
}

export default ErrorView