import {
  countriesOptions,
  departmentOptions,
  statesOptions,
  unitsOptions,

  organizationOptions,
  organizationTypeOptions,

} from '../../utils/data';



enum InputType {
  HIDDEN,
  TEXT,
  SELECT,
  CHECKBOX,
}

const BandSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: 'Enter name of band',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
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
    inputType: InputType.SELECT,
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

const OnboardingEmployeeSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: 'Enter name of band',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Organization Email',
    key: 'organizationEmail',
    description: 'Email of  Organisation',
    selector: (row) => row.organizationEmail,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Employee Email',
    key: 'email',
    description: 'Email of  Employee',
    selector: (row) => row.email,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Country',
    key: 'country',
    description: 'Country',
    selector: (row) => row.country,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: countriesOptions,
  },
  {
    name: 'State',
    key: 'state',
    description: 'State',
    selector: (row) => row.state,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: statesOptions,
  },
  {
    name: 'Department',
    key: 'department',
    description: 'Department',
    selector: (row) => row.department,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: departmentOptions,
  },
  {
    name: 'Unit',
    key: 'unit',
    description: 'Unit',
    selector: (row) => row.unit,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: unitsOptions,
  },
];


const createOrganizationDataSchema = [
  {
    name: 'Name Of Organization',
    key: 'nameOfOrganization',
    description: 'Name Of Organization',
    selector: (row) => row.nameOfOrganization,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'CAC Number',
    key: 'cacNumber',
    description: 'CAC Number',
    selector: (row) => row.cacNumber,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Organization Country',
    key: 'organizationCountry',
    description: 'Organization Country',
    selector: (row) => row.organizationCountry,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: countriesOptions,
  },

  {
    name: 'State',
    key: 'state',
    description: 'State',
    selector: (row) => row.state,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'LGA',
    key: 'lga',
    description: 'LGA',
    selector: (row) => row.lga,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'City/Town',
    key: 'citytown',
    description: 'City',
    selector: (row) => row.citytown,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Registered Address',
    key: 'registeredAddress',
    description: 'Registered Address',
    selector: (row) => row.registeredAddress,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Contact Phone Number',
    key: 'contactPhoneNumber',
    description: 'Contact Phone Number',
    selector: (row) => row.contactPhoneNumber,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Organization Email',
    key: 'organizationEmail',
    description: 'Organization Email',
    selector: (row) => row.organizationEmail,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Organization CEO',
    key: 'organizationCEO',
    description: 'Organization CEO',
    selector: (row) => row.organizationCEO,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Organization Type',
    key: 'organizationType',
    description: 'Organization Type',
    selector: (row) => row.organizationType,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: organizationTypeOptions,
  },

  {
    name: 'Organization Category',
    key: 'organizationCategory',
    description: 'Organization Category',
    selector: (row) => row.organizationCategory,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: organizationOptions,
  },

];



export { 
  BandSchema, 
  InputType, 
  OnboardingEmployeeSchema,
  createOrganizationDataSchema,
};
