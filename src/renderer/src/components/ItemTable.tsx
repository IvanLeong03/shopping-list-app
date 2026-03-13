import { ShoppingItem } from "src/shared/types";

interface ItemTableProps {
    items: ShoppingItem[],
    onEdit: (item: ShoppingItem) => void;
}

// Small helper component for the Priority Badge
const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors = {
    High: ' text-red-700',
    Medium: 'bg-orange-100 text-orange-700',
    Low: 'bg-blue-100 text-blue-700'
  }
  
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors[priority] || 'bg-gray-100'}`}>
      {priority}
    </span>
  )
}

export const ItemTable = ({ items, onEdit } : ItemTableProps) => {
    return (
        <div className="flex-1 overflow-auto bg-[#fdfcf0] p-8">
            <div className="
            grid grid-cols-10 pb-4 border-b border-[#31572c]/10
            text-xs font-bold uppercase tracking-widest text-[#31572c]/50
            ">
                <div className="col-span-4 text-left ">Item Name</div>
                <div className="col-span-2 text-left ">Category</div>
                <div className="col-span-2 text-left ">Price</div>
                <div className="col-span-1 text-left ">Priority</div>
            </div>

            <div className="flex flex-col">
                {items.map((item) => (
                    <div
                    key={item.id} 
                    className="grid grid-cols-10 py-4 border-b border-[#31572c]/5
                    items-center hover:bg-[#ecf39e]/10 transition-colors group">
                        <div className="col-span-4 font-medium text-[#31572c]/70 text-left line-clamp-1 overflow-hidden">
                            {item.name}
                        </div>
                        <div className="col-span-2 text-sm text-[#31572c]/70 text-left">
                            {item.category}
                        </div>
                        <div className="col-span-2 text-sm font-mono text-[#31572c]/70 text-left">
                            {item.price.toLocaleString()} {item.currency} 
                        </div>
                        <div className="col-span-1 text-left">
                            <PriorityBadge priority={item.priority}/>
                        </div>

                        <div className="flex justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEdit(item)}
                                className="text-xs font-bold text-[#31572c]/40 hover:text-[#31572c]"
                            >
                                Edit                                
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )

}