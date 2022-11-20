import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
import EmployeeSearch from "../../../helpers/EmployeeSearch";

const LeadAssignStaff = ({closeModal}) => {
  const {register} = useForm();

  return (
    <Box
      sx={{
        width: "500px",
        maxHeight: "80vh",
      }}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EmployeeSearch />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <FormsHeaderText text="Create Task" />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input register={register("title", {required: true})} label="Title" />
        </Grid>

        <Grid item xs={8}>
          <CustomSelect
            register={register("city", {required: true})}
            label="Type"
            options={["Open", "Closed", "Pending"]}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={4}>
          <CustomSelect
            register={register("city", {required: true})}
            label="Priority"
            options={["Open", "Closed", "Pending"]}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Additional Information"
            placeholder="Write here..."
          />
        </Grid>
      </Grid>

      <Box mt={1}>
        <Button
          variant="contained"
          size="small"
          sx={{
            minWidth: "120px",
            textTransform: "capitalize",
            marginRight: "10px",
          }}
          color="success"
        >
          Done
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{minWidth: "120px", textTransform: "capitalize"}}
          color="error"
          onClick={closeModal}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default LeadAssignStaff;