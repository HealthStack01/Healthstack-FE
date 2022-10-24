import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { UserContext, ObjectContext } from "../context";
import AccountHome from "./Accounts/AccountHome";
import Appointments from "./Clinic/Appointments";
import Login from "./auth";
import IndividualSignup from "./auth/IndividualSignup";
import Signup from "./auth/Signup";
import PrivateOutlet from "./PrivateOutlet";
import Overview from "./app/Overview";

import BillLab from "./Laboratory/BillLab";
import BillPrescription from "./Finance/BillPrescription";
import InventoryBillPrescription from "./inventory/BillPrescription";

import PharmcyBillPrescription from "./Pharmacy/BillPrescription";
import BillRadiology from "./Radiology/BillRadiology";
import BillService from "./Finance/BillService";
import BillTheatre from "./Theatre/BillTheatre";
import CaseDefinition from "./Epidemiology/CaseDefinition";
import ChartofAccount from "./Accounts/ChartofAccount";
import ClinicHome from "./Clinic/ClinicHome";
import Clinic from "./Clinic/Clinic";
import ClinicReport from "./Clinic/ClinicReport";
import ClinicSetup from "./Clinic/ClinicSetup";
import ClinicStore from "./Clinic/ClinicStore";
import Collections from "./Finance/Collections";
import Dashboard from "./Epidemiology/DashBoard";
/* import Dispense from './inventory/Dispensary' */
import Dispense from "./Pharmacy/Dispensary";
import Encounter from "./EncounterMgt/Encounter";
import EpidemiologyHome from "./Epidemiology/EpidemiologyHome";
import Expense from "./Accounts/Expense";
import FacilityAccount from "./Finance/FacilityAccount";
import FacilityHome from "./Admin/FacilityHome";
import Accessibility from "./Admin/Accessibility";
import FinanceHome from "./Finance/FinanceHome";
import FinanceReport from "./Finance/FinanceReport";
import FinanceSetup from "./Finance/FinanceSetup";
import CareTeam from "./Admin/CareTeam";
import Department from "./Admin/Department";
import DeptUnits from "./Admin/DeptUnits";
import Employee from "./Admin/Employee";
import Facility from "./Admin/Facility";
import HSModules from "./Admin/HSModules";
import Bands from "./Admin/Bands";
import Roaster from "./Admin/Roaster";
import Workspace from "./Admin/Workspace";
import WardHome from "./Ward/WardHome";
import Inpatient from "./Ward/Inpatient";
import Admissions from "./Ward/Admissions";
import Discharge from "./Ward/Discharge";
import Location from "./Admin/Location";
import Transfer from "./Ward/Transfer";
import useRepository from "../components/hooks/repository";
import FrontDesk, { FrontDeskList } from "./Client/FrontDesk";
import HMOauth from "./Finance/HMOauth";
import InventoryHome from "./inventory/InventoryHome";
/* import InventoryReport from './inventory/InventoryReport' */
import PharmacyReport from "./Pharmacy/InventoryReport";
import InventorySetup from "./inventory/InventorySetup";
/* import InventorySetup from './Pharmacy/InventorySetup' */

import InventoryStore from "./Pharmacy/InventoryStore";
import Journal from "./Accounts/Journal";
import LaboratoryHome from "./Laboratory/LaboratoryHome";
import LabPayment from "./Laboratory/LabPayment";
import LabReport from "./Laboratory/LabReport";
import Labs from "./Laboratory/Labs"; //, { StoreList, StoreListStandalone }
import Ledgers from "./Accounts/Ledgers";
import Map from "./Epidemiology/Map";
import Patients from "./Client/Client";
import Payment from "./Finance/Payment";
import Pharmacy, {
  PharamcyList,
  PharmacyListStandalone,
} from "./Pharmacy/Pharmacy";
import PharmacyHome from "./Pharmacy/PharmacyHome";
/* import PharmacyPayment from './inventory/PharmacyPayment' */
import PharmacyPayment from "./Pharmacy/PharmacyPayment";
/* import ProductEntry from './Finance/Services'
import ProductEntry from './inventory/ProductEntry' */
import ProductEntry from "./Pharmacy/ProductEntry";
/* import ProductExit from './Finance/ProductExit'
import ProductExit from './inventory/ProductExit' */
import ProductExit from "./Pharmacy/ProductExit";
/* import Products from './Finance/Products'
import Products from './inventory/Products' */
import Products from "./Pharmacy/Products";
import RadAppointments from "./Radiology/RadAppointments";
import RadCheckedin from "./Radiology/RadCheckedin";
import Radiology from "./Radiology/Radiologys"; //, { StoreList, StoreListStandalone }
import RadiologyHome from "./Radiology/RadiologyHome";
import RadiologyPayment from "./Radiology/RadiologyPayment";
import RadiologyReport from "./Radiology/RadiologyReport";
import Report from "./Accounts/Report";
import Services from "./Finance/Services";
import Signals from "./Epidemiology/Signals"; //, { StoreList, StoreListStandalone }
/* import Store, { StoreList, StoreListStandalone } from './Finance/Store' */
/* import Store, { StoreList, StoreListStandalone } from './Finance/Store'  */
import Store, { StoreList, StoreListStandalone } from "./inventory/Store";
import Theatre from "./Theatre/Theatres"; //, /* { StoreList, StoreListStandalone } */
import TheatreAppointments from "./Theatre/TheatreAppointments";
import TheatreCheckedin from "./Theatre/TheatreCheckedin";
import TheatreHome from "./Theatre/TheatreHome";
import TheatrePayment from "./Theatre/TheatrePayment";
import TheatreReport from "./Theatre/TheatreReport";
import { Models } from "./app/Constants";

