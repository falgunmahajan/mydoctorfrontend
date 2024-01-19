import moment from "moment";

export type appointmentTypes = {
    Id: string;
    patientId: string;
    doctorId: string;
    slotId: string;
    appointmentStatus: "notStarted";
    otherName: null | string;
    otherMobileNumber: null | string;
    patient?: {
      Id: string;
      user: {
        firstName: string;
        lastName: string;
      };
    };
    doctor?: {
        Id: string;
        user: {
          firstName: string;
          lastName: string;
        };
      };
    slot: {
      Id: string;
      startTime: string;
      endTime: string;
    };
  };
  export const getSlotTime = (slot: {
    Id: string;
    startTime: string;
    endTime: string;
  }) => {
    const start = moment(slot.startTime).format("hh:mm a");
    const end = moment(slot.endTime).format("hh:mm a");
    return `${start}-${end}`;
  };