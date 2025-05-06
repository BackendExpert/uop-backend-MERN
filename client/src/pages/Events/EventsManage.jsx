import React from 'react'
import PageUpperContent from '../../components/DashPages/PageUpperContent'
import { BsCalendar3EventFill } from 'react-icons/bs'
import DefultButton from '../../components/Buttons/DefultButton'

const EventsManage = () => {
    return (
        <div>
            <PageUpperContent title={"Events Management"} icon={BsCalendar3EventFill} />

            <a href="/Dashboard/CreateEvent">
                <DefultButton
                    btntype={'button'}
                    text='Create Event'
                />
            </a>


        </div>
    )
}

export default EventsManage