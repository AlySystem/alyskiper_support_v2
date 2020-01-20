import XLSX from 'xlsx'

class ExcelLoader {
    constructor(file){
        this._file = file
    }

    async loadExcel(){
        this._excelFile = await this.readFile(this._file)
        this.Workbook = XLSX.read(this._excelFile, { type: "binary" })
    }

    readFile = (file) => {
        return new Promise((resolve, reject) => {
            var reader = new FileReader()
            reader.onload = function (e) {
                resolve(e.target.result)
            }

            if (reader.error) {
                reject(reader.error)
                console.log("Error al leer el archivo")
            }

            reader.readAsBinaryString(file)
        })
    }

    getWorkbook(){
        return this.Workbook
    }

    getSheet(name){
        return this.Workbook.Sheets[name]
    }

    getDefaultSheet(){
        return this.getSheet("tarifas")
    }

    getSheetAsJson(sheet){
        return XLSX.utils.sheet_to_json(sheet)
    }

}

export default ExcelLoader
