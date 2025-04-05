interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className={`text-sm font-medium ${currentStep >= index + 1 ? "text-purple-600" : "text-gray-400"}`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

