import axios from "axios"

export const http = axios.create({
  baseURL: `${process.env.COMMODITY_API_BASE_URL}`
})