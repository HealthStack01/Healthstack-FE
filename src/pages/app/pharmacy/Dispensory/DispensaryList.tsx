import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

import AccordionBox from '../../../../components/accordion';
import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PaymentSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

const Dispensary = ({ onRowClicked, onSearch, items }) => {
  console.log(items);

  return (
    <PageWrapper>
      <h2>Dispensary</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <FilterMenu schema={PaymentSchema} onSearch={onSearch} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {items.map((data, index) => (
          <AccordionBox title={data.clientname} key={index}>
            {data.bills.map((child, index) => {
              return (
                <AccordionBox key={index} title={`${child.catName} with ${child.order.length} paid bills`}>
                  <DataTable
                    title={`${child.catName} with ${child.order.length} Unpaid bills`}
                    columns={PaymentSchema}
                    data={child.order}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={onRowClicked}
                  />
                </AccordionBox>
              );
            })}
          </AccordionBox>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Dispensary;
