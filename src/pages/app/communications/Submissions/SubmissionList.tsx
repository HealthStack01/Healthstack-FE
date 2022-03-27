import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import LocationModal from '../../../../components/locationModal';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../styles';
import { columnHead, rowData } from './data';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
}

const Submissions: React.FC<Props> = ({ handleCreate, onRowClicked }) => {
  const locations = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', 'Location 6', 'Location 7'];

  return (
    <>
      <LocationModal data={locations} />

      <PageWrapper>
        <h2>Submissions</h2>

        <TableMenu>
          <div className="inner-table">
            <Input placeholder="Search here" label="Search here" />
            <FilterMenu />
          </div>

          <Button label="Add new" onClick={handleCreate} />
        </TableMenu>

        <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
          <CustomTable
            title="HMO Authorization"
            columns={columnHead}
            data={rowData}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={onRowClicked}
          />
        </div>
      </PageWrapper>
    </>
  );
};

export default Submissions;