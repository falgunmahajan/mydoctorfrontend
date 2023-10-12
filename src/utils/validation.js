import axios from "axios";

function validName(name,setNameError)
{
   const regex= /^[a-zA-Z\s\.]+$/;
   if(regex.test(name))
   {
    setNameError(false)
   }
   else
   {
    setNameError(true)
   }
   
}
async function validMobile(role,mobileNo,setMobileError,setMobileErrorMsg)
{
   const regex= /^[1-9][0-9]{9}$/;
   if(regex.test(mobileNo))
   {
    setMobileError(false)
    await axios.get(`http://localhost:4000/accounts/${role}?contactNumber=${mobileNo}`).catch(error => {
        setMobileError(true)
        setMobileErrorMsg("Mobile number already exist")})
   }
   else
   {
    setMobileError(true)
    setMobileErrorMsg("Please enter a valid 10-digit mobile number!")
   }
   
}
async function validEmail(role,email,setEmailError,setEmailErrorMsg)
{
   const regex= /^[_a-zA-Z0-9\.\s\-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
   if(regex.test(email))
   {
    setEmailError(false)
    await axios.get(`http://localhost:4000/accounts/${role}?email=${email}`).catch(error =>{
        setEmailError(true)
    setEmailErrorMsg("Email address already exist")})
   }
   else
   {
    setEmailError(true)
    setEmailErrorMsg("Please enter a valid e-mail address!")
   }
   
}
function getDate(value)
{
   const date= new Date(value);
   const year = date.getFullYear();
   const day=(`0${date.getDate()}`).slice(-2);
   const month=(`0${date.getMonth()+1}`).slice(-2);
 console.log(month)
 return   `${year}-${month}-${day}`

}
function validPassword(password,confirmPassword,setValidLowerCase,setValidUpperCase,setValidSpecialCharacter,setValidNumber,setValidLength,setMatchPassword)
{
   setValidLowerCase("false");
   setValidUpperCase("false")
   setValidSpecialCharacter("false")
   setValidNumber("false")
   setValidLength("false")
   setMatchPassword("false")
   if((/[a-z]/).test(password))
   {
      setValidLowerCase("true")
   }
   else{
      setValidLowerCase("false")
   }
   if((/[A-Z]/).test(password))
   {
      setValidUpperCase("true")
   }
   else{
      setValidUpperCase("false")
   }
   if((/[!@#$%^&*]/).test(password))
   {
      setValidSpecialCharacter("true")
   }
   else{
      setValidSpecialCharacter("false")
   }
   if((/[0-9]/).test(password))
   {
      setValidNumber("true")
   }
   else{
      setValidNumber("false")
   }
   if(password.length>=6)
   {
      setValidLength("true")
   }
   else
   {
      setValidLength("false")
   }
   if(password==confirmPassword)
   {
      setMatchPassword("true")
   }
   else
   {
      setMatchPassword("false")
   }
}
function matchConfirmPassword(password,confirmPassword,setMatchPassword)
{
   if(password==confirmPassword)
   {
      setMatchPassword("true")
   }
   else
   {
      setMatchPassword("false")
   }
}
const validId=async(hospitalid,setIdError)=>{
if(!hospitalid){
   setIdError("Please enter the hospital id")
}
else{
   const res=await axios.get(`http://localhost:4000/hospital/${hospitalid}`).then(()=>setIdError(false)).catch(err=>{
      setIdError("Hospital Id is not registered")
   })
}
}
const validLocation=(location,setLocationError)=>{
if(!location){
   setLocationError("Please enter a valid location")
}
}
export{
    validName,validMobile,validEmail,getDate,validPassword,matchConfirmPassword,validId,validLocation
}