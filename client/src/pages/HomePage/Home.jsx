import React from 'react'
import DefultButton from '../../components/Buttons/DefultButton'
import DefultInput from '../../components/Form/DefultInput'
import Dropdown from '../../components/Form/Dropdown'
import FileInput from '../../components/Form/FileInput'
import TextAreaInput from '../../components/Form/TextAreaInput'


const Home = () => {
    return (
        <div className='p-16'>
            <h1 className="text-red-500 font-semibold text-xl">asdasds</h1>
            <DefultInput
                label={"Enter Number"}
                type='number'
            />

            <TextAreaInput
                label={"Enter Number"}
            />

            <Dropdown
                label="Faculty"
                name="faculty"
                options={[
                    { value: "", label: "Select Faculty" },
                    { value: "arts", label: "Faculty of Arts" },
                    { value: "science", label: "Faculty of Science" },
                    { value: "eng", label: "Faculty of Engineering" },
                ]}
            />

            <FileInput
                label="Upload Transcript"
            />

            <DefultButton />
        </div>
    )
}

export default Home