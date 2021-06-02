import React, { useState } from 'react'
import AddPlayer from './AddPlayer';
import './index.css'

const Player = (props) => {
    const { 
        firstName, 
        lastName, 
        type, 
        topScore, 
        team, 
        _id,
        deletePlayer,
        editPlayer
    } = props;

    const [editToggle, setEditToggle] = useState(false);

    return (
        <div className="playerCard">
            { 
                !editToggle ?
                <>
                    <h3>{firstName} {lastName}</h3>
                    <h4>Active: {type ? "Yes" : "No"}</h4>
                    <h4>Salary: {topScore}</h4>
                    <h4>Team: {team}</h4>
                    <button className='deleteB' onClick={() => deletePlayer(_id)}>Remove</button>
                    <button className='editB' onClick={() => setEditToggle(prevEditToggle => !prevEditToggle)}>Edit</button>
                </>
                :
                <>
                    <AddPlayer
                        toggle={setEditToggle} submit={editPlayer} {...props}buttonText="Submit"/> 
                
                    <button className='cancelEditB' onClick={() => setEditToggle(prevEditToggle => !prevEditToggle)}>Cancel</button>
                </>
            }
        </div>
    )
}
export default Player