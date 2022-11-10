/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import { Route, useNavigate, Link, NavLink } from "react-router-dom";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";
import { formatDistanceToNowStrict, format, subDays, addDays } from "date-fns";
import DatePicker from "react-datepicker";
import LocationSearch from "../helpers/LocationSearch";
import EmployeeSearch from "../helpers/EmployeeSearch";
import BillServiceCreate from "../Finance/BillServiceCreate";
import "react-datepicker/dist/react-datepicker.css";

import { PageWrapper } from "../../ui/styled/styles";
import { TableMenu } from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import Switch from "../../components/switch";
import { BsFillGridFill, BsList } from "react-icons/bs";
import CalendarGrid from "../../components/calender";
import ModalBox from "../../components/modal";
import { Box, Grid, Button as MuiButton } from "@mui/material";
import DebouncedInput from "../Appointment/ui-components/inputs/DebouncedInput";
import { MdCancel } from "react-icons/md";
// eslint-disable-next-line
const searchfacility = {};

export default function HealthPlan() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="section remPadTop">
      <HealthPlanList showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}

export function AppointmentCreate({ showModal, setShowModal }) {
  const { state, setState } = useContext(ObjectContext);
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [message, setMessage] = useState("");
  const [clientId, setClientId] = useState();
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [type, setType] = useState();
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("appointments");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  // const [appointment_reason,setAppointment_reason]= useState()
  const [appointment_status, setAppointment_status] = useState("");
  const [appointment_type, setAppointment_type] = useState("");
  const [billingModal, setBillingModal] = useState(false);

  const [chosen, setChosen] = useState();
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();
  const appClass = ["On-site", "Teleconsultation", "Home Visit"];

  let appointee; //  =state.ClientModule.selectedClient
  /*  const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
  const handleChangeType = async (e) => {
    await setAppointment_type(e.target.value);
  };

  const handleChangeStatus = async (e) => {
    await setAppointment_status(e.target.value);
  };

  const getSearchfacility = (obj) => {
    setClientId(obj._id);
    setChosen(obj);
    //handleRow(obj)
    if (!obj) {
      //"clear stuff"
      setClientId();
      setChosen();
    }

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };
  const getSearchfacility1 = (obj) => {
    setLocationId(obj._id);
    setChosen1(obj);

    if (!obj) {
      //"clear stuff"
      setLocationId();
      setChosen1();
    }
  };
  const getSearchfacility2 = (obj) => {
    setPractionerId(obj._id);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setPractionerId();
      setChosen2();
    }
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    setShowModal(false),
      setState((prevstate) => ({
        ...prevstate,
        AppointmentModule: {
          selectedAppointment: {},
          show: "list",
        },
      }));

    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    data.locationId = locationId; //state.ClinicModule.selectedClinic._id
    data.practitionerId = practionerId;
    data.appointment_type = appointment_type;
    // data.appointment_reason=appointment_reason
    data.appointment_status = appointment_status;
    data.clientId = clientId;
    data.firstname = chosen.firstname;
    data.middlename = chosen.middlename;
    data.lastname = chosen.lastname;
    data.dob = chosen.dob;
    data.gender = chosen.gender;
    data.phone = chosen.phone;
    data.email = chosen.email;
    data.practitioner_name = chosen2.firstname + " " + chosen2.lastname;
    data.practitioner_profession = chosen2.profession;
    data.practitioner_department = chosen2.department;
    data.location_name = chosen1.name;
    data.location_type = chosen1.locationType;
    data.actions = [
      {
        action: appointment_status,
        actor: user.currentEmployee._id,
      },
    ];
    console.log(data);

    ClientServ.create(data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        setAppointment_type("");
        setAppointment_status("");
        setClientId("");
        setLocationId("");
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        setSuccess1(true);
        setSuccess2(true);
        toast({
          message:
            "Appointment created succesfully, Kindly bill patient if required",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setSuccess1(false);
        setSuccess2(false);
        // showBilling()
      })
      .catch((err) => {
        toast({
          message: "Error creating Appointment " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    getSearchfacility(state.ClientModule.selectedClient);

    /* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
    return () => {};
  }, [state.ClientModule.selectedClient]);

  /*   const showBilling = () =>{
        setBillingModal(true)
       //history.push('/app/finance/billservice')
        }
        const  handlecloseModal1 = () =>{
            setBillingModal(false)
            }


            const handleRow= async(Client)=>{
              //  await setSelectedClient(Client)
                const    newClientModule={
                    selectedClient:Client,
                    show :'detail'
                }
               await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
            } */

  return (
    <>

      <div className="card ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ModalHeader text={"Create Appointment"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MdCancel
                onClick={() => {
                  setShowModal(false),
                    setState((prevstate) => ({
                      ...prevstate,
                      AppointmentModule: {
                        selectedAppointment: {},
                        show: "list",
                      },
                    }));
                }}
                style={{
                  fontSize: "2rem",
                  color: "crimson",
                  cursor: "pointer",
                  float: "right",
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ClientSearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <LocationSearch
                getSearchfacility={getSearchfacility1}
                clear={success1}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <EmployeeSearch
                getSearchfacility={getSearchfacility2}
                clear={success2}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="field ml-3 ">
                {/* <label className= "mr-2 "> <b>Modules:</b></label> */}
                {appClass.map((c, i) => (
                  <label
                    className=" is-small"
                    key={c}
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >

      <div className="card card-overflow">
        <div className="card-header">
          <p className="card-header-title">
            Create Product Exit: Product Exit- Sales, Dispense, Audit, Transfer
            out
          </p>
        </div>
        <div className="card-content ">
          <form onSubmit={onSubmit}>
            {" "}
            {/* handleSubmit(onSubmit) */}
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <div className="select is-small">
                      <select
                        name="type"
                        value={type}
                        onChange={handleChangeType}
                        className="selectadd"
                      >
                        <option value="">Choose Type </option>
                        <option value="Sales">Sales </option>
                        <option value="In-house">In-House </option>
                        <option value="Dispense">Dispense</option>
                        <option value="Audit">Audit</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      /* {...register("x",{required: true})} */ value={source}
                      name="client"
                      type="text"
                      onChange={e => setSource(e.target.value)}
                      placeholder="Client"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* horizontal end */}
            {/*  <div className="field">
                <p className="control has-icons-left"> // Audit/initialization/Purchase Invoice 
                    <input className="input is-small"  {...register("x",{required: true})} name="type" type="text" placeholder="Type of Product Entry"/>
                    <span className="icon is-small is-left">
                    <i className=" fas fa-user-md "></i>
                    </span>
                </p>
            </div> */}
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      /* {...register("x",{required: true})} */ value={date}
                      name="date"
                      type="text"
                      onChange={e => setDate(e.target.value)}
                      placeholder="Date"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      /* {...register("input_name")} */ name="documentNo"
                      value={documentNo}
                      type="text"
                      onChange={e => setDocumentNo(e.target.value)}
                      placeholder=" Invoice Number"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-phone-alt"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                  
                    <input
                      type="radio"
                      value={c}
                      name="appointmentClass"
                      {...register("appointmentClass", { required: true })}
                      style={{
                        border: "1px solid #0364FF",
                        transform: "scale(1.5)",
                        color: "#0364FF",
                        margin: ".5rem",
                      }}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <div className="field">
                <input
                  name="start_time"
                  {...register("start_time", { required: true })}
                  type="datetime-local"
                  style={{
                    border: "1px solid #0364FF",
                    padding: "1rem",
                    color: " #979DAC",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <select
                name="type"
                value={type}
                onChange={handleChangeType}
                style={{
                  border: "1px solid #0364FF",
                  padding: "1rem",
                  color: " #979DAC",
                }}
              >
                <option defaultChecked>Choose Appointment Type </option>
                <option value="New">New</option>
                <option value="Followup">Followup</option>
                <option value="Readmission with 24hrs">
                  Readmission with 24hrs
                </option>
                <option value="Annual Checkup">Annual Checkup</option>
                <option value="Walk in">Walk-in</option>
              </select>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <select
                name="appointment_status"
                value={appointment_status}
                onChange={handleChangeStatus}
                style={{
                  border: "1px solid #0364FF",
                  padding: "1rem",
                  color: " #979DAC",
                }}
              >
                <option defaultChecked>Appointment Status </option>
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked In">Checked In</option>
                <option value="Vitals Taken">Vitals Taken</option>
                <option value="With Nurse">With Nurse</option>
                <option value="With Doctor">With Doctor</option>
                <option value="No Show">No Show</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Billed">Billed</option>
              </select>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <textarea
                className="input is-small"
                name="appointment_reason"
                {...register("appointment_reason", { required: true })}
                type="text"
                placeholder="Appointment Reason"
                rows="10"
                cols="50"
                style={{
                  border: "1px solid #0364FF",
                  padding: "1rem",
                  color: " #979DAC",
                  width: "100%",
                }}
              >
                {" "}
              </textarea>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#0364FF",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Button
                type="button"
                onClick={(e) => e.target.reset()}
                style={{
                  backgroundColor: "#ffffff",
                  width: "100%",
                  color: "#0364FF",
                  border: "1px solid #0364FF",
                  cursor: "pointer",
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export function HealthPlanList({ showModal, setShowModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("appointments");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("list");

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedAppointment: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
    const newClient = {
      selectedClient: {},
      show: "create",
    };
    await setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
    setShowModal(true);
  };

  const handleRow = async (Client) => {
    setShowModal(true);
    await setSelectedAppointment(Client);
    const newClientModule = {
      selectedAppointment: Client,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
  };
  //console.log(state.employeeLocation)

  const handleSearch = (val) => {
    const field = "firstname";
    //  console.log(val)

    let query = {
      $or: [
        {
          firstname: {
            $regex: val,
            $options: "i",
          },
        },
        {
          lastname: {
            $regex: val,
            $options: "i",
          },
        },
        {
          middlename: {
            $regex: val,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_type: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_status: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_reason: {
            $regex: val,
            $options: "i",
          },
        },
        {
          location_type: {
            $regex: val,
            $options: "i",
          },
        },
        {
          location_name: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_department: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_profession: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_name: {
            $regex: val,
            $options: "i",
          },
        },
      ],
      facility: user.currentEmployee.facilityDetail._id, // || "",
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    };
    if (state.employeeLocation.locationType !== "Front Desk") {
      query.locationId = state.employeeLocation.locationId;
    }

    ClientServ.find({ query: query })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    console.log(user);
    if (user.currentEmployee) {
      let stuff = {
        facility: user.currentEmployee.facilityDetail._id,
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      // if (state.employeeLocation.locationType !== "Front Desk") {
      //   stuff.locationId = state.employeeLocation.locationId;
      // }

      const findClient = await ClientServ.find({ query: stuff });

      await setFacilities(findClient.data);
      console.log(findClient.data);
    } else {
      if (user.stacker) {
        const findClient = await ClientServ.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClient.data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      handleCalendarClose();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    ClientServ.on("created", (obj) => handleCalendarClose());
    ClientServ.on("updated", (obj) => handleCalendarClose());
    ClientServ.on("patched", (obj) => handleCalendarClose());
    ClientServ.on("removed", (obj) => handleCalendarClose());
    const newClient = {
      selectedClient: {},
      show: "create",
    };
    setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
    return () => {};
  }, []);
  const handleCalendarClose = async () => {
    let query = {
      start_time: {
        $gt: subDays(startDate, 1),
        $lt: addDays(startDate, 1),
      },
      facility: user?.currentEmployee?.facilityDetail?._id,

      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    };
    // if (state.employeeLocation.locationType !== "Front Desk") {
    //   query.locationId = state.employeeLocation.locationId;
    // }

    const findClient = await ClientServ.find({ query: query });

    await setFacilities(findClient.data);
  };

  const handleDate = async (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    if (!!startDate) {
      handleCalendarClose();
    } else {
      getFacilities();
    }

    return () => {};
  }, [startDate]);
  //todo: pagination and vertical scroll bar

  const onRowClicked = () => {};

  const mapFacilities = () => {
    let mapped = [];
    facilities.map((facility, i) => {
      mapped.push({
        title: facility?.firstname + " " + facility?.lastname,
        start: format(new Date(facility?.start_time), "yyyy-MM-ddTHH:mm"),
        end: facility?.end_time,
        id: i,
      });
    });
    return mapped;
  };
  const activeStyle = {
    backgroundColor: "#0064CC29",
    border: "none",
    padding: "0 .8rem",
  };

  const dummyData = [
    {
      patients_name: "Tejiri Tabir",
      name_of_plan: "Family Plan",
      category: "family",
      category: "Tatanium Series",
      premium: "27-10-21",
      status: "Active"
    },
    {
      patients_name: "Tejiri Tabir",
      name_of_plan: "Family Plan",
      category: "family",
      category: "Tatanium Series",
      premium: "27-10-21",
      status: "Active"
    },{
      patients_name: "Tejiri Tabir",
      name_of_plan: "Family Plan",
      category: "family",
      category: "Tatanium Series",
      premium: "27-10-21",
      status: "Active"
    },{
      patients_name: "Tejiri Tabir",
      name_of_plan: "Family Plan",
      category: "family",
      category: "Tatanium Series",
      premium: "27-10-21",
      status: "Active"
    },{
      patients_name: "Tejiri Tabir",
      name_of_plan: "Family Plan",
      category: "family",
      category: "Tatanium Series",
      premium: "27-10-21",
      status: "Active"
    },{
      patients_name: "Tejiri Tabir",
      name_of_plan: "Family Plan",
      category: "family",
      category: "Tatanium Series",
      premium: "27-10-21",
      status: "Active"
    },{
      patients_name: "Tejiri Tabir",
      name_of_plan: "Family Plan",
      category: "family",
      category: "Tatanium Series",
      premium: "27-10-21",
      status: "Active"
    },{
      patients_name: "Tejiri Tabir",
      name_of_plan: "Family Plan",
      category: "family",
      category: "Tatanium Series",
      premium: "27-10-21",
      status: "Active"
    },{
      patients_name: "Tejiri Tabir",
      name_of_plan: "Family Plan",
      category: "family",
      category: "Tatanium Series",
      premium: "27-10-21",
      status: "Active"
    },
    
  ];

  const returnCell = (status) => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case "active":
        return <span style={{ color: "#17935C" }}>{status}</span>;

      case "ongoing":
        return <span style={{ color: "#0364FF" }}>{status}</span>;

      case "declined":
        return <span style={{ color: "#ED0423" }}>{status}</span>;

      case "pending":
        return <span style={{ color: "#EF9645" }}>{status}</span>;

      default:
        break;
    }
  };

  const preAuthSchema = [
    {
      name: "Patients Name",
      key: "patients_name",
      description: "Enter Patients Name",
      selector: (row, i) => row.patients_name,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Name of Plan",
      key: "name_of_plan",
      description: "Name of Plan",
      selector: (row) => row.name_of_plan,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Category",
      key: "category",
      description: "Category",
      selector: (row) => row.category,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Premium",
      key: "premium",
      description: "Premium",
      selector: (row, i) => row.premium,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Status",
      key: "status",
      description: "Status",
      selector: "status",
      cell: (row, i) => returnCell (row.status),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.status === "approved",
      style: {
        color: "red",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "ongoing",
      style: {
        color: "rgba(0,0,0,.54)",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "pending",
      style: {
        color: "pink",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "declined",
      style: {
        color: "purple",
        backgroundColor: "green",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <PageWrapper
              style={{ flexDirection: "column", padding: "0.6rem 1rem" }}
            >
              
              <TableMenu>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {handleSearch && (
                    <div className="inner-table">
                      <FilterMenu onSearch={handleSearch} />
                    </div>
                  )}
                  {/* <h2 style={{ margin: "0 10px", fontSize: "0.95rem" }}>
                    Pre-Authorization
                  </h2> */}
                  {/* <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Filter By Date"
                    isClearable
                  /> */}
                  {/* <SwitchButton /> */}
                  <Switch>
                    <button
                      value={value}
                      onClick={() => {
                        setValue("list");
                      }}
                      style={value === "list" ? activeStyle : {}}
                    >
                      <BsList style={{ fontSize: "1rem" }} />
                    </button>
                    <button
                      value={value}
                      onClick={() => {
                        setValue("grid");
                      }}
                      style={value === "grid" ? activeStyle : {}}
                    >
                      <BsFillGridFill style={{ fontSize: "1rem" }} />
                    </button>
                  </Switch>
                </div>

                {handleCreateNew && (
                 <MuiButton
                 variant="contained"
                 sx={{widh: "fit", textTransform: "capitalize", fontSize: "14px", fontWeight: '600'}}
                 onClick={handleCreateNew}
                 >
                 <AddCircleOutlineIcon sx={{marginRight: "5px"}} fontSize="small"/>
                  Add Health plan
                 </MuiButton>
                )} 
              </TableMenu>
              <div style={{ width: "100%", height: "700px", overflow: "auto" }}>
                {value === "list" ? (
                  <CustomTable
                    title={""}
                    columns={preAuthSchema}
                    data={dummyData}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={handleRow}
                    progressPending={loading}
                    //conditionalRowStyles={conditionalRowStyles}
                  />
                ) : (
                  <CalendarGrid appointments={mapFacilities()} />
                )}
              </div>
            </PageWrapper>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
