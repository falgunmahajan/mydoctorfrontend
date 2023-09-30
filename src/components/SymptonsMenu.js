import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import symptoms from "../symptoms.json"
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
export default function SymptonsMenu() {
    const theme=useTheme();
    
    const xlScreen=useMediaQuery(theme.breakpoints.only('xl'))
    const lgScreen=useMediaQuery(theme.breakpoints.only('lg'))
    const mdScreen=useMediaQuery(theme.breakpoints.only('md'))
    const smScreen=useMediaQuery(theme.breakpoints.only('sm'))
    const xsScreen=useMediaQuery(theme.breakpoints.only('xs'))
    let slides;
    if(xlScreen)
    {
        slides=13;
    }
    if(lgScreen)
    {
        slides=10;
    }
    if(mdScreen)
    {
        slides=8;
    }
    if(smScreen)
    {
        slides=5;
    }
    if(xsScreen)
    {
        slides=3;
    }
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={slides}
      style={{width:"100%", backgroundColor:"#f0f0f0", padding:"8px"}}
    >
      {symptoms.map((item,index)=>{
       return <SwiperSlide  key={index}
    
        style={{border:"1px solid black",
        color:"black", 
        borderRadius:"16px", 
        padding:"5px", textAlign:"center", cursor:"context-menu"}}>{item.name}</SwiperSlide>
      })}
    </Swiper>
  )
}
