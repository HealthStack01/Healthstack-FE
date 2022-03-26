import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import PaymentDetails from './../../finance/Payment/PaymentDetail';
import Payments from './PaymentList';
import { paymentQuery } from './query';

const AppPaymentsPharmacy = () => {
  const { resource, setResource } = useObjectState();
  const {
    paymentsResource: { show, selectedPayment },
  } = resource;

  const navigate = (show: string) => (selectedPayment?: any) =>
    setResource({
      ...resource,
      paymentsResource: {
        ...resource.paymentsResource,
        show,
        selectedPayment: selectedPayment || resource.paymentsResource.selectedPayment,
      },
    });

  const { groupedData: payments, submit: handleSubmit, setFindQuery } = useRepository(Models.BILLS, navigate);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFindQuery(paymentQuery(searchText || undefined));
  }, [searchText]);
  return (
    <>
      {show === Views.LIST && (
        <Payments onRowClicked={(row) => navigate(Views.DETAIL)(row)} onSearch={setSearchText} items={payments} />
      )}

      {show === Views.DETAIL && (
        <PaymentDetails
          row={selectedPayment}
          onSubmit={handleSubmit}
          backClick={navigate(Views.LIST)}
          editBtnClicked={() => navigate(Views.EDIT)(selectedPayment)}
          handleAccept={undefined}
          amountBalance={undefined}
        />
      )}
    </>
  );
};

export default AppPaymentsPharmacy;
