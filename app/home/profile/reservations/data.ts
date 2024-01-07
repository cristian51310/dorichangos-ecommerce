export const reservations = [
  {
    id: "1",
    date: new Date("2024-01-04"),
    hours: [
      {
        id: "1",
        hour: "18:30:00",
        available: 2,
        reserved: 3
      },
      {
        id: "2",
        hour: "19:00:00",
        available: 1,
        reserved: 4
      }
    ]
  },
  {
    id: "2",
    date: new Date("2024-01-05"),
    hours: [
      {
        id: "3",
        hour: "19:30:00",
        available: 2,
        reserved: 3
      },
      {
        id: "4",
        hour: "20:00:00",
        available: 5,
        reserved: 0
      }
    ]
  },
  {
    id: "3",
    date: new Date("2024-01-06"),
    hours: [
      {
        id: "5",
        hour: "19:30:00",
        available: 2,
        reserved: 3
      }
    ]
  }
];
