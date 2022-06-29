import Table from "./Table"
import { Title1 } from './System';
import { useQuery } from 'react-query';
import { getPatients } from '../api';

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
  return <Table.Body>
    {
      patients.map((patient) => {
        return <Table.Row key={`patient-row-${patient.id}`}>
          <Table.DataItem>{patient.id}</Table.DataItem>
          <Table.DataItem>{patient.firstName}</Table.DataItem>
          <Table.DataItem>{patient.email}</Table.DataItem>
          <Table.DataItem>{patient.status}</Table.DataItem>
        </Table.Row>
      })
    }
  </Table.Body >
}

const PatientsTable = () => {
  const { data: response, isLoading } = useQuery(['patients'], getPatients());

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
  return <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
    <Title1>All Patients</Title1>
    <PatientsTable />
  </main >
}

export default PatientsListPage;