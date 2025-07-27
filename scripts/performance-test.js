const http = require('http');
const https = require('https');
const { performance } = require('perf_hooks');

class PerformanceTester {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
        this.results = [];
    }

    async testEndpoint(path, method = 'GET') {
        return new Promise((resolve, reject) => {
            const start = performance.now();
            const url = `${this.baseUrl}${path}`;
            
            const options = {
                method: method,
                headers: {
                    'User-Agent': 'Performance-Tester/1.0'
                }
            };

            const req = http.request(url, options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    const end = performance.now();
                    const duration = end - start;
                    
                    const result = {
                        path: path,
                        method: method,
                        statusCode: res.statusCode,
                        responseTime: Math.round(duration),
                        contentLength: data.length,
                        headers: res.headers
                    };
                    
                    this.results.push(result);
                    resolve(result);
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.end();
        });
    }

    async runTests() {
        console.log('🚀 Starting Performance Tests...\n');
        
        const testPaths = [
            '/',
            '/showcase',
            '/services',
            '/about',
            '/blog',
            '/contact',
            '/css/style.min.css',
            '/js/main.min.js',
            '/images/advance_svgs/hero-ai.svg'
        ];

        for (const path of testPaths) {
            try {
                const result = await this.testEndpoint(path);
                console.log(`✅ ${path} - ${result.responseTime}ms (${result.statusCode})`);
            } catch (error) {
                console.log(`❌ ${path} - Error: ${error.message}`);
            }
        }

        this.printSummary();
    }

    printSummary() {
        console.log('\n📊 Performance Summary:');
        console.log('========================');
        
        const successfulTests = this.results.filter(r => r.statusCode === 200);
        
        if (successfulTests.length === 0) {
            console.log('❌ No successful tests to analyze');
            return;
        }

        const avgResponseTime = Math.round(
            successfulTests.reduce((sum, r) => sum + r.responseTime, 0) / successfulTests.length
        );
        
        const minResponseTime = Math.min(...successfulTests.map(r => r.responseTime));
        const maxResponseTime = Math.max(...successfulTests.map(r => r.responseTime));
        
        const totalSize = successfulTests.reduce((sum, r) => sum + r.contentLength, 0);
        
        console.log(`📈 Average Response Time: ${avgResponseTime}ms`);
        console.log(`⚡ Fastest Response: ${minResponseTime}ms`);
        console.log(`🐌 Slowest Response: ${maxResponseTime}ms`);
        console.log(`📦 Total Content Size: ${(totalSize / 1024).toFixed(2)}KB`);
        console.log(`✅ Successful Tests: ${successfulTests.length}/${this.results.length}`);
        
        // Performance recommendations
        console.log('\n💡 Performance Recommendations:');
        console.log('==============================');
        
        if (avgResponseTime > 1000) {
            console.log('⚠️  Average response time is high (>1s). Consider:');
            console.log('   - Database query optimization');
            console.log('   - Caching frequently accessed data');
            console.log('   - CDN implementation');
        }
        
        if (maxResponseTime > 3000) {
            console.log('⚠️  Some responses are very slow (>3s). Check:');
            console.log('   - Database indexes');
            console.log('   - Server resources');
            console.log('   - Network latency');
        }
        
        if (totalSize > 500 * 1024) { // 500KB
            console.log('⚠️  Total content size is large (>500KB). Consider:');
            console.log('   - Image optimization');
            console.log('   - CSS/JS minification');
            console.log('   - Gzip compression');
        }
        
        // Check for caching headers
        const hasCaching = successfulTests.some(r => 
            r.headers['cache-control'] || r.headers['etag']
        );
        
        if (!hasCaching) {
            console.log('⚠️  No caching headers detected. Consider:');
            console.log('   - Adding Cache-Control headers');
            console.log('   - Implementing ETags');
            console.log('   - Browser caching strategy');
        }
        
        console.log('\n🎯 Performance Score:');
        console.log('====================');
        
        let score = 100;
        if (avgResponseTime > 1000) score -= 20;
        if (maxResponseTime > 3000) score -= 15;
        if (totalSize > 500 * 1024) score -= 10;
        if (!hasCaching) score -= 15;
        
        if (score >= 90) {
            console.log('🏆 Excellent Performance!');
        } else if (score >= 70) {
            console.log('✅ Good Performance');
        } else if (score >= 50) {
            console.log('⚠️  Needs Improvement');
        } else {
            console.log('❌ Poor Performance - Immediate attention required');
        }
        
        console.log(`📊 Score: ${score}/100`);
    }
}

// Run tests if this script is executed directly
if (require.main === module) {
    const tester = new PerformanceTester();
    tester.runTests().catch(console.error);
}

module.exports = PerformanceTester; 