import React from 'react';
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
    <div>
    <p>Inform users of an error in the component tree.</p>
  </div>
  {/* <ErrorBoundary>
    <YourApp />
  </ErrorBoundary> */}
    </>
  )
}

export default ErrorView