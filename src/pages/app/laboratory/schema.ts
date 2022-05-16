import { InputType } from '../schema/util';
export const LabTestSummary = [
  { name: 'S/N', selector: (row) => row.sn },
  { name: 'Date', selector: (row) => row.createdAt.substring(0, 10) },
  { name: 'Client', selector: (row) => row.orderInfo.orderObj.clientname },
  {
    name: 'Test',
    selector: (row) => row.serviceInfo.name,
    inputType: InputType.READ_ONLY,
  },
  {
    name: 'Amount',
    selector: (row) => row.serviceInfo.amount,
    inputType: InputType.READ_ONLY,
  },
  {
    name: 'Payment Status',
    selector: (row) => row.billing_status,
    inputType: InputType.READ_ONLY,
  },
  {
    name: 'Result Status',
    selector: (row) => row.report_status,
    inputType: InputType.READ_ONLY,
  },
];

export const LabResultSchema = [
  {
    name: 'Description of Band',
    key: 'description',
    description: 'Enter description of band',
    selector: (row) => row.orderInfo.orderObj.order,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Status',
    key: 'billing_status',
    description: 'Enter status',
    selector: (row) => row.billing_status,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter amount',
    selector: (row) => row.serviceInfo.amount,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Paid',
    key: 'paid',
    selector: (row) => row.paymentInfo?.amountpaid || 0,
    sortable: true,
    required: false,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Balance',
    key: 'balance',
    selector: (row) => row.paymentInfo?.balance || row.serviceInfo.amount,
    sortable: true,
    required: false,
    inputType: InputType.HIDDEN,
  },
];
export const PaymentsSummary = [
  { name: 'S/N', selector: (row) => row.sn, inputType: InputType.READ_ONLY },
  {
    name: 'Client Name',
    selector: (row) => row.clientname,
    inputType: InputType.READ_ONLY,
  },
  {
    name: 'Bills',
    selector: (row) => row.bills.length,
    inputType: InputType.READ_ONLY,
  },
  {
    name: 'Bill Items',
    selector: (row) => row.bills.map((obj) => obj.order).flat().length,
  },
];

export const PaymentLineSchema = [
  {
    name: 'Description of Band',
    key: 'description',
    description: 'Enter description of band',
    selector: (row) => row.orderInfo.orderObj.order,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Status',
    key: 'billing_status',
    description: 'Enter status',
    selector: (row) => row.billing_status,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter amount',
    selector: (row) => row.serviceInfo.amount,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Paid',
    key: 'paid',
    selector: (row) => row.paymentInfo?.amountpaid || 0,
    sortable: true,
    required: false,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Balance',
    key: 'balance',
    selector: (row) => row.paymentInfo?.balance || row.serviceInfo.amount,
    sortable: true,
    required: false,
    inputType: InputType.HIDDEN,
  },
];
export const PaymentWalletSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: '',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'payment Options',
    key: 'paymentmode',
    description: 'Enter payment Option',
    selector: (row) => row.paymentmode,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_LIST,
    options: ['Cash', 'Wallet', 'Bank Transfer', 'Card', 'Cheque'],
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter Amount',
    selector: (row) => row.amount,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Description',
    key: 'description',
    description: 'Enter description',
    selector: (row) => row.description,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];
export const LabResultDetailSchema = [
  {
    name: 'S/N',
    key: 'sn',
    selector: (row) => row.sn,
    description: 'SN',
    sortable: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Client',
    key: 'orderInfo.orderObj.clientname',
    selector: (row) => row.orderInfo.orderObj.clientname,
    description: 'Client',
    sortable: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Test',
    key: 'serviceInfo.name',
    selector: (row) => row.serviceInfo.name,
    description: 'Test',
    sortable: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Appointment Schedule',
    key: 'report_status',
    description: 'Select Appointment Schedule',
    selector: (row) => row.report_status,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_RADIO,
    options: [
      {
        value: 'Draft',
        label: 'Draft',
      },
      {
        value: 'Final',
        label: 'Final',
      },
    ],
  },
  {
    name: 'Findings',
    key: 'resultDetail.documentdetail.Findings',
    selector: (row) => row.resultDetail.documentdetail.Findings,
    description: 'Findings',
    sortable: true,
    inputType: InputType.TEXT_AREA,
  },
  {
    name: 'Test',
    key: 'resultDetail.documentdetail.Recommendation',
    selector: (row) => row.resultDetail.documentdetail.Recommendation,
    description: 'Test',
    sortable: true,
    inputType: InputType.TEXT_AREA,
  },
];
