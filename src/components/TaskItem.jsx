import React from 'react';
import axios from 'axios';

export default function TaskItem (props) {
    const [done, setDone] = React.useState(props.isCompleted);

    const checkTask = async () => {
        try {
            const { data } = await axios.patch(`https://todos.proen.app.ruk-com.cloud/api/todos/${props.todoListId}/tasks/${props.id}`)

            if (data.status === 200) {
                setDone(data.data.isCompleted);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={"flex items-center space-x-2 w-full"}>
            <input type="checkbox" checked={done} onChange={checkTask} />
            <span className="text-gray-800">{props.name}</span>
        </div>
    )
}