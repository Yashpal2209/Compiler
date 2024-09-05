let code=document.getElementById("textarea");
let lang=document.getElementById("select");
let btn=document.getElementById("compile");
let output=document.getElementById("output");
// let codeId;
btn.addEventListener("click",()=>{
    output.textContent="";
    let req = new XMLHttpRequest();
    req.open("POST", "https://course.codequotient.com/api/executeCode");
    
    // Set the request header to indicate JSON content
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(lang.value);    
    req.send(JSON.stringify({ "code": code.value, langId: lang.value }));
    
    // Set up a function to handle the response
    req.onload = () => {
        if (req.status >= 200 && req.status < 300) {
            let response = JSON.parse(req.responseText);
            let codeId = response.codeId;
            if (codeId) {
                // After getting the codeId, use it to fetch the result
                setTimeout(()=>{
                    fetchResult(codeId);
                },10000);
            } else {
                output.textContent = `Error: codeId not received`;
            }
        } else {
            output.textContent=`Error: ${req.statusText}`;
        }
    };

    req.onerror = () => {
        output.textContent='Request failed';
    };

    // Send the JSON data
    

    // Clear the textarea and select element
    
});

function fetchResult(codeId){
    console.log(codeId)
    let request=new XMLHttpRequest();
    request.open("GET",`https://course.codequotient.com/api/codeResult/${codeId}`);

    request.onload=()=>{
        if(request.status>=200 && request.status<300){
            let data = JSON.parse(request.responseText);
            let response = JSON.parse(data.data);
            if(response.errors){
                output.textContent=`Error:${response.errors}`;
            }else{
                output.textContent=response.output;
            }
            
        }else{
            output.textContent=`Error${request.statusText}`;
        }
    }

    request.onerror=()=>{
        output.textContent='Request failed';
    }
    request.send();
}