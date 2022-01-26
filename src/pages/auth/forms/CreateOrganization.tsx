import { Stack } from '@mui/material';

import { useForm } from 'react-hook-form';
import DynamicInput from '../../../components/app/DynamicInput';
import { createOrganizationDataSchema } from '../../../components/app/ModelSchema';

import Button from '../../../components/buttons/Button';


function CreateOrganization() {
  const { control, handleSubmit } = useForm();


  const onSubmit = (data) => {
    console.log(data)
  }


  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>

        {createOrganizationDataSchema.map(({inputType, key, name, options } ) => (
            <DynamicInput
              key = {key}
              inputType = {inputType}
              name = {key}
              label= {name}
              options = {options || []}
              control = {control}
            />

          ))
        }

        <Button type="submit" label="Submit" fullwidth />


      </form>
    </Stack>
  );
}

export default CreateOrganization;
