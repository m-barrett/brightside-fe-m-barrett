import { useState } from "react";
import Table from "./Table"
import { Title1 } from './System';
import { useQuery } from 'react-query';
import { getPatients } from '../api';
import Switch from "react-switch";
import { useNavigate } from "react-router";

const LoadingTableBody = ({ rowCount = 5, colCount = 4 }) => <Table.Body className="animate-pulse">
  {Array.from({ length: rowCount }).map((_row, rowIdx) => {
    return <Table.Row key={`loading-row-${rowIdx}`}>
      {
        Array.from({ length: colCount }).map((_col, colIdx) => {
          return <Table.DataItem key={`loading-row-${rowIdx}-col-${colIdx}`}><div className="h-2 bg-gray-400 rounded col-span-2" /></Table.DataItem>
        })
      }
    </Table.Row>
  })}
</Table.Body>

const PatientTableBody = ({ patients }) => {
  const navigate = useNavigate();
  const goToPatient = (id) => () => navigate(`/patients/${id}`);

  return <Table.Body>
    {
      patients.map((patient) => {
        return <Table.Row className='cursor-pointer' key={`patient-row-${patient.id}`} onClick={goToPatient(patient.id)}>
          <Table.DataItem>{patient.id}</Table.DataItem>
          <Table.DataItem>{patient.firstName}</Table.DataItem>
          <Table.DataItem>{patient.email}</Table.DataItem>
          <Table.DataItem>{patient.status}</Table.DataItem>
        </Table.Row>
      })
    }
  </Table.Body >
}

const PatientsTable = ({ filterStatus }) => {
  const { data: response, isLoading } = useQuery(['patients', filterStatus], getPatients(filterStatus));

  return <Table className='bg-white'>
    <Table.Head>
      <Table.HeadItem>Id</Table.HeadItem>
      <Table.HeadItem>Name</Table.HeadItem>
      <Table.HeadItem>Email</Table.HeadItem>
      <Table.HeadItem>Status</Table.HeadItem>
    </Table.Head>
    {
      isLoading ? <LoadingTableBody rowCount={5} colCount={4} /> : <PatientTableBody patients={response.data} />
    }
  </Table>
}

const PatientsListPage = () => {
  const [active, setActive] = useState(true)

  const handleToggle = (checked) => {
    setActive(checked)
  }

  return <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
    <div className='min-w-full flex justify-between items-center'>
      <Title1>All Patients</Title1>
      <label className="flex justify-around items-center">
        <span className='uppercase mr-1'>Inactive</span>
        <Switch
          checked={active}
          onChange={handleToggle}
          checkedIcon={false}
          uncheckedIcon={false}
          handleDiameter={17}
          height={20}
          width={40}
          onColor="#343D55"
          offColor="#C2C5CC"
        />
        <span className='uppercase ml-1'>Active</span>
      </label>
    </div>
    <PatientsTable filterStatus={active ? 'active' : 'inactive'} />
  </main >
}

export default PatientsListPage;