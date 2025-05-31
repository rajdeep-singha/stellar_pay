// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import type { Session } from '@supabase/auth-helpers-nextjs'

// export default function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const router = useRouter()
//   const supabase = createClientComponentClient()
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const getSession = async () => {
//       const { data } = await supabase.auth.getSession()
//       const session: Session | null = data.session

//       if (!session) {
//         router.push('/signin')
//          return <p>Redirecting to sign in...</p> // Redirect to /signin if not logged in
//       } else {
//         setLoading(false)
//       }
//     }

//     getSession()
//   }, [router, supabase])

//   if (loading) return <div className="p-10 text-center">Loading...</div>

//   return <>{children}</>
// }
