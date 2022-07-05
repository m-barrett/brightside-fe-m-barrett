import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ReactSwitch from 'react-switch';

import Table from "./Table"
import { Title1 } from './System';
import { getPatients } from '../api';

const LoadingTableBody = ({ rowCount = 5, colCount = 4 }) =>
  <Table.Body className="animate-pulse">
    {Array.from({ length: rowCount }).map((_row, rowIdx) => {
      return <Table.Row key={`loading-row-${rowIdx}`}>
        {
          Array.from({ length: colCount }).map((_col, colIdx) => {
            return <Table.DataItem key={`loading-row-${rowIdx}-col-${colIdx}`}>
              <div className="h-2 bg-gray-400 rounded col-span-2" />
            </Table.DataItem>
          })
        }
      </Table.Row>
    })}
  </Table.Body>

const PatientTableBody = ({ patients }) => {
  const navigate = useNavigate();
  return <Table.Body>
    {
      patients.map((patient) => {
        return <Table.Row
          key={`patient-row-${patient.id}`}
          onClick={() => navigate(`/patients/${patient.id}`, {
            state: {
              fullName: patient.fullName,
              email: patient.email,
              phoneNumber: patient.phoneNumber
            } })}>
          <Table.DataItem>{patient.id}</Table.DataItem>
          <Table.DataItem>{patient.firstName}</Table.DataItem>
          <Table.DataItem>{patient.email}</Table.DataItem>
          <Table.DataItem>{patient.status}</Table.DataItem>
        </Table.Row>
      })
    }
  </Table.Body >
}

const PatientsTable = ({patientStatus}) => {
  const { status, data:response, error } = useQuery(
    ['patients', patientStatus], getPatients(patientStatus));

  return <Table className='bg-white'>
    <Table.Head>
      <Table.HeadItem>Id</Table.HeadItem>
      <Table.HeadItem>Name</Table.HeadItem>
      <Table.HeadItem>Email</Table.HeadItem>
      <Table.HeadItem>Status</Table.HeadItem>
    </Table.Head>
    { status === 'loading' ? (
        <LoadingTableBody rowCount={5} colCount={4} />
        ) : status === "error" ? (
          <div className='my-5'>Error: {error.message}</div>
        ) : (
        <PatientTableBody patients={response.data} />
        )
     }
  </Table>
}

const PatientsListPage = () => {
  const [isActive, setIsActive] = useState(true);
  const patientStatus = isActive ? 'active' : 'inactive'

  const handleSwitch = () => {
    setIsActive(!isActive);
  }

  return <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-24'>
    <Title1>All Patients</Title1>
    <div className='flex justify-end'>
      <span>INACTIVE</span>
      <ReactSwitch
        onChange={handleSwitch}
        checked={isActive}
        checkedIcon={false}
        uncheckedIcon={false}
        height={20}
        width={40}
        handleDiameter={17}
        onColor='#343D55'
        offColor='#C2C5CC'
      />
    <span>ACTIVE</span>
    </div>
    <PatientsTable patientStatus={patientStatus}/>
  </main >
}

export default PatientsListPage;
