import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Student } from '../../models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { AddAttendanceComponent } from '../add-attendance/add-attendance.component';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { UserRoleService } from '../../../shared/services/auth/user-role.service';
import { RolesConstants } from '../../../shared/config/roles-constants';

@Component({
  selector: 'app-attendance-calender',
  templateUrl: './attendance-calender.component.html',
  styleUrls: ['./attendance-calender.component.scss']
})
export class AttendanceCalenderComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('fullCalendar') fullCalendar!: FullCalendarComponent;
  @Input() data!: Student
  calendarOptions!: CalendarOptions
  INITIAL_EVENTS!: any[];
  calendarVisible = false;

  ngAfterViewInit(): void {
    this.updateCalendarSize();
  }

  showCalendar() {
    this.calendarVisible = true;
    this.updateCalendarSize();
  }

  hideCalendar() {
    this.calendarVisible = false;
  }

  private updateCalendarSize() {
    if (this.calendarVisible && this.fullCalendar) {
      setTimeout(() => {
        this.fullCalendar.getApi().updateSize();
      }, 0);
    }
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private matDialog: MatDialog,
    private userRoleService: UserRoleService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setupCalendar()
  }

  setupInitialEvents(data: Student) {
    this.INITIAL_EVENTS = data.attendance?.map((event: any) => ({
      title: event.status,
      date: event.date.split('T')[0],
      extendedProps: {
        comment: event.comment,
      },
    }));
  }

  setupCalendar() {
    this.setupInitialEvents(this.data)

    this.calendarOptions = {
      firstDay: 1,
      initialView: 'dayGridMonth',
      selectable: true,
      initialEvents: this.INITIAL_EVENTS,
      weekends: true,
      editable: true,
      selectMirror: true,
      dayMaxEvents: true,
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      selectAllow: (selectInfo: any) => {
        const start = selectInfo.start;
        const end = selectInfo.end;
        return (end.getTime() - start.getTime()) === 86400000;
      },
      eventDidMount: function (info) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-text';
        tooltip.innerHTML = info.event.extendedProps?.['comment'];
        info.el.appendChild(tooltip);
      },
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
    };
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    const clickedDate = selectInfo.startStr;

    const eventDate = new Date(selectInfo.start);
    const today = new Date();

    const isToday =
      eventDate.getFullYear() === today.getFullYear() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getDate() === today.getDate();

    if(!this.userRoleService.isUserHasRoles(RolesConstants.ADD_ATTENDANCE_AND_COMMENT)){
      this.showSuccessMessage('You are not allowed to add attendance');
      return
    }

    if (!isToday ) {
      this.showSuccessMessage('You can only add attendance for today');
      return
    }

    const clickedDayData = this.INITIAL_EVENTS.filter(
      (attendance) => attendance.date.startsWith(clickedDate)
    );

    const dialog = this.matDialog.open(AddAttendanceComponent, {
      width: '400px',
      data: { ...clickedDayData[0], studentId: this.data._id }
    })

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        calendarApi.unselect();
        this.setupInitialEvents(result);

        calendarApi.removeAllEventSources();
        calendarApi.addEventSource(this.INITIAL_EVENTS);
        this.changeDetector.detectChanges();
      }
    })
  }

  handleEventClick(clickInfo: EventClickArg) {
    // delete event
    // if (confirm(`Are you sure you want to delete the Attendance?`)) {
    //   clickInfo.event.remove();
    // }
  }
}
