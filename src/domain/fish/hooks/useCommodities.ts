import { useQuery } from "common/utility/request"
import { getCommodities } from "../api"

import { Fishes } from "../entity";
import { FilterDto } from "../dto";

interface IUseCommodities {
  filter?: Partial<FilterDto>,
  successCb?: (data: Fishes) => void
}

const useCommodities = (config?: IUseCommodities) => {
  return useQuery(["commodities", config?.filter], () => getCommodities(config?.filter), {
    onSuccess(data) {
      if(typeof config?.successCb !== "undefined") config.successCb(data)
    },
  })
}

export default useCommodities;