var now = new Date();
fis.config.set('timestamp', [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours()].join(''));

fis.config.set('roadmap.path', [
    {
        reg: /.*\.(js|css)$/,
        query: '?t=${timestamp}'
    },
    {
        reg: '**.html',
        useCache: false
    }
]);