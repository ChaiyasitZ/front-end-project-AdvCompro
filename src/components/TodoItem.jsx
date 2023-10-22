import { Link } from "react-router-dom";

/**
 * 
 * @param {{
 *  id: number,
 *  title: string,
 *  description: string,
 *  category: { id: number, name: string }[],
 *  completed: boolean,
 * }} props 
 * @returns 
 */
export default function TodoItem (props) {
    return (
        <div className={"flex flex-col space-y-2 p-2 rounded-md " + (props.completed ? "bg-green-300" : "bg-slate-500 text-gray-100")}>
            <Link className="text-lg font-bold hover:text-blue-300" to={`/todo/${props.id}`}>{props.title}</Link>
            <span className="text-sm">{props.description}</span>
            <div className="flex flex-row space-x-2">
                { props.category && (props.category.length > 0) && props.category.map((category, index) => {
                    return (
                        <Link key={index} to={`/category/${category.id}`} className="p-1 bg-gray-200 rounded-md text-sm text-gray-800">{category.name}</Link>
                    )
                })}
            </div>
        </div>
    );
}