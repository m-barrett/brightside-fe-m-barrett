import { Title1, Title2 } from './System';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { getPatient, getPatientIntake } from '../api';
import { startCase, upperFirst, lowerCase } from 'lodash'

const PatientShowPage = () => {
  return <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
    <PatientDetails />
    <Intake />
  </main >;
}

const LoadingState = () => <div className="shadow-sm rounded-md p-4 w-1/2">
  <div className="animate-pulse flex space-x-4">
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-gray-400 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-gray-400 rounded col-span-2"></div>
          <div className="h-2 bg-gray-400 rounded col-span-1"></div>
          <div className="h-2 bg-gray-400 rounded col-span-2"></div>
          <div className="h-2 bg-gray-400 rounded col-span-1"></div>
          <div className="h-2 bg-gray-400 rounded col-span-2"></div>
          <div className="h-2 bg-gray-400 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-gray-400 rounded"></div>
      </div>
    </div>
  </div>
</div>

const PatientDetails = () => {
  const { id } = useParams();
  const { data: { data: patient } = {}, isLoading } = useQuery(['patients', id], getPatient(id));

  if (isLoading) return <LoadingState />;

  return <div>
    <Title1>{patient.fullName}</Title1>
    <div className="bg-white shadow-sm rounded-md p-4 w-1/2">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <span className='font-bold'>Name</span>
        </div>
        <div className="col-span-2">
          {patient.fullName}
        </div>
        <div className="col-span-1">
          <span className='font-bold'>Email</span>
        </div>
        <div className="col-span-2">
          {patient.email}
        </div>
        <div className="col-span-1">
          <span className='font-bold'>Phone</span>
        </div>
        <div className="col-span-2">
          {patient.phoneNumber}
        </div>
      </div>
    </div>
  </div>
}

const intakeValue = (value) => {
  switch (typeof value) {
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'string':
      return upperFirst(lowerCase(value));
    case 'number':
      return `${value} hours / day`;
    case 'object':
      return JSON.stringify(value, null, 2);
    default:
      return typeof value;
  }
}

const Intake = () => {
  const { id } = useParams();
  const { data: { data: intake } = {}, isLoading } = useQuery(['intakes', id], getPatientIntake(id));

  if (isLoading) return <LoadingState />;

  return <div className='mt-4'>
    <Title2>Intake Questionnaire</Title2>
    <div className="bg-white shadow-sm rounded-md p-4 w-3/4">
      <div className="grid grid-cols-3 gap-4">
        {
          Object.entries(intake).map(([key, value]) => {
            return <>
              <div className="col-span-1">
                <span className='font-bold'>{startCase(key)}</span>
              </div>
              <div className="col-span-2">
                {intakeValue(value)}
              </div>
            </>
          })
        }

        <div className="col-span-1">
          <span className='font-bold'>Email</span>
        </div>
        <div className="col-span-2">
          {intake.email}
        </div>
        <div className="col-span-1">
          <span className='font-bold'>Phone</span>
        </div>
        <div className="col-span-2">
          {intake.phoneNumber}
        </div>
      </div>
    </div>
  </div>
}

export default PatientShowPage;