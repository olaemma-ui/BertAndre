"use client"

import * as React from "react"
import { format, addMinutes, startOfDay, addHours, isSameDay } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DateTimePickerProps {
    date?: Date
    setDate: (date: Date) => void
    interval?: 30 | 60
}

export function DateTimePicker({ date, setDate, interval = 30 }: DateTimePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    const timeSlots = React.useMemo(() => {
        const slots = []
        let current = startOfDay(new Date())
        current = addHours(current, 8) // Start at 8 AM

        const end = addHours(startOfDay(new Date()), 20) // End at 8 PM

        while (current <= end) {
            slots.push(format(current, "HH:mm"))
            current = addMinutes(current, interval)
        }
        return slots
    }, [interval])

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const newDate = date ? new Date(date) : new Date()
            newDate.setFullYear(selectedDate.getFullYear())
            newDate.setMonth(selectedDate.getMonth())
            newDate.setDate(selectedDate.getDate())
            setDate(newDate)
        }
    }

    const handleTimeSelect = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number)
        const newDate = date ? new Date(date) : new Date()
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        newDate.setSeconds(0)
        newDate.setMilliseconds(0)
        setDate(newDate)
    }

    return (
        <div className="flex flex-col gap-4">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal py-6 rounded-xl border-gray-200",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#1560bd]" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                        disabled={(date) => date < startOfDay(new Date())}
                    />
                </PopoverContent>
            </Popover>

            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#fa8128]" />
                    Available Time Slots ({interval} min)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-[200px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-gray-200">
                    {timeSlots.map((time) => {
                        const isSelected = date && format(date, "HH:mm") === time
                        return (
                            <button
                                key={time}
                                type="button"
                                onClick={() => handleTimeSelect(time)}
                                className={cn(
                                    "px-2 py-2 text-xs rounded-lg border transition-all",
                                    isSelected
                                        ? "bg-[#1560bd] text-white border-[#1560bd] font-bold shadow-md scale-105"
                                        : "bg-white text-gray-600 border-gray-100 hover:border-[#fa8128] hover:text-[#fa8128]"
                                )}
                            >
                                {time}
                            </button>
                        )
                    })}
                </div>
            </div>

            {date && (
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-sm text-[#1560bd] font-medium animate-in fade-in slide-in-from-top-1">
                    Selected: {format(date, "PPPP 'at' HH:mm")}
                </div>
            )}
        </div>
    )
}
