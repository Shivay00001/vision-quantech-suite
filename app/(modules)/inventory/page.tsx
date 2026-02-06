import { createClient } from '@/lib/supabaseServer'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { Package, AlertTriangle, ShoppingCart } from 'lucide-react'
import { AddProductButton } from './add-product-button'

export default async function InventoryPage() {
    const supabase = await createClient()
    const { data: products } = await supabase.from('inventory_products').select('*')

    const totalProducts = products?.length || 0
    const lowStock = products?.filter(p => p.stock_quantity <= p.low_stock_threshold).length || 0
    const totalValue = products?.reduce((acc, p) => acc + (p.price * p.stock_quantity), 0) || 0

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
                    <p className="text-muted-foreground">Manage stock and products.</p>
                </div>
                <AddProductButton />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <KpiCard
                    title="Total Products"
                    value={totalProducts.toString()}
                    icon={Package}
                />
                <KpiCard
                    title="Low Stock Alerts"
                    value={lowStock.toString()}
                    trend={lowStock > 0 ? 'down' : 'neutral'}
                    icon={AlertTriangle}
                />
                <KpiCard
                    title="Inventory Value"
                    value={`$${totalValue.toLocaleString()}`}
                    icon={ShoppingCart}
                />
            </div>

            <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">Product Name</th>
                            <th className="px-6 py-3">SKU</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Stock</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{product.name}</td>
                                <td className="px-6 py-4">{product.sku}</td>
                                <td className="px-6 py-4">${product.price}</td>
                                <td className="px-6 py-4">{product.stock_quantity}</td>
                                <td className="px-6 py-4">
                                    {product.stock_quantity <= product.low_stock_threshold ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            Low Stock
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            In Stock
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
