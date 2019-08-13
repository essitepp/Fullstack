import React from "react";

const Person = ({ name, number, handleDelete })  => {
    return (
        <div>
        {name} {number}
        <button onClick={handleDelete}>delete</button>
        </div>
    )
}

export default Person