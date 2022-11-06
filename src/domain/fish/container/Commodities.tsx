import { useState, useEffect } from "react"
import {useInfiniteQuery} from "@tanstack/react-query"
import { useInView } from 'react-intersection-observer'

import Table from "react-bootstrap/Table"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import useOptionSize from "../hooks/useOptionSize"
import useOptionArea from "../hooks/useOptionArea"
import { Fish, Fishes } from "../entity";
import { FilterDto, PaginationDto } from "../dto";

import { getCommodities } from "../api"

import "./style.scss"

interface Columns {
  key: string,
  value: keyof Fish
}

enum SortDirection {
  asc = "asc",
  desc = "desc"
}

interface Sort {
  column: keyof Fish | null,
  direction: SortDirection
}

interface Page {
  page: number,
  limit: number,
  offset: number
}

const columns: Columns[] = [
  {key: "Komoditas", value: "komoditas"},
  {key: "Ukuran", value: "size"},
  {key: "Harga", value: "price"}
]

const Commodities = () => {
  const [fishes, setFishes] = useState<Fishes>([])
  const [filter, setFilter] = useState<FilterDto>({
    komoditas: "",
    area_kota: "",
    price: "",
    size: "",
  })
  const [page, setPage] = useState<Page>({
    page: 1,
    limit: 20,
    offset: 0
  })
  const [queryParams, setQueryParams] = useState<Partial<FilterDto>>({})
  const [sort, setSort] = useState<Sort>({
    column: null,
    direction: SortDirection.asc
  })
  const { ref, inView } = useInView()
  const [hasMore, setHasMore] = useState<boolean>(true)

  const pagination: PaginationDto = {
    limit: page.limit.toString(),
    offset: ((page.page - 1) * page.limit).toString(),
  }

  const {
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["commodities", pagination, queryParams],
    () => getCommodities(pagination, queryParams),
    {
      getNextPageParam: () => {
        return hasMore ? pagination : undefined
      },
      onSuccess(data) {
        data.pages.map(fishes => {
          if(fishes.length === 0) setHasMore(false)
          return setFishes((prevFishes) => (
            [
              ...prevFishes,
              ...fishes
            ]
          ))
        })
      },
    }
  )

  const { data: optionSize } = useOptionSize()
  const { data: optionArea } = useOptionArea()

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement >) => {
    setFilter({
      ...filter,
      komoditas: e.currentTarget.value.toUpperCase()
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
    const cleanFilter = Object.keys(filter).reduce((acc: any,curr: string) => {
      if(filter[curr as filterKeyType]) {
        return {
          ...acc,
          [curr]: filter[curr as filterKeyType] || []
        }
      }
      return acc
    }, {})
    setPage({
      page: 1,
      limit: 20,
      offset: 0
    })
    setFishes([])
    setHasMore(true)
    setQueryParams(cleanFilter)
  }

  const handleSortingChange = (field: keyof Fish) => {
    const sortDirection = field === sort.column && sort.direction === SortDirection.asc ? "desc" : "asc"
    setSort({
      column: field,
      direction: SortDirection[sortDirection]
    })
    handleSort(field,SortDirection[sortDirection])
  }

  const handleSort = (field: keyof Fish, sortDirection: SortDirection) => {
    if(field){
      const sortedData = [...fishes].sort((a,b) => {
        if (a[field] === null) return 1;
        if (b[field] === null) return -1;
        if (a[field] === null && b[field] === null) return 0;
        return a[field].toString().localeCompare(b[field].toString(), "en", {
            numeric: true
          }) * (sortDirection === SortDirection.asc ? 1 : -1)
      })
      setFishes(sortedData)
    }
  }

  useEffect(() => {
    if (inView) {
      if (hasMore){
        setPage((prevData) => ({
          ...prevData,
          page: prevData.page + 1,
          limit: 20
        }));
      }
    }
  }, [inView, hasMore])

  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand href="#">FISHMART</Navbar.Brand>
      <Container >
        <Row>
          <Col>
          <InputGroup className="mb-3">
            <Form.Control type="text" aria-label="Search input" placeholder="Ketik untuk mencari komoditas" onChange={handleChangeSearch} />
          </InputGroup>
          </Col>
          <Col>
            <Form.Select aria-label="Select City" onChange={handleChangeCity}>
              <option value={""}>Pilih Kota</option>
              {optionArea?.map((option, idx) => (
                <option key={idx} value={option.city}>{option.city}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select aria-label="Select Size" onChange={handleChangeSize}>
              <option value={""}>Pilih Ukuran</option>
              {optionSize?.map((option, idx) => (
                <option key={idx} value={option.size}>{option.size}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleSearch}>Cari</Button>
          </Col>
        </Row>
      </Container>
      </Navbar>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.key} onClick={() => handleSortingChange(column.value)}>{column.key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fishes?.map(fish => (
              <tr key={fish.uuid}>
                <td>
                  <h3>{fish.komoditas}</h3>
                  <p>{fish.area_provinsi}</p>
                  <p>{fish.area_kota}</p>
                </td>
                <td>{fish.size}</td>
                <td>{fish.price}</td>
              </tr>
            ))}
            {fishes.length > 0 && (
              <tr ref={ref} className="loadMore">
                <td colSpan={3}>
                  {isFetching
                  ? 'Loading more...'
                  : hasNextPage
                  ? 'Load Newer'
                  : 'Nothing more to load'}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Commodities