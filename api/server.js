import Hapi from '@hapi/hapi';
import inertPlugin from '@hapi/inert';
import visionPlugin from '@hapi/vision';
import swaggerPlugin from 'hapi-swagger';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import boom from '@hapi/boom';
import Pack from './package.json' assert { type: 'json' };
import { patients, intakes, phqs, notes } from './data/index.js';
import Joi from 'joi';

async function handleGetPatients(request) {
  if (request.query.status) {
    return Array.from(patients.values()).filter((patient) => patient.status === request.query.status);
  }
  return Array.from(patients.values());
};

async function handleGetPatient(request) {
  if (!patients.has(request.params.id)) {
    throw boom.notFound(`The patient with id "${request.params.id}" was not found.`);
  }
  return patients.get(request.params.id);
};

async function handleGetPatientIntake(request) {
  if (!intakes.has(request.params.patientId)) {
    throw boom.notFound(`The intake with patientId "${request.params.patientId}" was not found.`);
  }
  return intakes.get(request.params.patientId);
}

async function handleGetPatientPhqs(request) {
  return phqs.get(request.params.patientId) || [];
}

async function handleGetPatientNotes(request) {
  return Array.from(notes.values()).filter((note) => note.patientId === request.params.patientId);
}

async function handleCreatePatientNote(request) {
  if (!patients.has(request.params.patientId)) {
    throw boom.notFound(`The patient with id "${request.params.patientId}" was not found.`);
  }

  const note = request.payload;
  note.id = uuidv4();
  note.patientId = request.params.patientId
  notes.set(note.id, note);
  return note;
}

async function handleDeleteNote(request) {
  if (!notes.has(request.params.id)) {
    throw boom.notFound(`The note with id "${request.params.id}" was not found.`);
  }
  const note = notes.get(request.params.id);
  notes.delete(request.params.id);
  return note;
}

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: true
    }
  });

  await server.register([
    inertPlugin,
    visionPlugin,
    {
      plugin: swaggerPlugin,
      options: {
        info: {
          title: 'Provider API Documentation',
          version: Pack.version,
        }
      }
    }
  ]);

  server.route({
    method: 'GET',
    path: '/patients',
    options: {
      tags: ['api'],
      handler: handleGetPatients,
      validate: {
        query: Joi.object({
          status: Joi.string().allow('active', 'inactive')
        })
      },
    }
  });

  server.route({
    method: 'GET',
    path: '/patients/{id}',
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.string().guid().required()
        })
      },
      handler: handleGetPatient,
    }
  });

  server.route({
    method: 'GET',
    path: '/patients/{patientId}/intake',
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          patientId: Joi.string().guid().required().example('1fa0a83f-4d7b-4f35-8b46-40b67003800e')
        })
      },
      handler: handleGetPatientIntake,
    }
  });

  server.route({
    method: 'GET',
    path: '/patients/{patientId}/phqs',
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          patientId: Joi.string().guid().required().example('1fa0a83f-4d7b-4f35-8b46-40b67003800e')
        })
      },
      handler: handleGetPatientPhqs,
    }
  });

  server.route({
    method: 'GET',
    path: '/patients/{patientId}/notes',
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          patientId: Joi.string().guid().required().example('1fa0a83f-4d7b-4f35-8b46-40b67003800e')
        })
      },
      handler: handleGetPatientNotes,
    }
  });

  server.route({
    method: 'POST',
    path: '/patients/{patientId}/notes',
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          patientId: Joi.string().guid().required().example('1fa0a83f-4d7b-4f35-8b46-40b67003800e')
        }),
        payload: Joi.object({
          content: Joi.string(),
        }),
      },
      handler: handleCreatePatientNote,
    }
  });

  server.route({
    method: 'DELETE',
    path: '/notes/{id}',
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.string().guid().required()
        }),
      },
      handler: handleDeleteNote,
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();