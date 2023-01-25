export const DEFAULT_AVAILABILTY = {
  name: "Working Hours",
  isDefault: true,
  timezone: "Asia/Dhaka",
  dateOverrides: [],
  weekdays: [
    {
      isAvailable: false,
      day: "sunday",
      timeSlots: [],
    },
    {
      isAvailable: true,
      day: "monday",
      timeSlots: [
        {
          from: "09:00am",
          to: "05:00pm",
        },
      ],
    },
    {
      isAvailable: true,
      day: "tuesday",
      timeSlots: [
        {
          from: "09:00am",
          to: "05:00pm",
        },
      ],
    },
    {
      isAvailable: true,
      day: "wednesday",
      timeSlots: [
        {
          from: "09:00am",
          to: "05:00pm",
        },
      ],
    },
    {
      isAvailable: true,
      day: "thursday",
      timeSlots: [
        {
          from: "09:00am",
          to: "05:00pm",
        },
      ],
    },
    {
      isAvailable: true,
      day: "friday",
      timeSlots: [
        {
          from: "09:00am",
          to: "05:00pm",
        },
      ],
    },
    {
      isAvailable: false,
      day: "saturday",
      timeSlots: [],
    },
  ],
};