const moduleLocationTypes = {
  clinic: "Clinic",
  clients: "Front Desk",
  admin: "Front Desk",
  pharmacy: "Pharmacy",
  finance: "Finance",
  inventory: "Store",
  ward: "Ward",
  laboratory: "Laboratory",
};

const AppRoutes = () => {
  const { setLocationType } = useRepository(Models.LOCATION);

  const [currentModule, setCurrentModule] = useState("");
  const location = useLocation();
  useEffect(() => {
    const paths = location.pathname.split("/");
    const newModule = paths.length > 2 && paths[2];
    setCurrentModule(newModule);
    if (
      newModule != currentModule &&
      Object.keys(moduleLocationTypes).includes(newModule)
    ) {
      /* setLocationType(moduleLocationTypes[newModule]); */
    }
  }, [location]);

  return (
    <>
      {/* ................SignUp............. */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupindividual" element={<IndividualSignup />} />
        <Route path="/app" element={<PrivateOutlet />}>
          <Route index element={<Overview />} />
          {/* .............. */}
          <Route path="/app/accounts" element={<AccountHome />} />
          <Route path="/app/accounts/payments" element={<Payment />} />
          <Route path="/app/accounts/expenses" element={<Expense />} />
          <Route path="/app/accounts/reports" element={<Report />} />
          <Route path="/app/accounts/journals" element={<Journal />} />
          <Route path="/app/accounts/ledgers" element={<Ledgers />} />
          <Route
            path="/app/accounts/chartsaccount"
            element={<ChartofAccount />}
          />
          <Route path="/app/clinic" element={<ClinicHome />} />
          <Route path="/app/clinic/clinicsetup" element={<ClinicSetup />} />
          <Route path="/app/clinic/appointments" element={<Appointments />} />
          <Route path="/app/clinic/clinicstore" element={<ClinicStore />} />
          <Route path="/app/clinic/payments" element={<Payment />} />
          <Route path="/app/clients/encounter" element={<Encounter />} />
          <Route path="/app/clients/clients" element={<Patients />} />
          <Route path="/app/clients/appointments" element={<Appointments />} />
          <Route path="/app/clients/clinicreports" element={<ClinicReport />} />
          <Route path="/app/clients/frontdesk" element={<FrontDesk />} />

          <Route path="/app/clinic" element={<ClinicHome />} />
          <Route path="/app/clinic/clinicsetup" element={<ClinicSetup />} />
          <Route path="/app/clinic/appointments" element={<Appointments />} />
          <Route path="/app/clinic/clinicstore" element={<ClinicStore />} />
          <Route path="/app/clinic/encounter" element={<Encounter />} />
          <Route path="/app/clinic/patients" element={<Patients />} />
          <Route path="/app/clinic/clinicreports" element={<ClinicReport />} />
          <Route path="/app/clinic/clinics" element={<Clinic />} />

          <Route path="/app/epid" element={<EpidemiologyHome />} />
          <Route path="/app/epid/map" element={<Map />} />
          <Route path="/app/epid/dashboard" element={<Dashboard />} />
          <Route path="/app/epid/definitions" element={<CaseDefinition />} />
          <Route path="/app/epid/communication" element={<BillLab />} />
          <Route path="/app/epid/signals" element={<Signals />} />

          <Route path="/app/admin" element={<FacilityHome />} />
          <Route path="/app/admin/accessibility" element={<Accessibility />} />

          <Route path="/app/admin/careteam" element={<CareTeam />} />
          <Route path="/app/admin/department" element={<Department />} />
          <Route path="/app/admin/dept-unit" element={<DeptUnits />} />
          <Route path="/app/admin/employees" element={<Employee />} />
          <Route path="/app/admin/facility" element={<Facility />} />
          <Route path="/app/admin/hsmodules" element={<HSModules />} />
          <Route path="/app/admin/location" element={<Location />} />
          <Route path="/app/admin/bands" element={<Bands />} />
          <Route path="/app/admin/roaster" element={<Roaster />} />
          <Route path="/app/admin/Workspace" element={<Workspace />} />
          <Route path="/app/admin/clinicsetup" element={<ClinicSetup />} />

          <Route path="/app/finance" element={<FinanceHome />} />
          <Route path="/app/finance/payment" element={<Payment />} />
          <Route path="/app/finance/collections" element={<Collections />} />
          <Route path="/app/finance/services" element={<Services />} />
          <Route path="/app/finance/billservice" element={<BillService />} />
          <Route path="/app/finance/hmoauth" element={<HMOauth />} />

          <Route path="/app/finance/revenue" element={<FacilityAccount />} />

          <Route path="/app/finance/location" element={<Store />} />

          <Route path="/app/inventory" element={<InventoryHome />} />
          <Route
            path="/app/inventory/inv-dispense"
            element={<InventoryDispense />}
          />
          {/* <Route
            path="/app/inventory/inv-bill"
            element={<InventoryBillPrescription />}
          /> */}
          <Route path="/app/inventory/inv-admin" element={<InventorySetup />} />
          <Route
            path="/app/inventory/inv-inventory"
            element={<InventoryStore />}
          />
          <Route path="/app/inventory/inv-entry" element={<ProductEntry />} />
          <Route path="/app/inventory/inv-exit" element={<ProductExit />} />
          <Route path="/app/inventory/inv-products" element={<Products />} />
          <Route path="/app/inventory/billservice" element={<BillService />} />
          <Route
            path="/app/inventory/inv-reports"
            element={<InventoryReport />}
          />
          <Route path="/app/inventory/inv-stores" element={<Store />} />
          <Route
            path="/app/inventory/inv-payment"
            element={<PharmacyPayment />}
          />

          <Route path="/app/labs" element={<LaboratoryHome />} />

          <Route path="/app/laboratory/billclient" element={<BillService />} />
          <Route path="/app/laboratory/lab-result" element={<LabReport />} />
          <Route path="/app/laboratory/lab-bill" element={<BillLab />} />
          <Route path="/app/laboratory/labs" element={<Labs />} />
          <Route path="/app/laboratory/lab-payment" element={<LabPayment />} />

          <Route path="/app/pharmacy" element={<PharmacyHome />}>
            <Route
              path="/app/pharmacy/billclient"
              element={<PharmacyBillService />}
            />
            <Route
              path="/app/pharmacy/billprescription"
              element={<PharmacyBillPrescription />}
            />
            <Route path="/app/pharmacy/payment" element={<PharmacyPayment />} />
            <Route
              path="/app/pharmacy/dispensary"
              element={<PharmacyDispense />}
            />
            <Route
              path="/app/pharmacy/inventory"
              element={<PharmacyInventoryStore />}
            />
            <Route
              path="/app/pharmacy/productentry"
              element={<PharmacyProductEntry />}
            />
            <Route path="/app/pharmacy/pos" element={<PharmacyProductExit />} />
            <Route
              path="/app/pharmacy/requisition"
              element={<PharmacyReport />}
            />
            <Route
              path="/app/pharmacy/transfer"
              element={<PharmacyTransfer />}
            />
            {/* <Route path="/app/pharmacy/billservice" element={<BillService />} /> */}

            {/* <Route path="/app/pharmacy/inv-payment"element={<PharmacyPayment />} /> */}
          </Route>

          <Route path="/app/radiology" element={<RadiologyHome />} />

          <Route
            path="/app/radiology/radiology-checkedin"
            element={<RadCheckedin />}
          />
          <Route
            path="/app/radiology/radiology-appointments"
            element={<RadAppointments />}
          />
          <Route path="/app/radiology/billservice" element={<BillService />} />
          <Route
            path="/app/radiology/radiology-result"
            element={<RadiologyReport />}
          />
          <Route
            path="/app/radiology/radiology-bill"
            element={<BillRadiology />}
          />
          <Route path="/app/radiology/radiology" element={<Radiology />} />
          <Route
            path="/app/radiology/radiology-payment"
            element={<RadiologyPayment />}
          />

          <Route path="/app/theatre" element={<TheatreHome />} />

          <Route
            path="/app/theatre/theatre-checkedin"
            element={<TheatreCheckedin />}
          />
          <Route
            path="/app/theatre/theatre-appointments"
            element={<TheatreAppointments />}
          />
          <Route path="/app/theatre/billservice" element={<BillService />} />
          <Route
            path="/app/theatre/theatre-result"
            element={<TheatreReport />}
          />
          <Route path="/app/theatre/theatre-bill" element={<BillTheatre />} />
          <Route path="/app/theatre/theatre" element={<Theatre />} />
          <Route
            path="/app/theatre/theatre-payment"
            element={<TheatrePayment />}
          />
          <Route path="/app/theatre/encounter" element={<Encounter />} />

          {/*  <ward></ward> */}
          <Route path="/app/ward" element={<WardHome />} />
          <Route path="/app/ward/transfer" element={<Transfer />} />
          <Route path="/app/ward/inpatients" element={<Inpatient />} />
          <Route path="/app/ward/admissions" element={<Admissions />} />
          <Route path="/app/ward/encounter" element={<Encounter />} />
          <Route path="/app/ward/discharge" element={<Discharge />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;