import React from "react"
import { Helmet } from "react-helmet"

import Header from "../Header"
import "../../../node_modules/svgxuse/svgxuse.min.js"

// Global styles and component-specific styles.
import "./global.scss"
import "./fonts.scss"
import styles from "./main.module.css"
import './bootstrap-grid.min.css'

const Layout = ({ children }) => (
  <div>
    <Helmet title="🌈 Rainbow Vote" />
    <Header />
    <main className={styles.main}>
      {children}
    </main>
  </div>
)

export default Layout
