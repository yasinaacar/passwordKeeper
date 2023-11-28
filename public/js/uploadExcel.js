const excelJs=require("exceljs");

async function uploadExcel(pageName,excelFileName){
    const workbook=new excelJs.Workbook();
    await workbook.xlsx.readFile(`./public/files/${excelFileName}`);

    const worksheet=workbook.getWorksheet(pageName);
    let isFirstRow=true;
    const rowDataArray=[];
    worksheet.eachRow({includeEmpty: false}, (row)=>{
        if(isFirstRow){
            isFirstRow=false;
            return;
        }
        const rowValues=row.values.slice(1);
        rowDataArray.push(rowValues)
    })
    return rowDataArray;
}

module.exports=uploadExcel;