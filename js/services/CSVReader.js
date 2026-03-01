import {EXCEL} from "../utils/consts.js"
import {Atraccio} from "../models/Atraccio.js";
import {Museu} from "../models/Museu.js";
import {Espai} from "../models/Espai.js";
import { typeSet } from "../utils/consts.js";

export class CSVReader {

    readCSV(content) {
        // split by rows
        const interestList = [];
        const lines = content.split('\n');
    
        lines.shift();
        // reset list
        let id = 0;
    
        typeSet.add("Tots");

        for (let line of lines) {
            try {
                if (line) {
                    // extract data
                    const data = line.split(";");
                    const type = data[EXCEL.tipus].trim();
                    console.log(data[EXCEL.tipus]);
                    
                    if (type) {
                        typeSet.add(type);  
                    }


                    // id autoincrement?  
                    console.log(data[EXCEL.tipus]);
                    console.log(data[EXCEL.nom]);
                     
                    // create new point
                    let newPoint;
    
                    // call instantiantion depending on type
                    switch(type.toLowerCase()) {
                        case "atraccio":
                            newPoint = new Atraccio(id,
                                data[EXCEL.pais], data[EXCEL.codi], data[EXCEL.ciutat], data[EXCEL.nom],
                                data[EXCEL.direccio], data[EXCEL.tipus], data[EXCEL.latitud], data[EXCEL.longitud],
                                data[EXCEL.puntuacio], data[EXCEL.horaris], data[EXCEL.preu], data[EXCEL.edatMinima],
                                data[EXCEL.moneda]
                            );
    
                            break;
                        case "espai":
                            newPoint = new Espai(id,
                                    data[EXCEL.pais], data[EXCEL.codi], data[EXCEL.ciutat], data[EXCEL.nom],
                                    data[EXCEL.direccio], data[EXCEL.tipus], data[EXCEL.latitud], data[EXCEL.longitud], data[EXCEL.puntuacio]);
                            break;
                        case "museu":
                            newPoint = new Museu(id,
                                    data[EXCEL.pais], data[EXCEL.codi], data[EXCEL.ciutat], data[EXCEL.nom],
                                    data[EXCEL.direccio],  data[EXCEL.tipus],  data[EXCEL.latitud], data[EXCEL.longitud],
                                    data[EXCEL.puntuacio], data[EXCEL.horaris], data[EXCEL.preu], data[EXCEL.moneda],
                                    data[EXCEL.descripcio]);
                            break;
                    }
    
                    if (newPoint) {
                        interestList.push(newPoint);
                    } else {
                        console.warn(`Skipping line ${id}: unknown type '${type}' or failed to create point`, data);
                    }
    
                    // add point to set? or do it on another place?
                    id++;
                } 
            } catch(error) {
                console.log(`ERROR: ${error}`);
            } 
        }
        console.log("hello");
        console.log(interestList);
        return interestList;
    
    }  
    
    async processCSV(e) {
        return new Promise((resolve,reject) => {
            const files = e.dataTransfer.files;
        
            // if csv (mime type is .csv)
            console.log(files);
            console.log(files[0].type);
            if (!files[0].type.includes("csv") && 
                !files[0].type.includes("vnd.ms-excel") &&
                !files[0].type.includes("EXCEL")) alert("File is not .csv");
        
            // read file
            const reader = new FileReader();
        
            // onloading file
            reader.onload = (e) => {
                // obtain target result
                console.log("arrived to onload")
                const content = e.target.result;
        
                // call readCSV to obtain objects
                resolve(this.readCSV(content));
                //load data     
            }
        
            reader.onerror = (error) => {
                reject(`Error processing file: ${error}`);
            }
        
            reader.readAsText(files[0], "UTF-8");
        });
    }
}

