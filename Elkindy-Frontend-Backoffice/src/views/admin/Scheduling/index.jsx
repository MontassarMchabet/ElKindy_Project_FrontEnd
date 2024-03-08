import React from 'react';
import ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
import dataSource from './datasource.json';

/**
 *  Schedule editor validation sample
 */
export default class EditorFieldValidation extends SampleBase {
    scheduleObj;
    data = extend([], dataSource.scheduleData, null, true);
    fields = {
        subject: { name: 'Subject', validation: { required: true } },
        location: {
            name: 'Location', validation: {
                required: true,
                regex: ['^[a-zA-Z0-9- ]*$', 'Special characters are not allowed in this field']
            }
        },
        description: {
            name: 'Description', validation: {
                required: true, minLength: 5, maxLength: 500
            }
        },
        startTime: { name: 'StartTime', validation: { required: true } },
        endTime: { name: 'EndTime', validation: { required: true } }
    };
    onEventRendered(args) {
        applyCategoryColor(args, this.scheduleObj.currentView);
    }
    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent
                            width='100%'
                            height='550px'
                            selectedDate={new Date(2021, 0, 10)}
                            ref={t => this.scheduleObj = t}
                            eventSettings={{ dataSource: this.data, fields: this.fields }}
                            eventRendered={this.onEventRendered.bind(this)}
                        >
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                    </div>
                </div>
            </div>
        );
    }
}

// Ensure that the container element exists before rendering
const container = document.getElementById('sample');
if (container) {
    ReactDOM.render(<EditorFieldValidation />, container);
} else {
    console.error("Target container '#sample' is not found in the DOM.");
}
