import React from 'react';
import DataTable from 'react-data-table-component';

import Button from '../../../../components/buttons/Button';
import { FlexBox, Htag } from '../../../../ui/styled/global';
import { PosDetailSchema } from '../../schema/ModelSchema';
import { FullDetailsWrapper, GrayWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const ProductEntryDetails: React.FC<Props> = ({ row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>POS</h2>
            <span>Below are your POS details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <FlexBox className="between">
            <div>
              <FlexBox className="between">
                <Htag>Type</Htag>
                <label>{row.type}</label>
              </FlexBox>

              <FlexBox className="between">
                <Htag>Date</Htag>
                <label>{row.date}</label>
              </FlexBox>
              <FlexBox className="between">
                <Htag>Total Amount</Htag>
                <label>{row.amount}</label>
              </FlexBox>
            </div>

            <div>
              <FlexBox className="between">
                <Htag>Supplier</Htag>
                <label>{row.source}</label>
              </FlexBox>
              <FlexBox className="between">
                <Htag>Invoice No</Htag>
                <label>{row.documentNo}</label>
              </FlexBox>
            </div>
          </FlexBox>
        </FullDetailsWrapper>
        <FullDetailsWrapper>
          <DataTable
            title="Product Items"
            columns={PosDetailSchema}
            data={row.productitems}
            selectableRows
            pointerOnHover
            highlightOnHover
            striped
          />
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ProductEntryDetails;
