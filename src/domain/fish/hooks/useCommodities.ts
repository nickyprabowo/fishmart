import { useQuery } from "common/utility/request"
import { getCommodities } from "../api"

import { Fishes } from "../entity";
import { FilterDto, PaginationDto } from "../dto";

interface IUseCommodities {
  pagination: PaginationDto,
  filter?: Partial<FilterDto>,
  successCb?: (data: Fishes) => void
}

const useCommodities = (config: IUseCommodities) => {
  return useQuery(["commodities", config.pagination, config?.filter], () => getCommodities(config.pagination, config?.filter), {
    onSuccess(data) {
      if(typeof config?.successCb !== "undefined") config.successCb(data)
    },
  })
}

export default useCommodities;