import { Box, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import client from '../../../feathers'

import DynamicInput from '../../../components/app/DynamicInput';

import Button from '../../../components/buttons/Button';
import { moduleSchema } from '../../../components/app/ModelSchema';


const SelectModule = () => {
  const { control, handleSubmit } = useForm();

  let OrgServ = null;


  const onSubmit = (data) => {
    console.log(data)
  }

  useEffect(() => {
      OrgServ = client.service('employee')
      const res = OrgServ.find();

      console.log(res.organizationType)
  }, [OrgServ])



  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      <form   onSubmit={handleSubmit(onSubmit)} >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {
                moduleSchema.first.map(({ inputType, key, name }) => (

                <DynamicInput
                    key={key}
                    inputType={inputType}
                    name={key}
                    label={name}
                    control={control}
                  />
                ))
            }
          </div>

          <div>
            {
              moduleSchema.second.map(({ inputType, key, name }) => (

              <DynamicInput
                  key={key}
                  inputType={inputType}
                  name={key}
                  label={name}
                  control={control}
                />
              ))
            }
          </div>

        </Box>
        <Button type="submit" label="Submit" fullwidth />

      </form>
    </Stack>
  );
}

export default SelectModule;
