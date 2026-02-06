import { createClient } from '@/lib/supabaseServer'
import { CreateUserButton } from './create-user-button'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
    const supabase = await createClient()

    // 1. Check Permissions
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/auth/login')

    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'superadmin' && profile?.role !== 'admin') {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
                <p className="text-muted-foreground">You do not have permission to view this page.</p>
            </div>
        )
    }

    // 2. Fetch Users
    const { data: users } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Admin Panel</h2>
                    <p className="text-muted-foreground">Manage users and system settings.</p>
                </div>
                <CreateUserButton />
            </div>

            <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((u) => (
                            <tr key={u.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{u.full_name || 'N/A'}</td>
                                <td className="px-6 py-4">{u.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                ${u.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                                            u.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                                                u.role === 'manager' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(u.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
