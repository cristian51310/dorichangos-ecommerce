"use client"

import dayjs from 'dayjs';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';

import '@/app/calendar.css'
import 'dayjs/locale/es';

dayjs.locale('es');

export default function CalendarAdmin() {
  const localizer = dayjsLocalizer(dayjs);

  const events = [
    {
      title: 'Evento 1',
      start: dayjs("2023-12-18T12:00:00").toDate(),
      end: dayjs("2023-12-18T13:00:00").toDate(),
    },
    {
      title: 'Evento 2',
      start: dayjs("2023-12-26T12:00:00").toDate(),
      end: dayjs("2023-12-26T13:00:00").toDate(),
    },
    // Agrega más eventos según sea necesario
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        views={['month', 'day', "agenda"]}
        defaultView='month'
        style={{ height: 500 }}
        min={dayjs("2023-12-01T16:00:00").toDate()}
        max={dayjs("2024-12-18T23:59:00").toDate()}
      />
    </div>
  )
}