import React from 'react';
import DataTable from 'react-data-table-component';

import AccordionBox from '../../../../components/accordion';
// import CustomTable from '../../../../components/customtable';
// import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { BillPrescriptionSchema } from '../../schema';
import { PageWrapper } from '../../styles';

const BillPrescriptionSent = ({ onRowClicked, onSearch, items }) => {
  return (
    <PageWrapper>
      <h2>Bill Prescription Sent</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          {/* <Input placeholder="Search here" label="Search here" size="small" onChange={onSearch} /> */}
          <FilterMenu schema={BillPrescriptionSchema} onSearch={onSearch} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {items.map((data, index) => (
          <AccordionBox title={`${data.clientname} with ${data.orders.length} Pending Prescriptions`} key={index}>
            <DataTable
              key={index}
              columns={BillPrescriptionSchema}
              data={data.orders}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={onRowClicked}
            />
          </AccordionBox>
        ))}
      </div>
    </PageWrapper>
  );
};

export default BillPrescriptionSent;
