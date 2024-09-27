import { useState } from "react";
import {DndContext, useDraggable, useDroppable, rectIntersection, pointerWithin} from '@dnd-kit/core';
import { Column } from "./dragdrop/Column.tsx";

interface DroppableProps {
    id: any;
    children: any;
    className?: any;
}

function Droppable(props: DroppableProps) {
    const { setNodeRef } = useDroppable( props.id );
  
    return (
      <div ref={setNodeRef} className="task-slot">
        {props.children}
      </div>
    );
  }

export default function HomePlanner() {

    // This feature may have to be removed in the interest of saving time. Currently, either the drag is clunky and releases too soon OR it fails to drop the object.

    const [start, setStart] = useState(8);
    const [end, setEnd] = useState(18);

    const timeSlots: any = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const [slotTasks, setSlotTasks] = useState(
      timeSlots.map(() => null)
    );
  

    const [tasks, setTasks] = useState([
        {id: 1, name: "Work on app"},
        {id: 2, name: "Write"},
    ])

    const handleDragEnd = (event: any) => {
        const {active, over} = event
        if (!over) return;

        const activeTaskId: any = parseInt(active.id, 10);
        const targetSlotId: any = over.id;
        const slotIndex: any = parseInt(targetSlotId.replace("slot-", ""), 10);
        
        setSlotTasks((prevSlotTasks: any) => {
            const updatedSlotTasks = [...prevSlotTasks];
            const draggedTask = tasks.find((task) => task.id === activeTaskId);
            updatedSlotTasks[slotIndex] = draggedTask; 
            return updatedSlotTasks;
      });
    };

    return (
        <div className="plan-container">
            <DndContext onDragEnd={handleDragEnd} collisionDetection={rectIntersection}>
                <div className="day-plan">
                    {timeSlots.map((time: any, index: any) => 
                        <div className="plan-row" key={index}>
                            <div className="time-slot" key={time}>{time}:00</div>
                            <Droppable className="task-slot" id={`slot-${index}`}>
                            {slotTasks[index] ? (<div className="task">{slotTasks[index].name}</div>) : null}
                            </Droppable>
                        </div>
                    )}
                </div>
                <Column tasks={tasks} />
            </DndContext>
        </div>
    )
}
