import React, { useEffect, useState } from "react"
import Tippy from '@tippyjs/react'
import { followCursor } from 'tippy.js'
import { cloneDeep, sumBy } from "lodash"
import { motion } from "framer-motion"
import FlipMove from 'react-flip-move'

import { getCurrentUser } from "../../utils/auth"
import dummyPoll from './dummyPoll.json'
import { submitVotes } from '../../services/voting'
import symbolDefs from '../../images/symbol-defs.svg'
import "./Voting.scss"
import { navigate } from "gatsby"


const Voting = () => {

    const { name } = getCurrentUser()
    const [votes, setVotes] = useState([])
    const [error, setError] = useState()
    const [coinsToConsume, setCoinsToConsume] = useState()
    const [isFetching, setIsFetching] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { id, question, budget, choices } = dummyPoll || {}

    useEffect(() => {
        try {
            setTimeout(() => {
                choices && setVotes(choices.map(c => ({
                    id: c.id,
                    name: c.name,
                    votes: 0
                }))
                )
            }, 500)
        } catch (e) {
            alert(e.message)
        }
    }, [choices])

    const totalVoteBudget = (votes) =>
        sumBy(votes, (v) => Math.pow(v.votes, 2))

    const addVote = (choiceId, num) => {
        const currVotes = votes && cloneDeep(votes)
        const newVotes = currVotes.map(v => {
            if (v.id === choiceId && v.votes + num > 0) {
                setCoinsToConsume(Math.pow(v.votes + num + 1, 2) - Math.pow(v.votes + num, 2))
                return ({
                    ...v,
                    votes: v.votes + num
                })
            } else {
                return v
            }
        })

        const newBudget = totalVoteBudget(newVotes)

        if (newBudget > budget) return alert("Insufficient budget")
        
        // Sort votes

        setVotes(newVotes && newVotes.sort((a, b) => b.votes - a.votes))
        
    }

    const handleSubmitVotes = async () => {
        setIsFetching(true)
        setTimeout(() => {
            setIsFetching(false)
            setIsSuccess(true)
            setTimeout(() => {
                navigate('/app/voting/complete')
            }, 2000)
        }, 2000)
        // try {
        //     await submitVotes({
        //         id: id,
        //         votes: votes
        //     })
        // } catch (e) {
        //     const serverError = e
        //     const msg = serverError || e.message || e
        //     alert(msg)
        //     setError(msg)
        // }
    }

    const creditsLeft = budget - totalVoteBudget(votes)


    return (
        <div className="voting">

            <div className="container">


                <div className="coin-bank">
                    <div className="section-title">Your Credits</div>
                    {[...new Array(budget)].map((a, i) =>
                        <motion.span
                            key={`credits-${i}`}
                            className="coin-container"
                            animate={i + 1 < creditsLeft ? "visible" : "invisible"}
                            variants={{
                                visible: { opacity: 1, scale: 1 },
                                invisible: { opacity: 0, scale: 0 }
                            }}>
                            <svg className={`icon icon-coin ${(i + 1 + coinsToConsume >= creditsLeft) && 'active'}`} key={`coin-${i}`}>
                                <use xlinkHref={`${symbolDefs}#icon-coin`}></use>
                            </svg>
                        </motion.span>
                    )}
                </div>

                <div className="question-list">

                    {/* <div className="it-is-voting-time">
                        It is voting time!
                    </div> */}

                    <div className="question-container">
                        <div className="question">{question}</div>

                        <FlipMove>
                            {votes && votes.map(c => (
                                <div className="choice" key={`choice-${c.id}`}>

                                    <div className="left-col">
                                        <div className="vote-count">
                                            {c.votes}
                                        </div>
                                    </div>

                                    <div className="right-col">

                                        <div>
                                            <div className="choice-name">{c.name}</div>
                                            {/* <Tippy content={`Release ${Math.pow(c.votes, 2) + 1}`} followCursor={true} plugins={[followCursor]}>
                                                <button onClick={() => addVote(c.id, -1)}>
                                                    <svg className="icon icon-coin">
                                                        <use xlinkHref={`${symbolDefs}#icon-coin`}></use>
                                                    </svg> {c.votes}</button>
                                            </Tippy> */}

                                            {[...new Array(Math.sqrt(budget))].map((a, i) =>
                                                <motion.span
                                                    key={`heart-${c.id}-${i}`}
                                                    className="d-inline-block"
                                                    animate={i + 1 <= c.votes ? "visible" : "invisible"}
                                                    variants={{
                                                        visible: { opacity: 1, scale: 1 },
                                                        invisible: { opacity: 0, scale: 0 }
                                                    }}>
                                                        💖
                                                </motion.span>
                                            )}
                                        </div>

                                        <div style={{ width: '11rem', flex: '0 0 11rem'}}>
                                            <button 
                                                onClick={() => addVote(c.id, -1)} 
                                                className={`btn btn-vote ${(c.votes === 0 || isFetching || isSuccess) && 'disabled'}`}
                                                style={{ marginRight: '.6rem'}}
                                                onMouseLeave={() => coinsToConsume !== 0 && setCoinsToConsume(0)}
                                                >
                                                <svg className="icon icon-coin stack">
                                                    <use xlinkHref={`${symbolDefs}#icon-coin`}></use>
                                                </svg> <sup className="plus-minus">-</sup>
                                            </button>
                                            <button 
                                                onClick={() => addVote(c.id, 1)} 
                                                className={`btn btn-vote ${(isFetching || isSuccess) && 'disabled'}`}
                                                onMouseOver={() => setCoinsToConsume(Math.pow(c.votes + 1, 2) - Math.pow(c.votes, 2))}
                                                onMouseLeave={() => coinsToConsume !== 0 && setCoinsToConsume(0)}>
                                                    <div className="d-flex align-items-center">
                                                        Spend {Math.pow(c.votes + 1, 2) - Math.pow(c.votes, 2)}&nbsp;<svg className="icon icon-coin stack">
                                                            <use xlinkHref={`${symbolDefs}#icon-coin`}></use>
                                                        </svg>
                                                    </div>
                                                {/* {[...new Array(Math.pow(c.votes, 2) + 1)].map((a, i) =>
                                                    <svg className="icon icon-coin stack" key={`coin-${c.id}-${i}`}>
                                                        <use xlinkHref={`${symbolDefs}#icon-coin`}></use>
                                                    </svg>
                                                )} <sup className="plus-minus">+</sup> */}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </FlipMove>
                    </div>
                </div>
            </div>

            <div className="floating-footer text-right">
                <div className="container">
                    <button className={`btn ${isFetching && 'disabled'} ${isSuccess && 'success'}`} onClick={handleSubmitVotes}>
                        {!isFetching && !isSuccess && `Submit`}
                        {isFetching &&
                        <>
                            Submitting
                            <div className="animation-spin" style={{
                                display: 'inline-block',
                                marginLeft: '.4rem'
                            }}>
                                
                                <span className="icon-spin4"></span>
                            </div>
                            </>
                        }
                        {isSuccess && !isFetching && <span className="icon-ok">&nbsp;Done</span>}
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Voting
