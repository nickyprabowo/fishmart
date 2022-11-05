import { useQuery } from "common/utility/request"
import { Fishes } from "../entity";
import { getCommodities } from "../api"

interface IUseCommodities {
  successCb: (data: Fishes) => void
}

const useCommodities = (config: IUseCommodities = { successCb: () => {} }) => {
  return useQuery(["commodities"], getCommodities, {
    onSuccess(data) {
      config.successCb(data)
    },
  })
}

export default useCommodities;