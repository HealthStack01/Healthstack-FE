import * as yup from 'yup';

import { InputType } from '../schema/util';

export const BandSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: 'Enter name of band',
    sortable: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Name of Band',
    key: 'name',
    description: 'Enter name of band',
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Band Type',
    key: 'bandType',
    description: 'Enter name of band',
    selector: (row) => row.bandType,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_LIST,
    options: ['Provider', 'Company', 'Patient', 'Plan'],
  },
  {
    name: 'Description of Band',
    key: 'description',
    description: 'Enter description of band',
    selector: (row) => row.description,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];

export const getEmployeeSchema = (facilityId) => [
  {
    name: 'S/N',
    key: 'sn',
    description: 'Enter name of employee',
    selector: (row) => row.sn,
    sortable: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Firstname',
    key: 'firstname',
    description: 'Enter firstname',
    selector: (row) => row.firstname,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    validator: yup.string().required('Enter your Firstname'),
  },
  {
    name: 'Last Name',
    key: 'lastname',
    description: 'Enter lastname',
    selector: (row) => row.lastname,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    validator: yup.string().required('Enter your Lastname'),
  },
  {
    name: 'Profession',
    key: 'profession',
    description: 'Enter profession',
    selector: (row) => row.profession,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    validator: yup.string().required('Enter your Profession'),
  },
  {
    name: 'Phone number',
    key: 'phone',
    description: 'Enter phone number',
    selector: (row) => row.phone,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    validator: yup.string().required('Enter your Phone number'),
  },
  {
    name: 'Email',
    key: 'email',
    description: 'Enter Email',
    selector: (row) => row.email,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    validator: yup.string().required('Enter your valid Email'),
  },
  {
    name: 'Facility',
    key: 'facility',
    description: 'Select facility',
    selector: (row) => row.department,
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
    defaultValue: facilityId,
    validator: yup.string().required('Facility not available'),
  },
  {
    name: 'Department',
    key: 'department',
    description: 'Enter department',
    selector: (row) => row.department,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    validator: yup.string().required('Enter your Department'),
  },
  {
    name: 'Department Unit',
    key: 'deptunit',
    description: 'Enter department',
    selector: (row) => row.deptunit,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    validator: yup.string().required('Enter your Departmental Unit'),
  },
];

export const LocationSchema = [
  {
    name: 'S/N',
    key: 'sn',
    description: 'Enter name of location',
    sortable: true,
    selector: (row) => row.sn,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Name of Location',
    key: 'name',
    description: 'Enter name of Location',
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Location Type',
    key: 'locationType',
    description: 'Enter name of Location',
    selector: (row) => row.locationType,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_LIST,
    options: ['Front Desk', 'Clinic', 'Store', 'Laboratory', 'Finance'],
  },
];
