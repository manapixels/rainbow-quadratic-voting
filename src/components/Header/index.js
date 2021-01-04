import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import { getCurrentUser, isLoggedIn, logout } from "../../utils/auth"
import "./header.scss"


const Header = () => {

	const { name, email } = getCurrentUser()
	const [showDropdown, setShowDropdown] = useState(false)

	return (

		<header className="header">
			<div className="container">
				<div className="header__wrap">
					<div className="d-flex align-items-center">
						<h1 className="header__heading">
							<Link
								to="/"
								className="header__link header__link--home"
							>
								🌈 Rainbow Vote
							</Link>
						</h1>
						<Link to="/app/voting/create" className="btn" style={{padding: '0.5rem 1.2rem', marginLeft: '1rem'}}>+ Join / Create Poll</Link>
					</div>

					<div
						className={`dropdown ${showDropdown ? 'show' : ''} nav-link`}
						style={{ padding: 0 }}
						onMouseLeave={() => setShowDropdown(false)}
					>
						<div
							className="dropdown-text logo-dropdown-text"
						>
							<button
								className="btn btn-user-highlight"
								style={{ display: 'flex', alignItems: 'center' }}
								onClick={() => setShowDropdown(!showDropdown)}>
								🙂 {name} <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-caret-down" width="16" height="16" viewBox="0 0 20 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '.3rem' }}>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M18 15l-6 -6l-6 6h12" transform="rotate(180 12 12)" />
								</svg>
							</button>
							{/* <span className="icon-down-open"></span> */}
						</div>
						<div
							className={`dropdown-menu ${showDropdown ? 'show' : ''} align-right`}>
							<div className="dropdown-item-container" style={{ paddingRight: '0' }}>
								<a
									href="/"
									onClick={event => {
										event.preventDefault()
										logout(() => navigate(`/app/login`))
									}}
									className="dropdown-item"
								>
									Start over
							</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>

	)
}

export default Header
