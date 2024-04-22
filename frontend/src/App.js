import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import OptionScreen from './screens/OptionScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AboutScreen from './screens/AboutScreen';
import PatientScreen from './screens/PatientScreen';
import DoctorScreen from './screens/DoctorScreen';
import InspectorScreen from './screens/InspectorScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import EditCredentialScreen from './screens/EditCredentialScreen';
import DeleteProfileScreen from './screens/DeleteProfileScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ForgetSecretCodeScreen from './screens/ForgetSecretCodeScreen';
import MoreInfoScreen from './screens/MoreInfoScreen';
import VaccineInfoScreen from './screens/VaccineInfoScreeen';
import VaccinateScreen from './screens/VaccinateScreen';
import Footer from './components/Footer';
import AddVaccineScreen from './screens/AddVaccineScreen';
import EditVaccineScreen from './screens/EditVaccineScreen';
import './customCss/custom.css';

const App = () => {
  return (
    <>
      <Router>
          <Header/>
            <main>
              <Routes>
                <Route path='/' element={<HomeScreen/>} exact />
                <Route path='/login' element={<LoginScreen/>} exact />
                <Route path='/register' element={<RegisterScreen/>} exact />
                <Route path='/about' element={<AboutScreen/>} exact />
                <Route path='/options' element={<OptionScreen/>} exact />
                <Route path='/patient' element={<PatientScreen/>} exact />
                <Route path='/doctor' element={<DoctorScreen/>} exact />
                <Route path='/inspector' element={<InspectorScreen/>} exact />
                <Route path='/editprofile' element={<EditProfileScreen/>} exact />
                <Route path='/editcredentials' element={<EditCredentialScreen/>} exact />
                <Route path='/deleteprofile' element={<DeleteProfileScreen/>} exact />
                <Route path='/forgetpassword' element={<ForgetPasswordScreen/>} exact />
                <Route path='/forgetsecretcode' element={<ForgetSecretCodeScreen/>} exact />
                <Route path='/patient/moreinfo/:id' element={<MoreInfoScreen/>} />
                <Route path='/doctor/vaccines/information' element={<VaccineInfoScreen/>}/>
                <Route path='/doctor/vaccinate/:aadhaar' element={<VaccinateScreen/>} />
                <Route path='/doctor/addvaccine' element={<AddVaccineScreen/>} />
                <Route path='/doctor/vaccine/edit/:id' element={<EditVaccineScreen/>} />
              </Routes>
            </main>
          <Footer/>
      </Router>
    </>
  )
}

export default App;
































































