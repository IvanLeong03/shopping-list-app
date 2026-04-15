import { useState } from "react";
import { ShoppingItem } from "src/shared/types";

type SortCol = 'name' | 'category' | 'price' | 'priority' | 'createdAt' | null
type SortDir = 'asc' | 'desc'

const PRIORITY_RANK = { High: 3, Medium: 2, Low: 1 }

interface ItemTableProps {
    items: ShoppingItem[],
    onEdit: (item: ShoppingItem) => void;
}

// Small helper component for the Priority Badge
const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-yellow-100 text-amber-700',
    Low: 'bg-blue-100 text-blue-700'
  }
  
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors[priority] || 'bg-gray-100'}`}>
      {priority}
    </span>
  )
}

const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

export const ItemTable = ({ items, onEdit } : ItemTableProps) => {
    const [sortCol, setSortCol] = useState<SortCol>(null)
    const [sortDir, setSortDir] = useState<SortDir>('asc')

    const handleSort = (col: SortCol) => {
        if (sortCol !== col) {
            setSortCol(col)
            setSortDir('asc')
        } else if (sortDir === 'asc') {
            setSortDir('desc')
        } else {
            setSortCol(null)
        }
    }

    const sortedItems = [...items].sort((a, b) => {
        if (!sortCol) return b.createdAt - a.createdAt
        let cmp = 0
        if (sortCol === 'name')      cmp = a.name.localeCompare(b.name)
        if (sortCol === 'category')  cmp = a.category.localeCompare(b.category)
        if (sortCol === 'price')     cmp = a.price - b.price
        if (sortCol === 'priority')  cmp = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
        if (sortCol === 'createdAt') cmp = a.createdAt - b.createdAt
        return sortDir === 'asc' ? cmp : -cmp
    })

    const indicator = (col: SortCol) => {
        if (sortCol !== col) return null
        return sortDir === 'asc' ? ' ↑' : ' ↓'
    }

    return (
        <div className="flex-1 overflow-auto bg-[#fdfcf0] p-8">
            <div className="
            grid grid-cols-6 pb-4 border-b border-[#31572c]/10
            text-xs font-bold uppercase tracking-widest text-[#31572c]/50
            ">
                <button className="col-span-2 text-left hover:text-[#31572c]/80" onClick={() => handleSort('name')}>Item Name{indicator('name')}</button>
                <button className="col-span-1 text-left hover:text-[#31572c]/80" onClick={() => handleSort('category')}>Category{indicator('category')}</button>
                <button className="col-span-1 text-left hover:text-[#31572c]/80" onClick={() => handleSort('price')}>Price{indicator('price')}</button>
                <button className="col-span-1 text-left hover:text-[#31572c]/80" onClick={() => handleSort('priority')}>Priority{indicator('priority')}</button>
                <button className="col-span-1 text-left hover:text-[#31572c]/80" onClick={() => handleSort('createdAt')}>Date Added{indicator('createdAt')}</button>
            </div>

            <div className="flex flex-col">
                {sortedItems.map((item) => (
                    <div
                    key={item.id}
                    className="grid grid-cols-6 py-4 border-b border-[#31572c]/5
                    items-center hover:bg-[#ecf39e]/10 transition-colors group">
                        <div className="col-span-2 mr-2 font-medium text-[#31572c]/70 text-left">
                            <button
                            onClick={() => onEdit(item)}
                            className="text-left hover:underline"
                            >
                                {item.name}
                            </button>                           
                        </div>
                        <div className="col-span-1 text-sm text-[#31572c]/70 text-left">
                            {item.category}
                        </div>
                        <div className="col-span-1 text-sm font-mono text-[#31572c]/70 text-left">
                            {item.price.toLocaleString()} {item.currency}
                        </div>
                        <div className="col-span-1 text-left">
                            <PriorityBadge priority={item.priority}/>
                        </div>
                        <div className="col-span-1 text-sm text-[#31572c]/70 text-left">
                            {formatDate(item.createdAt)}
                        </div>

                        {/*
                        <div className="flex justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEdit(item)}
                                className="text-xs font-bold text-[#31572c]/40 hover:text-[#31572c]"
                            >
                                Edit
                            </button>
                        </div>
                        */}
                    </div>
                ))}
            </div>

        </div>
    )

}