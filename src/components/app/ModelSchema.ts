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


const moduleSchema = {
  first: [
    {
      name: 'Accounting',
      key: 'accounting',
      description: 'Accounting',
      selector: (row) => row.accounting,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  
    {
      name: 'Admin',
      key: 'Admin',
      description: 'Admin',
      selector: (row) => row.Admin,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  
    {
      name: 'Blood Bank',
      key: 'bloodBank',
      description: 'Blood Bank',
      selector: (row) => row.bloodBank,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  
    {
      name: 'Client',
      key: 'client',
      description: 'Client',
      selector: (row) => row.client,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  
    {
      name: 'Clinic',
      key: 'clinic',
      description: 'Clinic',
      selector: (row) => row.clinic,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  
    {
      name: 'Communication',
      key: 'communication',
      description: 'Communication',
      selector: (row) => row.communication,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  
    {
      name: 'Continous Mediscal Education',
      key: 'continousMediscalEducation',
      description: 'Continous Mediscal Education',
      selector: (row) => row.continousMediscalEducation,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  
    {
      name: 'Documentation',
      key: 'documentation',
      description: 'Documentation',
      selector: (row) => row.documentation,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  
    {
      name: 'Epidemiology',
      key: 'epidemiology',
      description: 'Epidemiology',
      selector: (row) => row.epidemiology,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  
    {
      name: 'Finance',
      key: 'finance',
      description: 'Finance',
      selector: (row) => row.finance,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  
    {
      name: 'Immunization',
      key: 'immunization',
      description: 'Immunization',
      selector: (row) => row.immunization,
      sortable: true,
      required: true,
      inputType: InputType.CHECKBOX,
    },
  ],
  
  
  second: [
  {
    name: 'Inventory',
    key: 'inventory',
    description: 'Inventory',
    selector: (row) => row.inventory,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },

  {
    name: 'Laboratory',
    key: 'laboratory',
    description: 'Laboratory',
    selector: (row) => row.laboratory,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },

  {
    name: 'Managed Care',
    key: 'managedCare',
    description: 'Managed Care',
    selector: (row) => row.managedCare,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },

  {
    name: 'Patient Portal',
    key: 'patientPortal',
    description: 'Patient Portal',
    selector: (row) => row.patientPortal,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },

  {
    name: 'Pharmacy',
    key: 'pharmacy',
    description: 'Pharmacy',
    selector: (row) => row.pharmacy,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },

  {
    name: 'Radiology',
    key: 'radiology',
    description: 'Radiology',
    selector: (row) => row.radiology,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },

  {
    name: 'Report',
    key: 'report',
    description: 'Report',
    selector: (row) => row.report,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },

  {
    name: 'Research and Data Exhange',
    key: 'researchAndDataExhange',
    description: 'Research and Data Exhange',
    selector: (row) => row.researchAndDataExhange,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },

  {
    name: 'Telemedicine',
    key: 'telemedicine',
    description: 'Telemedicine',
    selector: (row) => row.telemedicine,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },

  {
    name: 'Theatre',
    key: 'theatre',
    description: 'Theatre',
    selector: (row) => row.theatre,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },

  {
    name: 'User Profile',
    key: 'userProfile',
    description: 'User Profile',
    selector: (row) => row.userProfile,
    sortable: true,
    required: true,
    inputType: InputType.CHECKBOX,
  },
]
  
}




export { 
  BandSchema, 
  InputType, 
  OnboardingEmployeeSchema,
  createOrganizationDataSchema,
  moduleSchema
};
