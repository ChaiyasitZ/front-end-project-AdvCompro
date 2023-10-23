import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import TodoItem from "../components/TodoItem";
import TaskItem from "../components/TaskItem";

export default function Todo () {
    const { id } = useParams();

    const [loading, setLoading] = React.useState(true);
    const [todo, setTodo] = React.useState();

    const fetchTodo = async () => {
        try {
            /**
             * @type {import("axios").AxiosResponse<{ status: number, message: string, data: {} }>}
             */
            const { data } = await axios.get(`https://todos.proen.app.ruk-com.cloud/api/todos/${id}`);
            if (data.status === 200) {
                setTodo(data.data);
                setLoading(false);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteTodo = async () => {
        try {
            /**
             * @type {import("axios").AxiosResponse<{ status: number, message: string, data: {} }>}
             */
            const { data } = await axios.delete(`https://todos.proen.app.ruk-com.cloud/api/todos/${id}`);
            if (data.status === 200) {
                window.location.href = "/";
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const editTodo = async (title, description) => {
        try {
            /**
             * @type {import("axios").AxiosResponse<{ status: number, message: string, data: {} }>}
             */
            const { data } = await axios.put(`https://todos.proen.app.ruk-com.cloud/api/todos/${id}`, {
                title,
                description
            });
            if (data.status === 200) {
                setTodo(data.data);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addTask = async (title) => {
        try {
            /**
             * @type {import("axios").AxiosResponse<{ status: number, message: string, data: {} }>}
             */
            const { data } = await axios.post(`https://todos.proen.app.ruk-com.cloud/api/todos/${id}/tasks`, {
                title
            });
            if (data.status === 200) {
                setTodo(prev => ({
                    ...prev,
                    tasks: [data.data, ...prev.tasks]
                }));
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        fetchTodo();
    }, []);

    return (
        <>
            <Navbar />
            <Container>
                <div className="flex flex-col space-y-4">
                    <span className="text-xl font-bold text-gray-800">Todo App</span>

                    { loading ? <Loading /> : todo && (
                        <>
                            <TodoItem {...todo} />

                            <div className="flex flex-col space-y-2">
                                <form action="javascript:void()" onSubmit={(e) => {
                                    editTodo(
                                        e.target.title.value,
                                        e.target.description.value
                                    );
                                }} className="flex flex-col gap-2">
                                    <input type="text" placeholder="Title" name="title" className="w-full px-4 py-2 border rounded-md" defaultValue={todo.title} />
                                    <input type="text" placeholder="Description" name="description" className="w-full px-4 py-2 border rounded-md" defaultValue={todo.description} />
                                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Edit Todo</button>
                                </form>
                                <button onClick={() => deleteTodo()} className="p-2 bg-red-500 rounded-md text-sm text-gray-100">Delete</button>
                            </div>

                            <form action="javascript:void()" className="flex flex-row space-x-2" onSubmit={e => addTask(e.target.task.value)}>
                                <input type="text" name="task" placeholder="Task" className="flex-grow px-4 py-2 border rounded-md" />
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Add Task</button>
                            </form>

                            { todo.tasks.length > 0 ? todo.tasks.map((item, index) => (
                                <TaskItem key={index} {...item} />
                            )) : (
                                <div className="p-2 bg-purple-50 rounded shadow font-medium">
                                    <span className="text-lg font-medium text-gray-700">No Task</span>
                                </div>
                            ) }
                        </>
                    ) }
                </div>
            </Container>
        </>
    )
}