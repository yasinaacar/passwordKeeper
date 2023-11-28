async function generateToCode(forGenerateText,newElementId){
    //Take the generate text and element id. After this generate number between 1 and 100. After all connect them
    const generatedCode=`${forGenerateText}`+`${newElementId}`+ 0 + Math.floor(Math.random()*101);
    return generatedCode
}

module.exports=generateToCode;
