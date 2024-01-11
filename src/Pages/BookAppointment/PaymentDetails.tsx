import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import visa from "../../svg/visa.svg";
import maestro from "../../svg/maestro.svg";
import western_union from "../../svg/western_union.svg";
import unionpay from "../../svg/unionpay.svg";
import american_express from "../../svg/american_express.svg";
import master_card from "../../svg/master_card.svg";
import jcb from "../../svg/jcb.svg";
import { useAppSelector } from "../../Redux/Store";
interface PaymentDetailsProps {
  next: () => void;
  back: () => void;
}
const thisYear=new Date().getFullYear();
const years:any[]=[]
for(let i=0; i<30; i++){
   let year=thisYear+i
   years.push(year)
}
const months = [
  {
    value: 1,
    label: "01|January",
  },
  {
    value: 2,
    label: "02|February",
  },
  {
    value: 3,
    label: "03|March",
  },
  {
    value: 4,
    label: "04|April",
  },
  {
    value: 5,
    label: "05|May",
  },
  {
    value: 6,
    label: "06|June",
  },
  {
    value: 7,
    label: "07|July",
  },
  {
    value: 8,
    label: "08|August",
  },
  {
    value: 9,
    label: "09|September",
  },
  {
    value: 10,
    label: "10|October",
  },
  {
    value: 11,
    label: "11|November",
  },
  {
    value: 12,
    label: "12|December",
  },
];
const PaymentDetails = ({ next, back }: PaymentDetailsProps) => {

  return (
    <Grid container>
      <Grid item xs={4} sx={{ m: "auto" }}>
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
                variant="outlined"
                fullWidth
                label="Credit/Debit Card Number"
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{mt:3}}>
            <FormControl>
  <InputLabel id="demo-simple-select-label">Expiration month</InputLabel>
  <Select

    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={1}
    label="Expiration month"
    // onChange={handleChange}
  >
    {months.map(month=>(
    <MenuItem value={month.value}>{month.label}</MenuItem>
    ))}

  </Select>
</FormControl>
            </Grid>
            <Grid item xs={12} sm={6} sx={{mt:3}}>
            <FormControl>
  <InputLabel id="demo-simple-select-label">Expiration  year</InputLabel>
  <Select

    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={2024}
    label="Expiration year"
    // onChange={handleChange}
  >
    {years.map(year=>(
        <MenuItem value={year}>{year}</MenuItem>
    ))}
  

  </Select>
</FormControl>
            </Grid>
            <Grid item xs={12} sx={{mt:3}}>
              <TextField
                variant="outlined"
                fullWidth
                label="Security code"
              />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              onClick={back}
              sx={{ color: "black", borderColor: "silver" }}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#3f51b5" }}
              onClick={next}
            >
              Make Payment
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentDetails;
