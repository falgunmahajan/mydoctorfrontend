import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
type SpecialityCardProps={
    imageUrl:string,
    speciality:string
}
const SpecialitiesCard = ({imageUrl,speciality}:SpecialityCardProps) => {
  return (
    <Card
      sx={{
        width: {xs:200,xl:350},
        height: 180,
        border: 1,
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <img
          src={`http://localhost:4000/${imageUrl}`}
          alt="img not found"
          width="30%"
        />
        <Typography variant="h6" component="div" sx={{ mt: 3, fontSize:16 }}>
          {speciality}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SpecialitiesCard;
