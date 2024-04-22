import React, { createContext, useState } from 'react';

export const Register = createContext();

const RegisterContext = ({children}) => {

    const [ accountType, setAccountType] = useState("");
    const [ name, setName] = useState("");
    const [ aadhaar, setAadhaar] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ secretCode, setSecretCode] = useState("");
    const [ phone, setPhone] = useState("");
    const [ age, setAge] = useState("");
    const [ dob, setDob] = useState("");
    const [ gender, setGender] = useState("");

    

  return (
    <Register.Provider value={{
        accountType, setAccountType, name, setName, aadhaar, setAadhaar, email, setEmail, password, 
        setPassword, secretCode, setSecretCode, phone, setPhone, age, setAge, dob, setDob, gender, setGender}}
    >
        {children}
    </Register.Provider>
  )
}

export default RegisterContext;