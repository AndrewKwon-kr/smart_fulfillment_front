import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import swal from 'sweetalert';

const events = [
  {
    id: 1,
    title: '[2+1] 본품 2개 구매시 1개 증정',
    start: '2021-08-14T10:00:00',
    end: '2021-08-20T12:00:00',
    color: '#18A558',
  },
  {
    id: 2,
    title: '속싸개 2개 구매시 파우치 증정 행사',
    start: '2021-08-17T13:00:00',
    end: '2021-08-18T18:00:00',
    color: '#821D30',
  },
  {
    id: 3,
    title: '[사은품 1+1] 수유등',
    start: '2021-08-01',
    end: '2021-08-03',
    color: '#145DA0',
  },
];

function PeriodView(props) {
  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        // customButtons={{
        //   new: {
        //     text: 'new',

        //     click: () => console.log('new event'),
        //   },
        // }}
        events={events}
        eventColor="#189AB4"
        nowIndicator
        // dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => swal(e.event.title)}
        locale={koLocale}
      />
    </div>
  );
}

export default PeriodView;
