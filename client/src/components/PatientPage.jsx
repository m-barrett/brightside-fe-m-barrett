import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import Table from './Table';
import { Title1, Title2 } from './System';
import { getPatient, getPatientInfo } from '../api';

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

const PatientTableBody = ({patient}) => {
  return <Table className='bg-white'>
    <Table.Body>
      <Table.Row key={`${patient.id}-fullName`}>
        <Table.BoldDataItem>Name</Table.BoldDataItem>
        <Table.DataItem>{patient.fullName}</Table.DataItem>
      </Table.Row>
      <Table.Row key={`${patient.id}-email`}>
        <Table.BoldDataItem>Email</Table.BoldDataItem>
        <Table.DataItem>{patient.email}</Table.DataItem>
      </Table.Row>
      <Table.Row key={`${patient.id}-phoneNumber`}>
        <Table.BoldDataItem>Phone</Table.BoldDataItem>
        <Table.DataItem>{patient.phoneNumber}</Table.DataItem>
      </Table.Row>
    </Table.Body>
  </Table>
}

const PatientInfoTableBody = ({info}) => {
  return <Table className='bg-white'>
    <Table.Body>
      {
        Object.keys(info).map(key => {
          return <Table.Row key={`${key}-info`}>
            <Table.BoldDataItem>{key}</Table.BoldDataItem>
            <Table.DataItem>{info[key] ? (info[key] === true ? 'Yes' : info[key]) : 'No'}</Table.DataItem>
          </Table.Row>
        })
      }
    </Table.Body>
  </Table>
}

const PatientPage = () => {
  const { id } = useParams();
  //const location = useLocation();
  //{ location ? (const patient = location.state) : ()}
  const { data:patient, status:patientStatus } = useQuery(['patient', id], getPatient(id));
  const { data:info, status:infoStatus } = useQuery(['patient-info', id], getPatientInfo(id));
  const isLoading = patientStatus === 'loading' || infoStatus === 'loading';
  return isLoading ? (
        <LoadingTableBody rowCount={5} colCount={4} />
      ) : (
        <main className='max-w-7xl mx-auto px-8 py-6 sm:px-6 lg:px-32'>
          <Title1>{patient.data.fullName}</Title1>
          <PatientTableBody patient={patient.data}/>
          <br/>

          <Title2 className='my-5'>Intake Questionnaire</Title2>
          <div className='my-5 bg-white'>
            { info ? <PatientInfoTableBody info={info.data}/>
            :
            (
              <Table className='bg-white'>
                <Table.Body>
                  <Table.Row key={`${id}-no-info`}>
                    <Table.DataItem>{patient.data.fullName} does not have an intake questionnaire on file.</Table.DataItem>
                  </Table.Row>
                </Table.Body>
              </Table>
            )}
          </div>
        </main>
      )
}

export default PatientPage;
