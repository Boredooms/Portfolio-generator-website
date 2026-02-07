const fs = require('fs');
const http = require('http');

const data = JSON.stringify({
    theme: { accentColor: "#ffffff", font: "Inter", gradient: true },
    personal: { name: "Test User", bio: "Bio", roles: [], social: {} },
    projects: [],
    sections: []
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/download',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);

    if (res.statusCode !== 200) {
        res.setEncoding('utf8');
        res.on('data', (chunk) => console.log(`BODY: ${chunk}`));
        return;
    }

    const file = fs.createWriteStream('test-download.zip');
    res.pipe(file);

    file.on('finish', () => {
        file.close();
        console.log('Download completed: test-download.zip');
        const stats = fs.statSync('test-download.zip');
        console.log(`File size: ${stats.size} bytes`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
