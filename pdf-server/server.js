import express from "express";
import * as puppeteer from "puppeteer";

const app=express();
const PORT=9090;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.options("/convert", (req, res) => {
    res.sendStatus(204);
});


app.post('/convert',async(req,res)=>{
    const {url}=req.body;
    if(!url||!url.startsWith("http")){
        return res.status(400).json({error:"Invalid  URL"});
    }
    
    let browser;
    try {
        browser= await puppeteer.launch({
            headless:"new",
            args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-blink-features=AutomationControlled"
    ]
        });
        const page = await browser.newPage();
        await page.setViewport({
        width: 1280,
        height: 800,
        deviceScaleFactor: 1
    });

        await page.goto(url,{
            waitUntil:["networkidle2", "domcontentloaded"],
            timeout:30000
        });
        const pdf = await page.pdf({
            format:"A4",
            printBackground:true,
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        res.setHeader("Content-Type","application/pdf");
        res.setHeader("Content-Disposition","attachment; filename=page.pdf");
        res.setHeader("Content-Length", pdf.length); 
        res.end(pdf, 'binary');
    } catch(err){
        console.log(err);
        res.status(500).json({"error":"Pdf generation failed"});
    } finally {
        if(browser) await browser.close();
    }
});

app.listen(PORT,()=>{
    console.log(`Pdf server listening on http://localhost:${PORT}`)
})