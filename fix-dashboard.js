const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Admin Dashboard Loading Issues...\n');

const dashboardPath = path.join(__dirname, 'client', 'dashboard.html');

// Read the current dashboard file
let dashboardContent = fs.readFileSync(dashboardPath, 'utf8');

// Fix 1: Add better error handling for dashboard stats
const oldStatsFunction = `function updateDashboardStats(data) {
            document.getElementById('totalUsers').textContent = data.stats.totalUsers;
            document.getElementById('totalProducts').textContent = data.stats.totalProducts;
            document.getElementById('totalOrders').textContent = data.stats.totalOrders;
            document.getElementById('totalRevenue').textContent = formatPrice(data.stats.totalRevenue);
            
            // Update recent orders
            const recentOrdersTable = document.getElementById('recentOrdersTable');
            if (data.recentOrders.length === 0) {
                recentOrdersTable.innerHTML = '<tr><td colspan="5" style="text-align: center;">No recent orders</td></tr>';
            } else {
                recentOrdersTable.innerHTML = data.recentOrders.map(order => \`
                    <tr>
                        <td style="font-family: monospace; font-size: 0.8rem;">\${order._id.substring(0, 8)}...</td>
                        <td>\${order.userId.name}</td>
                        <td>\${formatPrice(order.totalAmount)}</td>
                        <td><span class="status-badge status-\${order.status.toLowerCase()}">\${order.status}</span></td>
                        <td>\${new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    </tr>
                \`).join('');
            }
        }`;

const newStatsFunction = `function updateDashboardStats(data) {
            // Safely update stats with fallbacks
            document.getElementById('totalUsers').textContent = data?.stats?.totalUsers || 0;
            document.getElementById('totalProducts').textContent = data?.stats?.totalProducts || 0;
            document.getElementById('totalOrders').textContent = data?.stats?.totalOrders || 0;
            document.getElementById('totalRevenue').textContent = formatPrice(data?.stats?.totalRevenue || 0);
            
            // Update recent orders
            const recentOrdersTable = document.getElementById('recentOrdersTable');
            const recentOrders = data?.recentOrders || [];
            
            if (recentOrders.length === 0) {
                recentOrdersTable.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #666;">No recent orders found. <br><small>Orders will appear here once customers start placing orders.</small></td></tr>';
            } else {
                recentOrdersTable.innerHTML = recentOrders.map(order => \`
                    <tr>
                        <td style="font-family: monospace; font-size: 0.8rem;">\${order._id.substring(0, 8)}...</td>
                        <td>\${order.userId?.name || 'Unknown User'}</td>
                        <td>\${formatPrice(order.totalAmount)}</td>
                        <td><span class="status-badge status-\${order.status.toLowerCase()}">\${order.status}</span></td>
                        <td>\${new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    </tr>
                \`).join('');
            }
        }`;

// Apply the fix
if (dashboardContent.includes('data.stats.totalUsers')) {
    dashboardContent = dashboardContent.replace(
        /function updateDashboardStats\(data\) \{[\s\S]*?\n        \}/,
        newStatsFunction
    );
    
    // Write the fixed content back
    fs.writeFileSync(dashboardPath, dashboardContent);
    console.log('✅ Fixed dashboard stats function with better error handling');
} else {
    console.log('⚠️  Dashboard stats function already appears to be fixed or not found');
}

// Fix 2: Add a fallback for when dashboard data fails to load
const fallbackScript = `
        // Fallback function for when dashboard data fails to load
        function showDashboardFallback() {
            document.getElementById('totalUsers').textContent = '0';
            document.getElementById('totalProducts').textContent = '0';
            document.getElementById('totalOrders').textContent = '0';
            document.getElementById('totalRevenue').textContent = '₹0';
            
            const recentOrdersTable = document.getElementById('recentOrdersTable');
            recentOrdersTable.innerHTML = \`
                <tr>
                    <td colspan="5" style="text-align: center; padding: 2rem; color: #666;">
                        <div style="margin-bottom: 1rem;">📋</div>
                        <div><strong>No data available</strong></div>
                        <div style="font-size: 0.9rem; margin-top: 0.5rem;">
                            This could be because:
                            <ul style="text-align: left; display: inline-block; margin-top: 0.5rem;">
                                <li>Database is not connected</li>
                                <li>No sample data has been added</li>
                                <li>Server is not running properly</li>
                            </ul>
                        </div>
                        <div style="margin-top: 1rem;">
                            <button onclick="location.reload()" class="btn btn-primary">Retry</button>
                            <button onclick="window.open('/README.md', '_blank')" class="btn btn-secondary" style="margin-left: 0.5rem;">View Setup Guide</button>
                        </div>
                    </td>
                </tr>
            \`;
        }`;

// Add the fallback script before the closing script tag
if (!dashboardContent.includes('showDashboardFallback')) {
    dashboardContent = dashboardContent.replace(
        '</script>\n</body>',
        fallbackScript + '\n    </script>\n</body>'
    );
    
    fs.writeFileSync(dashboardPath, dashboardContent);
    console.log('✅ Added dashboard fallback function');
}

// Fix 3: Update the error handling in loadDashboardData to use the fallback
const oldLoadFunction = `try {
                    const dashboardData = await api.getDashboardStats();
                    updateDashboardStats(dashboardData);
                } catch (error) {
                    console.error('Error loading dashboard stats:', error);
                    showAlert('Error loading dashboard stats: ' + error.message, 'error');
                }`;

const newLoadFunction = `try {
                    const dashboardData = await api.getDashboardStats();
                    updateDashboardStats(dashboardData);
                } catch (error) {
                    console.error('Error loading dashboard stats:', error);
                    showAlert('Error loading dashboard stats: ' + error.message, 'error');
                    showDashboardFallback();
                }`;

if (dashboardContent.includes('Error loading dashboard stats')) {
    dashboardContent = dashboardContent.replace(
        /try \{\s*const dashboardData = await api\.getDashboardStats\(\);\s*updateDashboardStats\(dashboardData\);\s*\} catch \(error\) \{\s*console\.error\('Error loading dashboard stats:', error\);\s*showAlert\('Error loading dashboard stats: ' \+ error\.message, 'error'\);\s*\}/,
        newLoadFunction
    );
    
    fs.writeFileSync(dashboardPath, dashboardContent);
    console.log('✅ Updated error handling to use fallback');
}

console.log('\n🎉 Dashboard fixes applied successfully!');
console.log('\nNext steps:');
console.log('1. Make sure MongoDB is running');
console.log('2. Run: npm run seed (to add sample data)');
console.log('3. Run: npm start (to start the server)');
console.log('4. Visit: http://localhost:3000/dashboard.html');
console.log('\nDemo admin account: admin@techstore.com / admin123');