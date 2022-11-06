import React from "react"
import JsonToForm from 'json-reactform'
import { v4 as uuid } from 'uuid'

import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from "common/component/LoadingSpinner";

import useOptionArea from "../../hooks/useOptionArea"
import useOptionSize from "../../hooks/useOptionSize"
import useCreateCommodity from "../../hooks/useCreateCommodity"
import formSchema from "./formSchema"

import { CreateCommodityRequest } from "../../dto"

interface IModal {
  show: boolean,
  handleClose: () => void
}

const AddCommodity: React.FC<IModal> = ({ show, handleClose }) => {
  const { data: areas, isLoading: loadingArea } = useOptionArea()
  const { data: sizes, isLoading: loadingSize } = useOptionSize()

  const mutation = useCreateCommodity()

  const handleSubmit = (data: any) => {
    const payload: CreateCommodityRequest = {
      uuid: uuid(),
      komoditas: data['Komoditas'],
      area_kota: data['Area'].value[0],
      area_provinsi: data['Area'].value[1],
      size: data['Ukuran'].value,
      price: data['Harga'],
      tgl_parsed: data['Tanggal'],
    }

    mutation.mutate(payload, {
      onSuccess: () => {
        handleClose()
      }
    })
  }

  const optionArea = areas?.map(area => {
    return {
      label: `${area.city} - ${area.province}`,
      value: [area.city, area.province]
    }
  }) || [{ label: "", value: [""]}]

  const optionSize = sizes?.map(size => ({
    label: size.size.toString(),
    value: size.size.toString()
  })) || [{ label: "", value: ""}]


  const form = formSchema(optionArea, optionSize)

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingArea && loadingSize ? (
            <LoadingSpinner />
          ): (
            <JsonToForm model={form} onSubmit={handleSubmit} />
          )}
        </Modal.Body>
      </Modal>
  )
}

export default AddCommodity;