/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
/* import Store, {StoreList} from "./Clinic"; */
import {UserContext, ObjectContext} from "../../context";
import LocationSelect from "../../components/inputs/LocationSelect";
import LocationModal from "../../components/inputs/LocationModal";
import {Outlet} from "react-router-dom";
import FrontDesk, {FrontDeskList} from "./FrontDesk";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ModalBox from "../../components/modal";
import Button from "../../components/buttons/Button";

export default function ClientHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const [showModal, setShowModal] = useState(false);
  // const { user, setUser } = useContext(UserContext);
  const data = localStorage.getItem("user");

  const user = JSON.parse(data);

  console.log("Stored User", user);

  const [selectedClinic, setSelectedClinic] = useState(
    state.FrontDesk.selectedFrontDesk
  );
  const locationOptions = ["simpa", "lekan"];
  const handleSelectLocation = () => {};

  const handleCloseModal = () => {
    state.showStoreModal = "modal";
    setState(state);
    console.log(state.showStoreModal);
  };

  useEffect(() => {
    // console.log("starting up Client module")
    //alert(!selectedClinic);

    const noObject = Object.keys(selectedClinic).length === 0;

    if (noObject) {
      handleChangeClinic();
    }
    return () => {};
  }, []);

  const handleChangeClinic = async () => {
    await setShowModal(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setSelectedClinic(state.FrontDesk.selectedFrontDesk);

    const newEmployeeLocation = {
      locationName: state.FrontDesk.selectedFrontDesk.name,
      locationType: "Front Desk",
      locationId: state.FrontDesk.selectedFrontDesk._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
    };

    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.FrontDesk.selectedFrontDesk]);

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="layout__content-main">
          <ModalBox open={showModal}>
            <Box
              sx={{
                width: "600px",
                maxHeight: "450px",
              }}
            >
              <FrontDeskList
                standalone={true}
                closeModal={() => setShowModal(false)}
              />
            </Box>
          </ModalBox>

          {children}
          <Outlet />
        </div>
      </section>
    </section>
  );
}
