export function getDate(value:Date|string)
{
   const date= new Date(value);
   const year = date.getFullYear();
   const day=(`0${date.getDate()}`).slice(-2);
   const month=(`0${date.getMonth()+1}`).slice(-2);
 console.log(month)
 return   `${year}-${month}-${day}`

}
export function getDateWithoutDate(value:string)
{
   const date= new Date(value);
   const year = date.getFullYear();
   const month=(`0${date.getMonth()+1}`).slice(-2);
 console.log(month)
 return   `${year}-${month}`

}
export const getUserName=(role:string,name:string)=>{
  const fullName=name.split(" ")
  console.log(fullName)
  let first="";
  let last=""
  if(fullName.length>1){
 for(let i=0; i<fullName.slice(0,-1).length; i++){
  first+=`${fullName.slice(0,-1)[i]} `
 }
  last=fullName.slice(-1)[0]
  return {
    first,last
  }
 }
 else{
  first=name
  return first
 }

}