export default function PageWrap({ children }: React.PropsWithChildren) {
  return (
    <div className='content-wrapper'>
      <div className='content p-3 md:p-9'>
        <div className='flex justify-center'>
          <div className='max-w-2xl py-10 text-neutral-800'>{children}</div>
        </div>
      </div>
    </div>
  )
}
