import { useState } from "react"

import Table from "react-bootstrap/Table"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import useCommodities from "../hooks/useCommodities"
import useOptionSize from "../hooks/useOptionSize"
import useOptionArea from "../hooks/useOptionArea"
import { Fishes } from "../entity";
import { FilterDto } from "../dto";

interface Columns {
  key: string,
  value: string
}

const columns: Columns[] = [
  {key: "Komoditas", value: "komoditas"},
  {key: "Provinsi", value: "area_provinsi"},
  {key: "Kota", value: "area_kota"},
  {key: "Ukuran", value: "size"},
  {key: "Harga", value: "price"}
]

const Commodities = () => {
  const [fishes, setFishes] = useState<Fishes>([])
  const [filter, setFilter] = useState<FilterDto>({
    komoditas: "",
    area_kota: "",
    area_provinsi: "",
    price: "",
    size: "",
  })
  const [queryParams, setQueryParams] = useState()

  useCommodities({
    filter: queryParams,
    successCb: (data) => setFishes(data)
  })

  const { data: optionSize } = useOptionSize()
  const { data: optionArea } = useOptionArea()

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement >) => {
    setFilter({
      ...filter,
      komoditas: e.currentTarget.value
    })
  }

  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement >) => {
    setFilter({
      ...filter,
      size: e.currentTarget.value
    })
  }

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement >) => {
    setFilter({
      ...filter,
      area_kota: e.currentTarget.value
    })
  }

  const handleSearch = () => {
    type filterKeyType = keyof FilterDto;
    // cleanup unused filter
    const filterKeyArr = Object.keys(filter)
    const cleanFilterObj = filterKeyArr.reduce((acc: any,curr: string) => {
      if(filter[curr as filterKeyType]) {
        return {
          ...acc,
          [curr]: filter[curr as filterKeyType] || []
        }
      }
      return acc
    }, {})
    setQueryParams(cleanFilterObj)
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
          <InputGroup className="mb-3">
            <Form.Control type="text" aria-label="Search input" placeholder="Ketik untuk mencari komoditas" onChange={handleChangeSearch} />
          </InputGroup>
          </Col>
          <Col>
            <Form.Select aria-label="Select City" onChange={handleChangeCity}>
              <option value={""}>Pilih Kota</option>
              {optionArea?.map(option => (
                <option value={option.city}>{option.city}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select aria-label="Select Size" onChange={handleChangeSize}>
              <option value={""}>Pilih Ukuran</option>
              {optionSize?.map(option => (
                <option value={option.size}>{option.size}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleSearch}>Cari</Button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map(column => (
              <th>{column.key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fishes?.map(fish => (
            <tr key={fish.uuid}>
              <td>{fish.komoditas}</td>
              <td>{fish.area_provinsi}</td>
              <td>{fish.area_kota}</td>
              <td>{fish.size}</td>
              <td>{fish.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Commodities