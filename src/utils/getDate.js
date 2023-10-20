export function getDateWithoutDate(value)
{
   const date= new Date(value);
   const year = date.getFullYear();
   const month=(`0${date.getMonth()+1}`).slice(-2);
 console.log(month)
 return   `${year}-${month}`

}