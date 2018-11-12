// 引入模块
const https = require('https');
const percollate = require('percollate');
console.log('percollate',percollate);
const hostname = '172.21.101.17';
const port = 7777;
const cheerio = require('cheerio');
// 爬取目标网站URL
let url = 'https://wangdoc.com/javascript/basic/introduction.html';
// 使用get方法访问
https.get(url, res => {
  let html = '';
  
  // 监听data事件获取html源码
  res.on('data', data => {
    html += data;
  });
 // 监听end事件，同时把获取到的数据传给filterData方法进行过滤
  res.on('end', () => {
    let titles = filterData(html);
    titles=titles.map(function(item){
        return 'https://wangdoc.com/javascript/'+item.slice(item.indexOf('/')+1);
    })
    titles=titles.slice(0,1);
    percollate.configure(); //important,without this,html tag will not work 
    var result= percollate.pdf(titles,{
        sandbox:false,
        output:'my.pdf',
        scale:1,
        printBackground:true,
        preferCSSPageSize:true,
        format:'A4'
    });
  });
}).on('error', e => {
  console.log(e.message);
});
// 使用cheerio模块对内容进行筛选过滤
function filterData(html) {
  let $ = cheerio.load(html); //cheerio和jquery比较类似 可以通过它和选择器的组合，获取页面元素
  console.log('$',$);
  let oTitles = $('.menu-list>li li a');
  let titleURLs = [];
  oTitles.each( (index, item) => {
    let url = $(item).attr('href');
    console.log('url',url);
    titleURLs.push(url);
  });
  console.log('titleURLs',titleURLs);
  return titleURLs;
}

const server = https.createServer((req, res) => {
    // res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World!\n');
  });
  
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });