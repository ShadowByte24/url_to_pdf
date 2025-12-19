const urlInput= document.getElementById("urlInput");
const convertBtn= document.getElementById("convert");

document.querySelectorAll("input[name=mode]").forEach(radio=>{
    radio.addEventListener("change",()=>{
        urlInput.disabled = radio.value !== "custom" || !radio.checked;
    });
});

convertBtn.onclick=async ()=>{
    const mode = document.querySelector("input[name=mode]:checked").value;

    if(mode==="current"){
        chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
        
            const currentUrl = tab.url;
            if(!currentUrl){
                alert("Failed to detect current url!");
                return;
            }
            try{
                const response= await fetch("http://localhost:9090/convert", {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({url:currentUrl})
                });

                if(!response.ok){
                    throw new Error("Server error!!");
                }

                const blob=await response.blob();
                const contentType=response.headers.get("content-type");

                if(!contentType || !contentType.includes("application/pdf")){
                    const text= await response.text();
                    console.error("Server did not return pdf:" , text);
                    alert("Server error: not a pdf");
                    return;
                    }
                    const downloadUrl = URL.createObjectURL(blob);
                chrome.downloads.download({
                    url: downloadUrl,
                    filename: "page.pdf"
                });
                
            }catch (err) {
                alert("Failed to generate PDF from current tab");
            }
        });
        return;
    }

    const url=urlInput.value.trim();
    if(!url){
        alert("Enter a url");
        return;
    }

    try{
        const response = await fetch("http://localhost:9090/convert",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({url})
        });

        if(!response.ok){
            throw new Error("Server error!!");
        }

        const blob=await response.blob();
        const downloadUrl = URL.createObjectURL(blob);

        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/pdf")) {
            const text = await response.text();
            console.error("Server did not return PDF:", text);
            alert("Server error: not a PDF");
            return;
        }


        chrome.downloads.download({
            url:downloadUrl,
            filename:"page.pdf"
        });
    } catch(err){
        alert("Failed to generate pdf")
    }

};