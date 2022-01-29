import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CollapsableGrid from '../../../datagrids/CollapsableGrid';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';
import { columnsClient, dataClient } from '../data';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
}

const Clients: React.FC<Props> = ({ handleCreate, onRowClicked }) => {
  return (
    <PageWrapper>
      <h2> Client </h2>

      <TableMenu>
        <div className='inner-table'>
          <Input placeholder='Search here' label='Search here' />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className='bi bi-chevron-down'></i>
          </div>
        </div>

        <Button label='Add new' onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title='Clients'
          columns={columnsClient}
          data={dataClient}
          selectableRows
          pointerOnHover
          highlightOnHover
          onRowClicked={onRowClicked}
          striped
          style={{ overflow: 'hidden' }}
        />
      </div>
    </PageWrapper>
  );
};

export default Clients;