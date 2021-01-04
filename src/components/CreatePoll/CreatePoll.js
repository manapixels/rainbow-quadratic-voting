import React, { useState } from "react"
import { navigate } from "gatsby"
import activePolls from './dummyActivePolls.json'
import "./CreatePoll.scss"

const CreatePoll = ({
    // activePolls,
    createNewPoll
}) => {

    const [newPoll, setNewPoll] = useState(null)
    const [question, setQuestion] = useState('')
    const [choices, setChoices] = useState([])

    const [isFetching, setIsFetching] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleCreateNewPoll = () => {

        // Simulation
        setIsFetching(true)
        setTimeout(() => {
            setIsFetching(false)
            setIsSuccess(true)
            setTimeout(() => {
                navigate('/app/voting/create/success')
            }, 2000)
        }, 2000)

        // // Create new poll
        // if (newPoll === '') {
        //     try {
        //         await createNewPoll({
        //             instance: null, 
        //             question: question,
        //             choices: choices
        //         })
        //     } catch (e) {
        //         const serverError = e
        //         const msg = serverError || e.message || e
        //         alert(msg)
        //         setError(msg)
        //     }
        // }
        // // Join existing active poll
        // else if (newPoll !== null) {
        //     const chosenActivePoll = activePolls.find(a => a.id === newPoll)
        //     const { question, choices } = chosenActivePoll
        //     createNewPoll(newPoll, question, choices)
        //     try {
        //         await createNewPoll({
        //             instance: newPoll, 
        //             question: question,
        //             choices: choices
        //         })
        //     } catch (e) {
        //         const serverError = e
        //         const msg = serverError || e.message || e
        //         alert(msg)
        //         setError(msg)
        //     }
        // }
        
    }

    return (
        <div className="create-poll">

            <div className="container">

                <div className="d-flex">

                    {/* Left column */}

                    <div className="poll-items-container">
                        <h3 className="mb-3">Join an active poll</h3>

                        {activePolls && activePolls.map(p => (
                            <button className="btn poll-item" onClick={() => setNewPoll(p.id)}>
                                {p.question}
                            </button>
                        ))}

                        <h3 className="mb-3">or</h3>

                        <button className="btn poll-item new-poll-item mt-4" onClick={() => setNewPoll('')}>
                            + Create New Poll
                        </button>

                    </div>


                    {/* Right column */}

                    <div className="questions-and-choices-container">
                        <div className="question">
                            
                        </div>
                    </div>

                </div>
            </div>

            <div className="floating-footer text-right">
                    <div className="container">
                        <button className={`btn ${isFetching && 'disabled'} ${isSuccess && 'success'}`} onClick={handleCreateNewPoll}>
                            {!isFetching && !isSuccess && `Create Poll`}
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

export default CreatePoll