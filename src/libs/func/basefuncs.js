function _sum(serial, n, p) {
    var s = 0;
    for (var i = p - n + 1; i <= p; i++) {
        s += serial[i];
    }
    return s;
}

function SUM(i, serial, n, cache) {
    if (cache === undefined || cache.length == 0 || isNaN(cache[i - 1]))
        return _sum(serial, n, i);
    return cache[i - 1] - serial[i - n] + serial[i];
}

function COUNT(i, serial, n, cache) {
    if (cache === undefined || cache.length == 0 || isNaN(cache[i - 1]))
        return _sum(serial, n, i);
    return cache[i - 1] - serial[i - n] + serial[i];
}

function REF(i, serial, n) {
    return serial[i-n];
}

function MA(i, serial, n, cache) {
    if (cache.length == 0 || !cache[i - 1])
        return _sum(serial, n, i) / n;
    return cache[i - 1] - serial[i - n] / n + serial[i] / n;
}

function EMA(i, serial, n, cache) {
    if (cache.length == 0)
        return serial[i];
    return isNaN(cache[i - 1]) ? serial[i] : (2 * serial[i] / (n + 1) + (n - 1) * cache[i - 1] / (n + 1));
}

function DMA(i, serial, a, cache) {
    if (cache.length == 0)
        return serial[i];
    return isNaN(cache[i - 1]) ? serial[i] : (cache[i - 1] * (1-a) + serial[i] * a);
}

function SMA(i, serial, n, m, cache) {
    if (cache.length == 0)
        return serial[i];
    return isNaN(cache[i - 1]) ? serial[i] : (cache[i - 1] * (n - m) / n + serial[i] * m / n);
}

function HIGHEST(p, serial, n) {
    var s;
    for (var i = p - n + 1; i <= p; i++) {
        var v = serial[i];
        if (s === undefined || v > s)
            s = v;
    }
    return s;
}

function LOWEST(p, serial, n) {
    var s;
    for (var i = p - n + 1; i <= p; i++) {
        var v = serial[i];
        if (s === undefined || v < s)
            s = v;
    }
    return s;
}

function STDEV(i, serial, n, cache) {
    cache._s = cache._s ? cache._s : [];
    let x2 = 0;
    let x = 0;
    if (cache._s[i-1]){
        x = cache._s[i - 1][0] - serial[i - n] + serial[i];
        x2 = cache._s[i - 1][1] - serial[i - n] * serial[i - n] + serial[i] * serial[i];

    }else{
        for (let k = i - n + 1; k <= i; k++) {
            let d = serial[k];
            x2 += d * d;
            x += d;
        }
    }

    let s2 = x2 - x * x / n;
    // 小数精度问题 引起算出来的方差是一个很小的负数
    if(s2 < 0 && s2 > -0.000001) s2 = Math.abs(s2);

    let n_ = n == 1 ? 1 : n - 1; // 标准差最后除以 n-1
    let std = Math.sqrt(s2 / n_);
    if (!isNaN(std)) {
        cache._s[i] = [x, x2];
    }
    return std;
}

function IFELSE(c, a, b) {
    return c?a:b;
}

function ABS(v){
    return Math.abs(v);
}

function MAX(v1, v2) {
    return Math.max(v1, v2);
}

function MIN(v1, v2) {
    return Math.min(v1, v2);
}

function TIME(dt_nano){
    let d = new Date(dt_nano / 1000000);
    let s = d.getHours() * 10000 + d.getMinutes() * 100 + d.getSeconds();
    return s;
}

function DATE(dt_nano){
    let d = new Date(dt_nano / 1000000);
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDay();
}

function NEAREST(i, serial){
    for (let j = i; j >= i - 100; j--) {
        if (serial[j])
            return j;
    }
    return NaN;
}

function EVERY(i, serial, n){
    for (let j = i; j >= i - n; j--) {
        if (!serial[j])
            return false;
    }
    return true;
}
