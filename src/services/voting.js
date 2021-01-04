import axios from "axios"
import { API_BASE_URL } from "../config"

export const joinVote = async (uniqueCode) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/join`, {
            headers: { Authorization: uniqueCode },
        })
        return res.data
    } catch (e) {
        if (e.response) {
            throw new Error(e.response.data.error)
        }
    }
}

export const submitVotes = async (vote, uniqueCode) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/vote`, vote, {
            headers: { Authorization: uniqueCode },
        })
        return res.data
    } catch (e) {
        if (e.response) {
            throw new Error(e.response.data.error)
        }
    }
}