import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import swal from 'sweetalert';
// import { FrappeGantt, Task, ViewMode } from 'frappe-gantt-react';

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
// const tasks = [
//   {
//     id: 'Task 1',
//     name: '[2+1] 본품 2개 구매시 1개 증정',
//     start: '2021-08-14',
//     end: '2021-08-20',
//     progress: 10,
//     dependencies: '',
//   },
//   {
//     id: 'Task 2',
//     name: '속싸개 2개 구매시 파우치 증정 행사',
//     start: '2021-08-17',
//     end: '2021-08-18',
//     progress: 20,
//     dependencies: '',
//   },
//   {
//     id: 'Task 3',
//     name: '[사은품 1+1] 수유등',
//     start: '2021-08-01',
//     end: '2021-08-03',
//     progress: 0,
//     dependencies: '',
//   },
// ].map((x) => new Task(x));
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
        events={eventData}
        nowIndicator
        // dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => swal(e.event.title)}
        locale={koLocale}
      />
      {/* <FrappeGantt
        onClick={(task) => console.log(task)}
        onDateChange={(task, start, end) => console.log(task, start, end)}
        onProgressChange={(task, progress) => console.log(task, progress)}
        onTasksChange={(tasks) => console.log(tasks)}
        tasks={tasks}
        viewMode={ViewMode.Month}
      /> */}
    </div>
  );
}

export default PeriodView;
