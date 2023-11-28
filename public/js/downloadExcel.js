const excelJs=require("exceljs");

//function of header styles
function headerProperties(sheet){
    const headerRow=sheet.getRow(1);

    const headerStyles={
        font:{bold: true, color:{ argb: '0070C0' }},
        alignment:{vertical:"middle", horizontal: "center" }//position in column
    }

    headerRow.font=headerStyles.font;
    headerRow.alignment=headerStyles.alignment;
}

async function exportExcel(downloadType,sheetName,data){
    
    const workbook= new excelJs.Workbook(); //create a new file
    const sheet= workbook.addWorksheet(`${sheetName}`); //create a sheets for file
    
    if(data.length>0){
        const columns= Object.keys(data[0].dataValues);
        console.log(columns)
        sheet.columns=columns.map(column =>({
            header: column,
            key: column,
        }))

        headerProperties(sheet);

        if(downloadType!="forAddData"){
            data.forEach(element => {
                sheet.addRow(element.dataValues);
            });
        }
    }
    
    const downloadPath="./public/files"; //path to download excel
    try {
            await workbook.xlsx.writeFile(`${downloadPath}/${sheetName} - ${downloadType}.xlsx`);
            console.log("Excel file is downloaded");
        } catch (err) {
            console.error("Error while writing Excel file", err)
        }
}

module.exports=exportExcel;

