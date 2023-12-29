export function getDate(value:string)
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