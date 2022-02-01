enum InputType {
  HIDDEN,
  TEXT,
  SELECT,
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

const RevenueSchema=[
  {
    name: 'S/N',
    key: '_id',
    description: 'Enter name of Revenue',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Date',
    key: 'createdAt',
    description: 'Enter date',
    selector: (row) => row.createdAt  && row.createdAt.substring(0, 10),
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Description',
    key: 'description',
    description: 'Enter name of description',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Client',
    key: 'fromName',
    description: 'Enter Client',
    selector: (row) => row.fromName,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter Amount',
    selector: (row) => row.amount,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Mode',
    key: 'paymentmode',
    description: 'Enter Mode',
    selector: (row) => row.paymentmode,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
]

const CollectionSchema =[
  {
    name: 'S/N',
    key: '_id',
    description: 'Enter name of Revenue',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Name',
    key: 'fromName',
    description: 'Enter Client',
    selector: (row) => row.fromName,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Client',
    key: 'toName',
    description: 'Enter name of description',
    selector: (row) => row.toName,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
 
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter Amount',
    selector: (row) => row.amount,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Mode',
    key: 'paymentmode',
    description: 'Enter Mode',
    selector: (row) => row.paymentmode,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
]
const EmployeeSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: 'Enter name of employee',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
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
  },
  {
      name: 'Last Name',
    key: 'lastname',
    description: 'Enter lastname',
    selector: (row) => row.lastname,

    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
     name: 'Profession',
    key: 'profession',
    description: 'Enter profession',
    selector: (row) => row.profession,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Phone number',
    key: 'phone',
    description: 'Enter phone number',
    selector: (row) => row.phone,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Email',
    key: 'email',
    description: 'Enter Email',
    selector: (row) => row.email,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Department',
    key: 'department',
    description: 'Enter department',
    selector: (row) => row.department,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Department Unit',
    key: 'deptunit',
    description: 'Enter department',
    selector: (row) => row.deptunit,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
];

const LocationSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: 'Enter name of location',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
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
    inputType: InputType.SELECT,
  },
]
export { BandSchema, RevenueSchema, CollectionSchema,EmployeeSchema,LocationSchema, InputType };
