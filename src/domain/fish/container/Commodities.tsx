import useCommodities from "../hooks/useCommodities"

const Commodities = () => {
  const {data} = useCommodities()
  console.log("data", data)
  return (
    <>commodities</>
  )
}

export default Commodities