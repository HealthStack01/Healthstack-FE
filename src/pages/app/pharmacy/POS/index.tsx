import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import { ProductEntryQuery } from '../../pharmacy/ProductEntry/query';
import POSCreate from './POSCreate';
import ProductEntryDetails from './POSDetail';
import ProductEntryList from './POSList';
import POSModify from './POSModify';

const AppPOS = () => {
  const { resource, setResource } = useObjectState();
  const {
    employeeResource: { show, selectedEmployee },
  } = resource;

  const navigate = (show: string) => (selectedEmployee?: any) =>
    setResource({
      ...resource,
      employeeResource: {
        ...resource.appointmentResource,
        show,
        selectedEmployee: selectedEmployee || resource.employeeResource.selectedEmployee,
      },
    });

  const { list: productentry, setFindQuery } = useRepository(Models.PRODUCTENTRY, navigate);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setFindQuery(ProductEntryQuery(undefined, undefined, searchText || undefined));
  }, [searchText]);
  return (
    <>
      {show === Views.LIST && (
        <ProductEntryList
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          onSearch={setSearchText}
          items={productentry}
          handleCreate={undefined}
        />
      )}
      {resource.employeeResource.show === 'create' && (
        <POSCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {show === Views.DETAIL && <ProductEntryDetails row={selectedEmployee} backClick={navigate(Views.LIST)} />}
      {resource.employeeResource.show === 'edit' && (
        <POSModify
          row={resource.employeeResource.selectedEmployee}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppPOS;
