import React, { useEffect, useState } from 'react';

import AccordionBox from '../../../../components/accordion';
import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import useRepository from '../../../../components/hooks';
import { ButtonGroup } from '../../../../ui/styled/global';
import { Models } from '../../Constants';
import { CollectionSchema } from '../../schema/ModelSchema';
import { FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const ClaimsDetails = ({ row, backClick }) => {
  const { find: getCollections, user } = useRepository<any>(Models.COLLECTION);

  const [credits, setCredits] = useState([]);
  const [debits, setDebits] = useState([]);

  useEffect(() => {
    getCollections({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        client: row.client,

        $sort: {
          createdAt: -1,
        },
      },
    }).then((res: any) => {
      setCredits(res.data.filter((obj) => obj.category === 'credit'));
      setDebits(res.data.filter((obj) => obj.category === 'debit'));
    });
  }, []);

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Claims Details</h2>
            <span>Below are your Claims’s details</span>
          </div>
          <ButtonGroup>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
            <label
              style={{
                padding: '14px 20px',
                background: '#b3ffed',
                color: '#062e12',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Current Balance {row.amount}
            </label>
          </ButtonGroup>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper className="two-columns">
            <AccordionBox defaultExpanded={true} title="Credit">
              <CustomTable
                data={credits}
                columns={CollectionSchema}
                title="Credit"
                pointerOnHover
                highlightOnHover
                striped
              />
            </AccordionBox>
            <AccordionBox defaultExpanded={true} title="Debit">
              <CustomTable
                data={debits}
                columns={CollectionSchema}
                title="Debit"
                pointerOnHover
                highlightOnHover
                striped
              />
            </AccordionBox>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ClaimsDetails;
