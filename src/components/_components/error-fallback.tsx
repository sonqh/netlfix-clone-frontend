import { FallbackProps } from 'react-error-boundary'

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role='alert' className='p-4 bg-red-100 text-red-700'>
      <h2 className='text-lg font-bold'>Something went wrong:</h2>
      <pre className='whitespace-pre-wrap my-2'>{error.message}</pre>
      <button onClick={resetErrorBoundary} className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>
        Try Again
      </button>
    </div>
  )
}
