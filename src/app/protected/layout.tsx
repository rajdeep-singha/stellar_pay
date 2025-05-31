// 'use client'
// import { SessionContextProvider } from '@supabase/auth-helpers-react'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { useState } from 'react'

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const [supabaseClient] = useState(() => createClientComponentClient())

//   return (
//     <html lang="en">
//       <body>
//         <SessionContextProvider supabaseClient={supabaseClient}>
//           {children}
//         </SessionContextProvider>
//       </body>
//     </html>
//   )
// }
