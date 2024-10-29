import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='w-full h-full'>
      <SignIn afterSignOutUrl={'/'} appearance={{
              elements: {
                formButtonPrimary: 'bg-primary-600 hover:bg-primary-500 text-sm py-3 rounded-xl border-1 border-primary-500',
                rootBox:'w-full h-full ',
                cardBox:'w-full h-full border-0 rounded-none shadow-none flex justify-center',
                card:'border-0 rounded-none shadow-none p-clamp-sm',
                // footer:'hidden'
              },
              layout: {
                socialButtonsPlacement: 'top',
                socialButtonsVariant: 'blockButton',
                termsPageUrl: '/terms-and-condition'
              },
            }} />

    </div>
)
}