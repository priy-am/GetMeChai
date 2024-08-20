import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col gap-6 justify-center items-center pt-36 '>
      <h2 className='text-center text-5xl font-bold'>Not Found</h2>
      <p className='text-center'>Could not find requested resource</p>
      <Link href="/" className='text-blue-500 text-center '>Return Home</Link>
    </div>
  )
}