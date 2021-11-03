import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import swal from 'sweetalert';
import styled from 'styled-components';

function PeriodView(props) {
  const [eventData, setEventData] = useState([]);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  console.log(eventData);
  useEffect(() => {
    setEventData(
      props.eventData.map((data) => {
        return {
          ...data,
          start: data.startDate.substring(0, 10),
          end: data.endDate ? data.endDate.substring(0, 10) : '',
          color: getRandomColor(),
          // textColor: getRandomColor(),
        };
      })
    );
  }, [props.eventData]);

  return (
    <CalenderWrapper>
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
        events={eventData}
        nowIndicator
        // dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => swal(e.event.title)}
        locale={koLocale}
      />
    </CalenderWrapper>
  );
}

const CalenderWrapper = styled.div`
  width: 65vw;
`;

export default PeriodView;
