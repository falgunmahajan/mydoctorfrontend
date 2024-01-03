
import { Swiper, SwiperSlide } from 'swiper/react';
import symptoms from "../symptoms.json"
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
export default function SymptonsMenu() {
    const theme=useTheme();
    const [isHover,setIsHover]=useState<number|null>(null)
    
    const xlScreen=useMediaQuery(theme.breakpoints.only('xl'))
    const lgScreen=useMediaQuery(theme.breakpoints.only('lg'))
    const mdScreen=useMediaQuery(theme.breakpoints.only('md'))
    const smScreen=useMediaQuery(theme.breakpoints.only('sm'))
    const xsScreen=useMediaQuery(theme.breakpoints.only('xs'))
    let slides;
    if(xlScreen)
    {
        slides=15;
    }
    if(lgScreen)
    {
        slides=13;
    }
    if(mdScreen)
    {
        slides=10;
    }
    if(smScreen)
    {
        slides=8;
    }
    if(xsScreen)
    {
        slides=3;
    }
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={slides}
      style={{width:"100%", backgroundColor:"#f0f0f0", padding:"10px"}}
    >
      {symptoms.map((item,index)=>{
       return <SwiperSlide  key={index}
onMouseEnter={()=>setIsHover(index)}
onMouseLeave={()=>setIsHover(null)}
        style={{border:"1px solid black",
        color:"black", 
        borderRadius:"16px", 
        borderColor:isHover===index ? "silver":"black",
        backgroundColor:isHover===index ? "silver":"",
        padding:"1px", textAlign:"center",fontSize:"14px", cursor:"context-menu"}}>{item.name}</SwiperSlide>
      })}
    </Swiper>
  )
}
