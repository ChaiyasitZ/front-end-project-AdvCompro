import React from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar.jsx';
import Container from '../components/Container.jsx';
import Loading from '../components/Loading.jsx';
import { Link, useParams } from 'react-router-dom';
import TodoItem from '../components/TodoItem.jsx';

export default function Category () {
    const [loading, setLoading] = React.useState(true);
    const [category, setCategory] = React.useState([]);

    const fetchCategory = async () => {
        try {
            /**
             * @type {import("axios").AxiosResponse<{ status: number, message: string, data: {}[] }>}
             */
            const { data } = await axios.get("http://node53450-todos.proen.app.ruk-com.cloud/category");
            if (data.status === 200) {
                setCategory(data.data);
                setLoading(false);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <>
            <Navbar />
            <Container>
                <div className="flex flex-col space-y-4">
                    <span className="text-xl font-bold text-gray-800">Todo App</span>

                    <form action="javascript:void()" onSubmit={async (e) => {
                        try {
                            /**
                             * @type {import("axios").AxiosResponse<{ status: number, message: string, data: {} }>}
                             */
                            const { data } = await axios.post("http://node53450-todos.proen.app.ruk-com.cloud/category", {
                                name: e.target.name.value
                            });
                            if (data.status === 200) {
                                setCategory(prev => [...prev, data.data]);
                            } else {
                                throw new Error("Something went wrong");
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    } className="flex flex-col space-y-2" >
                        <input type="text" placeholder="Name" name="name" className="w-full px-4 py-2 border rounded-md" />
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Add Category</button>
                    </form>

                    { loading ? <Loading /> : 
                        category.map(category => (
                            <Link to={`/category/${category.id}`} key={category.id} className="p-2 bg-purple-50 rounded shadow font-medium">
                                { category.name }
                            </Link>
                        ))
                    }
                </div>
            </Container>
        </>
    )
}

export function CategoryDetail () {
    const { id } = useParams();

    const [loading, setLoading] = React.useState(true);
    const [category, setCategory] = React.useState();
    const [todos, setTodos] = React.useState([]);

    const fetchTodos = async () => {
        try {
            /**
             * @type {import("axios").AxiosResponse<{ status: number, message: string, data: {}[] }>}
             */
            const { data } = await axios.get(`http://node53450-todos.proen.app.ruk-com.cloud/category/${id}`);
            if (data.status === 200) {
                setCategory(data.data.category.name);
                setTodos(data.data.todos);
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
            const { data } = await axios.post(`http://node53450-todos.proen.app.ruk-com.cloud/category/${id}`, {
                title,
                description
            });
            if (data.status === 200) {
                setTodos(prev => [data.data, ...prev]);
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
                    
                    { loading ? <Loading /> : (
                        <>
                            <span className="text-lg font-medium text-gray-700">Category : { category }</span>

                            <form action="javascript:void()" onSubmit={(e) => addTodo(e.target.title.value, e.target.description.value)} className="flex flex-col space-y-2" >
                                <input type="text" placeholder="Title" name="title" className="w-full px-4 py-2 border rounded-md" />
                                <input type="text" placeholder="Description" name="description" className="w-full px-4 py-2 border rounded-md" />
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Add Todo</button>
                            </form>

                            {/* delete category */}
                            <button className="px-4 py-2 text-white bg-red-500 rounded-md" onClick={async () => {
                                try {
                                    /**
                                     * @type {import("axios").AxiosResponse<{ status: number, message: string, data: {} }>}
                                     */
                                    const { data } = await axios.delete(`http://node53450-todos.proen.app.ruk-com.cloud/category/${id}`);
                                    if (data.status === 200) {
                                        window.location.href = "/category";
                                    } else {
                                        throw new Error("Something went wrong");
                                    }
                                } catch (err) {
                                    console.log(err);
                                }
                            }}>Delete Category</button>

                            { todos.length > 0 ? todos.map((item, index) => (
                                <TodoItem {...item} key={index} />
                            )) : (
                                <div className="p-2 bg-purple-50 rounded shadow font-medium">
                                    <span className="text-lg font-medium text-gray-700">No Todo</span>
                                </div>
                            ) }
                        </>
                    ) }
                </div>
            </Container>
        </>
    )
}