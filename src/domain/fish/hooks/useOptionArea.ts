import { useQuery } from "common/utility/request"
import { getOptionArea } from "../api"

const useOptionArea = () => {
  return useQuery(["optionArea"], getOptionArea)
}

export default useOptionArea;