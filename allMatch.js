const request = require("request");
const cheerio=require('cheerio');

const scorecardObj = require('./scoreCard')

function getAllMatches(link)
{
    request(link,function(err,resp,html)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            extractAllMatchesLink(html);
        }
    })
}

function extractAllMatchesLink(html)
{
    let $=cheerio.load(html);
    let scoreCard=$('a[data-hover="Scorecard"]');
    //console.log(scoreCard);
    for(let i=0;i<scoreCard.length;i++)
    {
        let link=$(scoreCard[i]).attr('href');
        let fullLink='https://www.espncricinfo.com/'+link;
        scorecardObj.ps(fullLink);
    }
}

module.exports={
    allMatch:getAllMatches
}