import { useMutation } from "common/utility/request"
import { createCommodity } from "../api"

const useCreateCommodity = () => {
  return useMutation(createCommodity)
}

export default useCreateCommodity;