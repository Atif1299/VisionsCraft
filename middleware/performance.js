const performance = require('perf_hooks').performance;

// Performance monitoring middleware
function performanceMonitor(req, res, next) {
    const start = performance.now();
    
    // Monitor response time
    res.on('finish', () => {
        const duration = performance.now() - start;
        const durationMs = Math.round(duration);
        
        // Log slow requests (over 1 second)
        if (duration > 1000) {
            console.warn(`⚠️  Slow request: ${req.method} ${req.url} - ${durationMs}ms`);
        } else {
            console.log(`✅ ${req.method} ${req.url} - ${durationMs}ms`);
        }
    });
    
    next();
}

// Database query performance monitoring
function dbPerformanceMonitor() {
    return function(req, res, next) {
        const originalSend = res.send;
        
        res.send = function(data) {
            // If response contains database data, log it
            if (data && typeof data === 'string' && data.includes('"__v"')) {
                console.log(`📊 Database query detected in ${req.url}`);
            }
            
            originalSend.call(this, data);
        };
        
        next();
    };
}

// Memory usage monitoring
function memoryMonitor() {
    const used = process.memoryUsage();
    console.log(`💾 Memory usage: ${Math.round(used.heapUsed / 1024 / 1024)}MB`);
    
    // Log memory usage every 5 minutes
    setInterval(() => {
        const used = process.memoryUsage();
        console.log(`💾 Memory usage: ${Math.round(used.heapUsed / 1024 / 1024)}MB`);
    }, 5 * 60 * 1000);
}

module.exports = {
    performanceMonitor,
    dbPerformanceMonitor,
    memoryMonitor
}; 