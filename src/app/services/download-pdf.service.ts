import {Injectable} from '@angular/core';

import * as moment from 'moment';





const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// @ts-ignore
import html2canvas from 'html2canvas';


import * as jsPDF from 'jspdf';

import * as fs from 'file-saver';
// import logo from '../../assets/images/logo';
import * as Excel from "exceljs";
@Injectable({
  providedIn: 'root',
})
export class DownloadPDFService {
  margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550,
  };

  constructor() {
  }

  public captureScreen(print: string, type: string): void {
    const div = document.getElementById(print);
    const HTML_Width = div.clientWidth;
    const HTML_Height = div.clientHeight;
    const top_left_margin = 30;
    const PDF_Width = HTML_Width + (top_left_margin * 2);
    const PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    const canvas_image_width = HTML_Width;
    const canvas_image_height = HTML_Height;
    const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    const day = moment().format('DD-MM-YYYY');
    // html2canvas(div).then(function(canvas) {
    //   canvas.getContext('2d');
    //   const imgData = canvas.toDataURL('image/jpeg', 1.0);
    //   const pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
    //   pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
    //
    //   for (let i = 1; i <= totalPDFPages; i++) {
    //     pdf.addPage([PDF_Width, PDF_Height]);
    //     pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4),
    //       canvas_image_width, canvas_image_height);
    //   }
    //   pdf.save(type + '-' + day + '.pdf'); // Generated PDF
    // });

  }

  public captureScreen_2(print: string): void {
    const div = document.getElementById(print);
    const HTML_Width = div.clientWidth;
    const HTML_Height = div.clientHeight;
    const top_left_margin = 30;
    const PDF_Width = HTML_Width + (top_left_margin * 2);
    const PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    const canvas_image_width = HTML_Width;
    const canvas_image_height = HTML_Height;
    const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    // html2canvas(div).then(function(canvas) {
    //   canvas.getContext('2d');
    //   const imgData = canvas.toDataURL('image/jpeg', 1.0);
    //   const pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
    //   pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
    //
    //   for (let i = 1; i <= totalPDFPages; i++) {
    //     pdf.addPage([PDF_Width, PDF_Height]);
    //     pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4),
    //         canvas_image_width, canvas_image_height);
    //   }
    //   pdf.save('example.pdf'); // Generated PDF
    // });

  }


  public exportSCV(filename: string, rows: any[], headers?: string[]) {

    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';

    const keys: string[] = Object.keys(rows[0]);

    let columHearders: string[];

    if (headers) {
      columHearders = headers;
    } else {
      columHearders = keys;
    }

    const csvContent =
      'sep=,\n' +
      columHearders.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];

          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');

          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) { // In case of IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  exportExcel(excelData) {


    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;


    const workbook =   new Excel.Workbook();
    const worksheet = workbook.addWorksheet(title);



    worksheet.mergeCells('C1', 'F4');
    const titleRow = worksheet.getCell('C1');
    titleRow.value = title;
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: {argb: '0085A3'}
    };
    titleRow.alignment = {vertical: 'middle', horizontal: 'center'};

    // Date
    worksheet.mergeCells('G1:H4');
    const day = moment().format('DD-MM-YYYY');
    const dateCell = worksheet.getCell('G1');
    dateCell.value = day;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    };
    dateCell.alignment = {vertical: 'middle', horizontal: 'center'};


    // let myLogoImage = workbook.addImage({
    //   base64: logo.imgBase64,
    //   extension: 'png',
    // });
    // worksheet.mergeCells('A1:B4');
    // worksheet.addImage(myLogoImage, 'A1:B4');


    worksheet.addRow([]);


    const headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '4167B8'},
        bgColor: {argb: ''}
      };
      cell.font = {
        bold: true,
        color: {argb: 'FFFFFF'},
        size: 12
      };
    });

    // Adding Data with Conditional Formatting
    // tslint:disable-next-line:no-shadowed-variable
    data.forEach( d => {
      worksheet.addRow(d);
    });
    worksheet.getColumn(3).width = 20;
    worksheet.addRow([]);


    //   const footerRow = worksheet.addRow(['Employee Sales Report Generated from example.com at ' + date]);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: {argb: 'FFB050'}
    // };
    //
    //
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);


      // tslint:disable-next-line:no-shadowed-variable
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, title + '.xlsx');
    });



  }

}
