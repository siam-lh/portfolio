type NoItemsFoundProps = {
  itemName: string
}

export default function NoItemsFound({ itemName }: NoItemsFoundProps) {
  return (
    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-white bg-white/5 p-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white">No {itemName} found</h2>

        <p className="mt-2 text-sm text-gray-400">
          There are currently no {itemName.toLowerCase()} available.
        </p>
      </div>
    </div>
  )
}
