import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import RadioButton from '../../../../components/inputs/basic/Radio';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { PaymentDetailsSchema, PaymentSchema } from '../../schema/ModelSchema';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const typeOptions = [
  {
    value: 'Full',
    label: 'full',
  },
  {
    value: 'Part',
    label: 'Part',
  },
];

const PaymentDetails = ({ row, backClick, onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const [fName, setfName] = useState(0);
  const [paid, setPaid] = useState(0);
  const [balance, setBalance] = useState(0);
  const { handleSubmit, control } = useForm();
  const [update, setUpdate] = useState();

  useEffect(() => {
    setAmount(row.paymentInfo.amountDue);
  });
  let calcAmount = amount - fName;
  const paidUp = () => {
    setPaid(fName);
    setBalance(calcAmount);
    setfName(0);
  };

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Payment Details</h2>
            <span>Below are your payment’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <HeadWrapper>
            <div>
              <h2>Make deposit for {row.orderInfo.orderObj.clientname}</h2>
            </div>
            <div>
              <label
                style={{
                  padding: '14px 20px',
                  background: '#ffb3bd',
                  color: '#ED0423',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Balance N {}
              </label>
            </div>
          </HeadWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <GridWrapper>
              {PaymentDetailsSchema.map((client, index) => (
                <DynamicInput
                  key={index}
                  name={client.key}
                  control={control}
                  label={client.name}
                  inputType={client.inputType}
                  options={client.options}
                />
              ))}
            </GridWrapper>
            <BottomWrapper>
              <Button label="Accept Payment" type="submit" />
            </BottomWrapper>
          </form>
        </FullDetailsWrapper>

        <FullDetailsWrapper>
          <HeadWrapper>
            <div>
              <h2>Pay bills for {row.orderInfo.orderObj.clientname}</h2>
            </div>
            <div>
              <label
                style={{
                  padding: '14px 20px',
                  background: '#ffb3bd',
                  color: '#ED0423',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Total Amount Due {amount}
              </label>
            </div>
          </HeadWrapper>
          <GridWrapper>
            {PaymentSchema.map((schema) => (
              <div>
                <label>{schema.name}</label>
                <p>{schema.selector(row)}</p>
              </div>
            ))}
            <div>
              <RadioButton title="Type" options={typeOptions} onChange={(e) => setUpdate(e.target.value)} />
              {update === 'Part' && (
                <>
                  <div>
                    <Input name="paymentType" value={fName} onChange={(e) => setfName(Number(e.target.value))} />
                  </div>
                  <div>
                    <label
                      style={{
                        padding: '14px 20px',
                        background: '#ffb3bd',
                        color: '#ED0423',
                        border: 'none',
                        borderRadius: '4px',
                      }}
                    >
                      paid up {paid}
                    </label>
                  </div>
                  <div>
                    <label
                      style={{
                        padding: '14px 20px',
                        background: '#ffb3bd',
                        color: '#ED0423',
                        border: 'none',
                        borderRadius: '4px',
                      }}
                    >
                      Balance {balance}
                    </label>
                  </div>
                </>
              )}

              <Button onClick={paidUp}>Update</Button>
            </div>
          </GridWrapper>
          <BottomWrapper>
            <Button label="Pay" type="submit" />
          </BottomWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PaymentDetails;
