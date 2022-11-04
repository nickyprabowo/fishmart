import { useQuery } from "common/utility/request"
import { getCommodities } from "../api"

const useCommodities = () => {
  return useQuery(["commodities"], getCommodities)
}

export default useCommodities;