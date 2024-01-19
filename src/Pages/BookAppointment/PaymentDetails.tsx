import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import visa from "../../svg/visa.svg";
import maestro from "../../svg/maestro.svg";
import western_union from "../../svg/western_union.svg";
import unionpay from "../../svg/unionpay.svg";
import american_express from "../../svg/american_express.svg";
import master_card from "../../svg/master_card.svg";
import jcb from "../../svg/jcb.svg";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { deleteAppointmentData } from "../../Redux/slotsSlice";
interface PaymentDetailsProps {
  next: () => void;
  back: () => void;
}
const thisYear = new Date().getFullYear();
const years: any[] = [];
for (let i = 0; i < 30; i++) {
  let year = thisYear + i;
  years.push(year);
}
const months = [
  {
    value: 0,
    label: "01|January",
  },
  {
    value: 1,
    label: "02|February",
  },
  {
    value: 2,
    label: "03|March",
  },
  {
    value: 3,
    label: "04|April",
  },
  {
    value: 4,
    label: "05|May",
  },
  {
    value: 5,
    label: "06|June",
  },
  {
    value: 6,
    label: "07|July",
  },
  {
    value: 7,
    label: "08|August",
  },
  {
    value: 8,
    label: "09|September",
  },
  {
    value: 9,
    label: "10|October",
  },
  {
    value: 10,
    label: "11|November",
  },
  {
    value: 11,
    label: "12|December",
  },
];
const PaymentDetails = ({ next, back }: PaymentDetailsProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [expiryYear, setExpiryYear] = useState(thisYear);
  const [expiryMonth, setExpiryMonth] = useState(new Date().getMonth());
  const [cardError, setCardError] = useState(false);
  const [securityError, setSecurityError] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const appointmentData = useAppSelector((state) => state.slotsReducer.data);
  const navigate=useNavigate()
  const dispatch = useAppDispatch();
  let success:string,error:string;
  const validCardNumber = () => {
    const regex = /^\d{16}$/;
    if (!regex.test(cardNumber)) {
      return false;
    } else {
      return true;
    }
  };
  const validSecurityCode = () => {
    const regex = /^\d{3,4}$/;
    if (!regex.test(securityCode)) {
      return false;
    } else {
      return true;
    }
  };
  const validExpiryDate = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    if (expiryYear === currentYear && expiryMonth < currentMonth) {
      return false;
    } else {
      return true;
    }
  };
  const makePayment=async()=>{
    setShowLoading(true)
    const expiryDate=new Date()
    expiryDate.setFullYear(expiryYear)
    expiryDate.setMonth(expiryMonth)
    const user=JSON.parse(localStorage.getItem("user")||"{}")
       
        const token = user.accessToken;
        try {
          const res=await axios.post("http://localhost:4000/payment", {
            cardNumber,
            cvv:securityCode,
            expiryDate:moment(expiryDate).format("MM-YYYY"),
            doctorId:appointmentData?.doctor?.Id,
            slotId:appointmentData?.slots?.Id,
            consultancyPrice:appointmentData?.slots?.hospital.doctors[0].hospitalDoctorMapping.consultationFee,
            otherName:appointmentData?.otherName,
            otherMobileNumber:appointmentData?.otherMobileNumber
          },{
            headers:{
              Authorization:token
          },
         
          })
          success="Appointment is booked successfully!"
        } catch (err) {
          error="Appointment booking failed!"
        }
   
    setShowLoading(false)
    dispatch(deleteAppointmentData())
  navigate("/appointments",{state:{
    success,
    error
  }})
  }
  const disabledNextButton =
    !validCardNumber() ||
    !validExpiryDate() ||
    !validSecurityCode() ||
    showLoading;
  return  (
    <Grid container>
      <Grid item xs={7} xl={4} sx={{ m: "auto" }}>
        <Typography variant="h4">Appointment Details</Typography>
        <Box sx={{ mt: 2, border: 1, borderColor: "silver", px: 2, py: 4 }}>
          <Typography sx={{ fontSize: 15 }}>
            Accepted Credit/Debit Cards
          </Typography>
          <img
            src={visa}
            alt="image not found"
            style={{ width: "9%", marginLeft: "2%", marginTop: "2%" }}
          />
          <img src={maestro} alt="image not found" />
          <img src={western_union} alt="image not found" />
          <img src={unionpay} alt="image not found" />
          <img src={american_express} alt="image not found" />
          <img src={master_card} alt="image not found" />
          <img src={unionpay} alt="image not found" />
          <img src={jcb} alt="image not found" />
          <Grid container>
            <Grid item xs={12}>
              <TextField
                error={cardError}
                variant="outlined"
                inputProps={{ maxLength: 16 }}
                fullWidth
                label="Credit/Debit Card Number"
                value={cardNumber}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                onChange={(e) => setCardNumber(e.target.value)}
                onBlur={() => {
                  if (validCardNumber()) {
                    setCardError(false);
                  } else {
                    setCardError(true);
                  }
                }}
                helperText={
                  cardError && "Please enter a valid 16 digit card Number"
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
              <FormControl error={expiryError}>
                <InputLabel id="demo-simple-select-label">
                  Expiration month
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={expiryMonth}
                  label="Expiration month"
                  onChange={(e) => setExpiryMonth(Number(e.target.value))}
                  onBlur={() => {
                    if (validExpiryDate()) {
                      setExpiryError(false);
                    } else {
                      setExpiryError(true);
                    }
                  }}
                >
                  {months.map((month) => (
                    <MenuItem value={month.value}>{month.label}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {expiryError && "Please select the future expiry date"}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
              <FormControl error={expiryError} sx={{ width: "50%" }}>
                <InputLabel id="demo-simple-select-label">
                  Expiration Year
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={expiryYear}
                  label="Expiration Year"
                  onChange={(e) => setExpiryYear(Number(e.target.value))}
                  onBlur={() => {
                    if (validExpiryDate()) {
                      setExpiryError(false);
                    } else {
                      setExpiryError(true);
                    }
                  }}
                >
                  {years.map((year) => (
                    <MenuItem value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField
                error={securityError}
                inputProps={{ maxLength: 4 }}
                variant="outlined"
                fullWidth
                label="Security code"
                value={securityCode}
                placeholder="XXXX"
                onChange={(e) => setSecurityCode(e.target.value)}
                onBlur={() => {
                  if (validSecurityCode()) {
                    setSecurityError(false);
                  } else {
                    setSecurityError(true);
                  }
                }}
                helperText={
                  securityError && "Please enter a valid security code"
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              disabled={showLoading}
              onClick={back}
              sx={{ color: "black", borderColor: "silver" }}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={6} sx={{position:"relative"}}>
            <Button
              variant="contained"
              fullWidth
              disabled={disabledNextButton}
              sx={{ backgroundColor: "#3f51b5" }}
              onClick={makePayment}
            >
              Make Payment
            </Button>
            {showLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentDetails;
