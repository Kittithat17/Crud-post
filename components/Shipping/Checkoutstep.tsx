import { cn } from "@/lib/utils"

const checkoutstep =['Users', 'Shipping address', 'Payment method', 'Place order']
const Checkoutstep = ({current = 0} : {current: number}) => {
  return (
    <div className="flex ">
    {checkoutstep.map((step, index) => (
        <div key={step} className="flex  w-full items-center">
            <div className={cn('p-3 w-56 rounded-full text-center text-sm bg-gray-200 font-medium',
                index === current && 'bg-black text-white font-medium'
            )}>
                {step}
            </div>
            {
                index < checkoutstep.length - 1 &&
                (
                    <div className="hidden md:flex flex-1 justify-center w-full">
                        <hr className="w-[110] border-t-2 border-gray-300" />
                    </div>
                )
            }
        </div>
    ))}
</div>
  )
}
export default Checkoutstep