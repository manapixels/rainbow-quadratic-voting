import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import Layout from "../components/Layout"
import View from "../components/View"
import symbolDefs from '../images/symbol-defs.svg'
import './index.scss'

const Index = () => {

	const [step, setStep] = useState(1)
	const [name, setName] = useState('')
	const [votes, setVotes] = useState(0)

	return (
		<Layout>
			<View>
				<div className="container index-page">

					<div className="instructions-container">

						<div className="d-flex justify-content-between mb-3">
							<div className="tutorial-steps">
								<button onClick={() => setStep(1)} className={`circle ${step === 1 && 'active'} ${step > 1 && 'filled'}`}></button>
								<button onClick={() => setStep(2)} className={`circle ${step === 2 && 'active'} ${step > 2 && 'filled'}`}></button>
								<button onClick={() => setStep(3)} className={`circle ${step === 3 && 'active'} ${step > 3 && 'filled'}`}></button>
							</div>
							<a onClick={() => setStep(3)}><small className="text-gray-medium">Skip introduction</small></a>
						</div>


						{step === 1 &&
							<div id="step-1">
								<h1>It is voting time!</h1>

								<p>

									<div style={{ display: 'flex', alignItems: 'center' }}>
										<span style={{ fontSize: '150%', fontWeight: '700', marginRight: '.5rem' }}>You have 100</span>
										<svg className="icon icon-coin" style={{ width: '1.6rem', height: '1.6rem', marginRight: '.7rem' }}>
											<use xlinkHref={`${symbolDefs}#icon-coin`}></use>
										</svg>
										<span style={{ fontSize: '150%', fontWeight: '700' }}>coins</span>
									</div>

									<p className="mt-4">Use them to upvote or downvote on topics! There's no right or wrong, just how <strong>you personally feel</strong> about each choice😉</p>

									<div className="text-right mt-5">
										<button className="btn" onClick={() => setStep(2)}>Continue</button>
									</div>
								</p>
							</div>
						}

						{step === 2 &&
							<div id="step-2">
								<h1 className="mb-3">But there's a catch</h1>
								<p>The more you vote for an item, the more it will cost. Let's vote for some apples to illustrate this:</p>

								<div>
									<div className="text-gray-medium">Votes:</div>

									<div className="d-inline-block"  style={{ marginRight: '1.5rem' }}>🍎 - {votes}</div>
									<button onClick={() => setVotes(votes + 1)} className="btn">Vote</button>
								</div>

								<div className="mt-3">
									<div className="text-gray-medium" style={{marginRight: '1rem'}}>Total cost:</div>

									<div className="mb-3"><svg className="icon icon-coin">
												<use xlinkHref={`${symbolDefs}#icon-coin`}></use>
											</svg> - {Math.pow(votes, 2)} ({votes} * 2)</div>

									{[...new Array(Math.pow(votes, 2))].map((a, i) =>
										<span className="coin-container">
											<svg className="icon icon-coin" key={`coin-${a}-${i}`}>
												<use xlinkHref={`${symbolDefs}#icon-coin`}></use>
											</svg>
										</span>
									)}


								</div>

								<div className="text-right mt-5">
										<button className="btn" onClick={() => setStep(3)} disabled={votes === 0}>Understood! Let's start.</button>
								</div>
							</div>
						}

						{step === 3 &&
							<div id="step-3">
								<p>Who are you?</p>

								<input className="text-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="A name you can identify yourself with" />

								{name.length !== 0 &&
									<div className="text-right mt-5">
											<button className="btn" onClick={() => navigate('/app/voting')} disabled={votes === 0}>Start</button>
									</div>
								}
							</div>
						}

					</div>
				</div>
			</View>
		</Layout>
	)
}

export default Index
