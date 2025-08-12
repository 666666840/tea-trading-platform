/**
 * 茶叶平台管理后台 - 现代化JavaScript功能
 */

// 全局配置
const CONFIG = {
    API_BASE_URL: window.location.origin,
    REFRESH_INTERVAL: 30000, // 30秒自动刷新
    NOTIFICATION_DURATION: 5000, // 通知显示时间
    ANIMATION_DURATION: 300 // 动画持续时间
};

// 工具函数
const Utils = {
    // 显示通知
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => notification.classList.add('show'), 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, CONFIG.NOTIFICATION_DURATION);
    },
    
    // 格式化日期
    formatDate(date) {
        return new Date(date).toLocaleString('zh-CN');
    },
    
    // 格式化数字
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// AJAX请求封装
const API = {
    async request(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(url, finalOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
        } catch (error) {
            console.error('API请求失败:', error);
            Utils.showNotification('请求失败，请稍后重试', 'error');
            throw error;
        }
    },
    
    // GET请求
    async get(url) {
        return this.request(url);
    },
    
    // POST请求
    async post(url, data) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    
    // PUT请求
    async put(url, data) {
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    
    // DELETE请求
    async delete(url) {
        return this.request(url, {
            method: 'DELETE'
        });
    }
};

// 仪表板功能
class Dashboard {
    constructor() {
        this.refreshInterval = null;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startAutoRefresh();
        this.loadInitialData();
    }
    
    bindEvents() {
        // 刷新按钮
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshData());
        }
        
        // 搜索框
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 500));
        }
        
        // 批量操作
        const selectAllCheckbox = document.getElementById('select-all');
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', (e) => {
                this.toggleSelectAll(e.target.checked);
            });
        }
        
        // 导出按钮
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }
        
        // 删除按钮
        const deleteBtn = document.getElementById('delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.deleteSelected());
        }
    }
    
    async loadInitialData() {
        try {
            await this.updateStats();
            await this.updateLogs();
            await this.updateCharts();
        } catch (error) {
            console.error('加载初始数据失败:', error);
        }
    }
    
    async refreshData() {
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.innerHTML = '<span class="loading"></span> 刷新中...';
            refreshBtn.disabled = true;
        }
        
        try {
            await this.loadInitialData();
            Utils.showNotification('数据已更新', 'success');
        } catch (error) {
            Utils.showNotification('刷新失败', 'error');
        } finally {
            if (refreshBtn) {
                refreshBtn.innerHTML = '🔄 刷新';
                refreshBtn.disabled = false;
            }
        }
    }
    
    async updateStats() {
        try {
            const stats = await API.get('/api/logs/stats');
            this.renderStats(stats);
        } catch (error) {
            console.error('更新统计信息失败:', error);
        }
    }
    
    async updateLogs() {
        try {
            const logs = await API.get('/api/logs/realtime');
            this.renderLogs(logs);
        } catch (error) {
            console.error('更新日志失败:', error);
        }
    }
    
    async updateCharts() {
        try {
            const chartData = await API.get('/api/logs/charts');
            this.renderCharts(chartData);
        } catch (error) {
            console.error('更新图表失败:', error);
        }
    }
    
    renderStats(stats) {
        const statsContainer = document.getElementById('stats-container');
        if (!statsContainer) return;
        
        const statsHTML = `
            <div class="row">
                <div class="col-md-3">
                    <div class="stats-card">
                        <div class="stats-number">${Utils.formatNumber(stats.total_logs || 0)}</div>
                        <div class="stats-label">总日志数</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stats-card">
                        <div class="stats-number">${Utils.formatNumber(stats.today_logs || 0)}</div>
                        <div class="stats-label">今日日志</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stats-card">
                        <div class="stats-number">${Utils.formatNumber(stats.error_logs || 0)}</div>
                        <div class="stats-label">错误日志</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stats-card">
                        <div class="stats-number">${Utils.formatNumber(stats.active_users || 0)}</div>
                        <div class="stats-label">活跃用户</div>
                    </div>
                </div>
            </div>
        `;
        
        statsContainer.innerHTML = statsHTML;
    }
    
    renderLogs(logs) {
        const logsContainer = document.getElementById('logs-container');
        if (!logsContainer) return;
        
        const logsHTML = logs.map(log => `
            <tr>
                <td>${log.username || '未知用户'}</td>
                <td>${log.action}</td>
                <td>${log.description}</td>
                <td>${log.ip_address}</td>
                <td>${Utils.formatDate(log.created_at)}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="dashboard.viewLogDetail(${log.id})">
                        查看详情
                    </button>
                </td>
            </tr>
        `).join('');
        
        logsContainer.innerHTML = logsHTML;
    }
    
    renderCharts(chartData) {
        // 这里可以集成Chart.js或其他图表库
        console.log('图表数据:', chartData);
    }
    
    handleSearch(query) {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const match = text.includes(query.toLowerCase());
            row.style.display = match ? '' : 'none';
        });
    }
    
    toggleSelectAll(checked) {
        const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
        });
        this.updateBulkActions();
    }
    
    updateBulkActions() {
        const selectedCount = document.querySelectorAll('tbody input[type="checkbox"]:checked').length;
        const bulkActions = document.getElementById('bulk-actions');
        
        if (bulkActions) {
            bulkActions.style.display = selectedCount > 0 ? 'block' : 'none';
            bulkActions.innerHTML = `已选择 ${selectedCount} 项`;
        }
    }
    
    async exportData() {
        try {
            const response = await API.post('/api/logs/export/advanced', {
                format: 'excel',
                filters: this.getCurrentFilters()
            });
            
            // 创建下载链接
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `日志导出_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            Utils.showNotification('导出成功', 'success');
        } catch (error) {
            Utils.showNotification('导出失败', 'error');
        }
    }
    
    async deleteSelected() {
        const selectedIds = Array.from(document.querySelectorAll('tbody input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);
        
        if (selectedIds.length === 0) {
            Utils.showNotification('请选择要删除的项目', 'warning');
            return;
        }
        
        if (!confirm(`确定要删除选中的 ${selectedIds.length} 项吗？`)) {
            return;
        }
        
        try {
            await API.post('/api/logs/cleanup', {
                log_ids: selectedIds
            });
            
            Utils.showNotification('删除成功', 'success');
            this.refreshData();
        } catch (error) {
            Utils.showNotification('删除失败', 'error');
        }
    }
    
    async viewLogDetail(logId) {
        try {
            const logDetail = await API.get(`/api/logs/${logId}`);
            this.showLogDetailModal(logDetail);
        } catch (error) {
            Utils.showNotification('获取详情失败', 'error');
        }
    }
    
    showLogDetailModal(logDetail) {
        const modalHTML = `
            <div class="modal fade" id="logDetailModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">日志详情</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>用户:</strong> ${logDetail.username}</p>
                                    <p><strong>操作:</strong> ${logDetail.action}</p>
                                    <p><strong>IP地址:</strong> ${logDetail.ip_address}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>时间:</strong> ${Utils.formatDate(logDetail.created_at)}</p>
                                    <p><strong>用户代理:</strong> ${logDetail.user_agent}</p>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12">
                                    <p><strong>描述:</strong></p>
                                    <p>${logDetail.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 移除现有模态框
        const existingModal = document.getElementById('logDetailModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // 添加新模态框
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // 显示模态框
        const modal = new bootstrap.Modal(document.getElementById('logDetailModal'));
        modal.show();
    }
    
    getCurrentFilters() {
        // 获取当前搜索和筛选条件
        const searchInput = document.getElementById('search-input');
        return {
            search: searchInput ? searchInput.value : '',
            // 可以添加更多筛选条件
        };
    }
    
    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            this.updateStats();
            this.updateLogs();
        }, CONFIG.REFRESH_INTERVAL);
    }
    
    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
    
    // 页面卸载时清理
    window.addEventListener('beforeunload', () => {
        if (window.dashboard) {
            window.dashboard.stopAutoRefresh();
        }
    });
});

// 全局错误处理
window.addEventListener('error', (event) => {
    console.error('JavaScript错误:', event.error);
    Utils.showNotification('页面出现错误，请刷新重试', 'error');
});

// 网络状态监听
window.addEventListener('online', () => {
    Utils.showNotification('网络连接已恢复', 'success');
});

window.addEventListener('offline', () => {
    Utils.showNotification('网络连接已断开', 'warning');
}); 