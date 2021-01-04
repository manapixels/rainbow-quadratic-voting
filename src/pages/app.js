import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import CreatePoll from "../components/CreatePoll"
import Voting from "../components/Voting"
import Results from "../components/Results"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"

import 'tippy.js/dist/tippy.css'

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/voting/create" component={CreatePoll} />
      <PrivateRoute path="/app/voting/complete" component={Results} />
      <PrivateRoute path="/app/voting" component={Voting} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App
