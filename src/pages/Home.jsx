import React from "react";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import axios from "axios";
import TodoItem from "../components/TodoItem";

export default function Home () {
    const [loading, setLoading] = React.useState(true);
    const [todos, setTodos] = React.useState([]);

    const fetchTodos = async () => {
        try {
            /**
             * @type {import("axios").AxiosResponse<{ status: number, message: string, data: {}[] }>}
             */
            const { data } = await axios.get("https://todos.proen.app.ruk-com.cloud/api/todos");
            if (data.status === 200) {
                setTodos(data.data);
                setLoading(false);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addTodo = async (title, description) => {
        try {
            /**
             * @type {import("axios").AxiosResponse<{ status: number, message: string, data: {} }>}
             */
            const { data } = await axios.post("https://todos.proen.app.ruk-com.cloud/api/todos", {
                title,
                description
            });
            if (data.status === 200) {
                setTodos(prev => [...prev, data.data]);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <>
            <Navbar />
            <Container>
                <div className="flex flex-col space-y-4">
                    <span className="text-xl font-bold text-gray-800">Todo App</span>

                    <form action="javascript:void()" onSubmit={(e) => addTodo(e.target.title.value, e.target.description.value)} className="flex flex-col space-y-2" >
                        <input type="text" placeholder="Title" name="title" className="w-full px-4 py-2 border rounded-md" />
                        <input type="text" placeholder="Description" name="description" className="w-full px-4 py-2 border rounded-md" />
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Add Todo</button>
                    </form>

                    { !loading ? todos.map((item, index) => (
                        <TodoItem key={index} {...item} />
                    )) : <Loading /> }
                </div>
            </Container>
        </>
    )
}