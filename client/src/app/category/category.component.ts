import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../shared/dialog-box/dialog-box.component';
import { MatPaginator } from '@angular/material/paginator';

export interface UsersData {
  name: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1, name: 'Artificial Intelligence'},
  {id: 2, name: 'Machine Learning'},
  {id: 3, name: 'Robotic Process Automation'},
  {id: 4, name: 'Blockchain'},
  {id: 5, name: 'Blockchain 2'},
  {id: 6, name: 'Blockchain 3'}
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<UsersData>(ELEMENT_DATA);
  //dataSource = ELEMENT_DATA;

  @ViewChild('paginator') paginator:MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action: any,obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      } /* else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      } */
    });
  }

  addRowData(row_obj: { name: any; }){
    var d = new Date();
    this.dataSource.filteredData.push({
      id:d.getTime(),
      name:row_obj.name
    });
    console.log(this.dataSource);
    this.table.renderRows();
    
  }
  updateRowData(row_obj: { id: number; name: string; }){
    this.dataSource.filteredData = this.dataSource.filteredData.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj: { id: number; }){
    this.dataSource.filteredData = this.dataSource.filteredData.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

}
