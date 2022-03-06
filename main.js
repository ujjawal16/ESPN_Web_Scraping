const request = require("request");
const cheerio=require('cheerio');
const fs=require('fs');
const path=require('path');

let allMatch=require('./allMatch');

let iplPath=path.join(__dirname,"IPL");

const url='https://www.espncricinfo.com/series/ipl-2020-21-1210595';

function dirCreator(path)
{
    if(fs.existsSync(path)==false)
    {
        fs.mkdirSync(path);
    }
}

dirCreator(iplPath);

request(url,cb);

function cb(error,response,html)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        extractLink(html);
    }
}

function extractLink(html)
{
    let $=cheerio.load(html);
    let anchorEl=$('a[data-hover="View All Results"]'); //Attribute-->a[attr]
    let href=$(anchorEl).attr('href');
    console.log(href)
    let fullLink='https://www.espncricinfo.com'+href
    console.log(fullLink);

    allMatch.allMatch(fullLink);
}

