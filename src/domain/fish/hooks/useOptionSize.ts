import { useQuery } from "common/utility/request"
import { getOptionSize } from "../api"

const useOptionSize = () => {
  return useQuery(["optionSize"], getOptionSize)
}

export default useOptionSize;