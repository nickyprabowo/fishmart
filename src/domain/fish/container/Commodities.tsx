import Table from "react-bootstrap/Table"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useCommodities from "../hooks/useCommodities"/*
import useOptionSize from "../hooks/useOptionSize"
import useOptionArea from "../hooks/useOptionArea" */

const Commodities = () => {
  const { data: fishes } = useCommodities()

  return (
    <>
      <Container>
        <Row>
          <Col>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title="Dropdown"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
            <Form.Control aria-label="Text input with dropdown button" />
          </InputGroup>
          </Col>
          <Col>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Komoditas</th>
            <th>Provinsi</th>
            <th>Kota</th>
            <th>Ukuran</th>
            <th>Harga</th>
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