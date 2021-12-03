import {Component, OnInit, TemplateRef} from '@angular/core';
import {digitalCategoryDB} from 'src/app/shared/tables/digital-category';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ItemCategoryService} from "../../../../services/base/item-category.service";
import {HttpResponse} from "@angular/common/http";
import {IItemCategory} from "../../../../shared/models/base/item-category.model";
import {FormBuilder, Validators} from "@angular/forms";
import {ItemSubCategoryService} from "../../../../services/base/item-sub-category.service";
import Swal from "sweetalert2";
import {TranslationMyWayService} from "../../../../services/translation-my-way.service";

@Component({
  selector: 'app-digital-category',
  templateUrl: './digital-category.component.html',
  styleUrls: ['./digital-category.component.scss']
})
export class DigitalCategoryComponent implements OnInit {
  public closeResult: string;
  public digital_categories = [];
  public Categories_DATA = [];
  category: any;
  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(3)]],
  });

  editFormSub = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(3)]],
  });
  constructor(private modalService: NgbModal, private fb: FormBuilder, protected itemCategoryService: ItemCategoryService,      private pipeTranslate: TranslationMyWayService,  protected itemSubCategoryService: ItemSubCategoryService) {
    this.digital_categories = digitalCategoryDB.digital_category;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      img: {
        title: 'Image',
        type: 'html',
      },
      product_name: {
        title: 'Name'
      },
      price: {
        title: 'Price'
      },
      status: {
        title: 'Status',
        type: 'html',
      },
      category: {
        title: 'Category',
      }
    },
  };

  ngOnInit() {
    this.itemCategoryService.query().subscribe(
      (res: HttpResponse<IItemCategory[]>) => this.onSuccess(res.body),
    );
  }


  private onSuccess(body: any[]) {
    const dataCat = [];
    for (let i = 0; i < body.length; i++) {
      const line = {
        id: body[i].id,
        name: body[i].name,
        image: body[i].image,
        isOpen: true,
        articleSubCategories: body[i].articleSubCategories
      };
      dataCat.push(line);
    }
    this.Categories_DATA = dataCat;

  }

  onView(row: any, j) {

    for (let i = 0; i < this.Categories_DATA.length; i++) {
      if (this.Categories_DATA[i].id === row.id) {
        if (row.isOpen) {
          this.Categories_DATA[i].isOpen = false;
        } else {
          this.Categories_DATA[i].isOpen = true;
        }

      }
    }
  }

  saveCategory() {
    const itemCategory = this.createFromForm();
    this.itemCategoryService.create(itemCategory).subscribe(res => {
        this.itemCategoryService.query().subscribe(
          (res2: HttpResponse<IItemCategory[]>) => {
            this.onSuccess(res2.body);
            // this.model.isOpen = true;
            // this.onView_2(this.model);
          },
        );
      },
      () => this.onSaveError());
  }

  protected onSaveError(): void {

  }

  private createFromForm(): any {
    return {
      // id: undefined,
      name: this.editForm.get(['name'])!.value,
    };
  }

  onDelete(cat: any) {
    const id = cat.id;

    Swal.fire({
      title: this.pipeTranslate.translate('title_delete'),
      text: this.pipeTranslate.translate('category_delete'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: this.pipeTranslate.translate('confirmButtonText'),
      cancelButtonText: this.pipeTranslate.translate('noButtonText'),
    }).then(result => {
      if (result.value) {
        this.itemCategoryService.delete(id).subscribe(() => {

            this.itemCategoryService
              .query()
              .subscribe((res: HttpResponse<any[]>) => this.onSuccess(res.body));

          }
        );
        Swal.fire(this.pipeTranslate.translate('deleted'), this.pipeTranslate.translate('alert_delete'), 'success');
      }
    });
  }

  onDeleteSubCat(cat: any, subCat: any) {
    const id = subCat.id;

    Swal.fire({
      title: this.pipeTranslate.translate('title_delete'),
      text: this.pipeTranslate.translate('subcategory_delete'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: this.pipeTranslate.translate('confirmButtonText'),
      cancelButtonText: this.pipeTranslate.translate('noButtonText'),
    }).then(result => {
      if (result.value) {
        this.itemSubCategoryService.delete(id).subscribe(() => {
            this.itemCategoryService.query().subscribe(
              (res: HttpResponse<IItemCategory[]>) => {
                this.onSuccess(res.body);
                // this.model.isOpen = true;
              },
            );

          }
        );
        Swal.fire(this.pipeTranslate.translate('deleted'), this.pipeTranslate.translate('alert_delete'), 'success');
      }
    });
  }

  onAddSubCat(addSubCat: TemplateRef<any>, cat: any) {
    this.category = cat;
    this.modalService.open(addSubCat, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveSubCategory() {
    const itemCategory = this.createFromubCategory();
    this.itemSubCategoryService.create(itemCategory).subscribe(res => {
        this.itemCategoryService.query().subscribe(
          (res2: HttpResponse<IItemCategory[]>) => {
            this.onSuccess(res2.body);
            this.category = null;
            // this.model.isOpen = true;
            // this.onView_2(this.model);
          },
        );
      },
      () => this.onSaveError());
  }

  private createFromubCategory(): any {
    return {
      id: undefined,
      name: this.editFormSub.get(['name'])!.value,
      publicationCategory: this.category,
    };
  }
}
