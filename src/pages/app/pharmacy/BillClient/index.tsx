import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import BillCreate from './BillCreate';
import BillDetails from './BillDetail';
import BillClient from './BillList';
import BillModify from './BillModify';
import { BillClientQuery } from './query';

const AppBillClient = () => {
  const { resource, setResource } = useObjectState();

  const {
    billClientResource: { show, selectedBillClient },
  } = resource;

  const navigate = (show: string) => (selectedBillClient?: any) =>
    setResource({
      ...resource,
      billClientResource: {
        ...resource.billClientResource,
        show,
        selectedBillClient: selectedBillClient || resource.billClientResource.selectedBillClient,
      },
    });

  const { groupedData: billclient, submit: handleSubmit, setFindQuery } = useRepository(Models.BILLS, navigate);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setFindQuery(BillClientQuery(undefined, searchText || undefined));
  }, [searchText]);

  return (
    <>
      {show === Views.LIST && (
        <BillClient
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          onSearch={setSearchText}
          items={billclient}
          handleCreate={undefined}
        />
      )}
      {resource.billClientResource.show === 'create' && (
        <BillCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.billClientResource.show === 'details' && (
        <BillDetails
          row={resource.billClientResource.selectedBillClient}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.billClientResource.show === 'edit' && (
        <BillModify
          row={resource.billClientResource.selectedBillClient}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppBillClient;
