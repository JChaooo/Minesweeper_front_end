import axios from "axios";

export let api = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 3000
})