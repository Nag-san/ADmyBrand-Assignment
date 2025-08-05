"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface Widget {
  id: string;
  content: React.ReactNode;
}

interface Props {
  widgets: Widget[];
}

function DraggableCard({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative bg-glass border border-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl overflow-visible min-w-0 min-h-0"
    >
      <div className="flex justify-end gap-1 absolute top-2 right-2 z-10">
        <Button
          size="icon"
          variant="destructive"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <X size={14} />
        </Button>
      </div>
      <div className="min-w-0 min-h-0">{children}</div>
    </motion.div>
  );
}

export function SortableDashboard({ widgets }: Props) {
  const defaultOrder = widgets.map((w) => w.id);
  const [items, setItems] = useState<string[]>(defaultOrder);
  const [hidden, setHidden] = useState<string[]>([]);

  useEffect(() => {
    const storedOrder = localStorage.getItem("dashboard-order");
    const storedHidden = localStorage.getItem("dashboard-hidden");

    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder).filter((id: string) =>
        defaultOrder.includes(id)
      );
      setItems(parsedOrder.length > 0 ? parsedOrder : defaultOrder);
    }

    if (storedHidden) {
      const parsedHidden = JSON.parse(storedHidden).filter((id: string) =>
        defaultOrder.includes(id)
      );
      setHidden(parsedHidden);
    }
  }, [widgets]);

  useEffect(() => {
    localStorage.setItem("dashboard-order", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("dashboard-hidden", JSON.stringify(hidden));
  }, [hidden]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const itemMap = widgets.reduce((acc, w) => {
    acc[w.id] = w.content;
    return acc;
  }, {} as Record<string, React.ReactNode>);

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
            {items
              .filter((id) => !hidden.includes(id))
              .map((id) => (
                <DraggableCard key={id} id={id}>
                  {itemMap[id]}
                </DraggableCard>
              ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
