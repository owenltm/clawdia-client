export const BoxArraySkeleton = () => {
  return (
    <div className="flex gap-4">
      {Array.from({ length: 8 }).map((_, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex flex-col justify-between items-left rounded-lg py-2 px-4 shadow-sm border w-48 min-h-28 bg-gray-700 border-gray-500 animate-pulse">

            </div>
          ))}
        </div>
      ))}
    </div>
  )
}