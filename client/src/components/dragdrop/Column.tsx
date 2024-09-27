import './Column.css';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "./Task.tsx";

export const Column = ({tasks}: any) => {
    return (
        <div className="column">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task: any) => <Task id={task.id} name={task.name} key={task.id}/>)}
        </SortableContext>
        </div>
    )
}