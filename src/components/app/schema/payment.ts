import { InputType } from './util';

const CollectionSchema = [
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
];

export { CollectionSchema };
