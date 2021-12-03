import {Component, ElementRef, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ItemCategoryService} from "../../services/base/item-category.service";
import {TranslationMyWayService} from "../../services/translation-my-way.service";
import {ItemSubCategoryService} from "../../services/base/item-sub-category.service";
import {digitalCategoryDB} from "../../shared/tables/digital-category";
import {HttpResponse} from "@angular/common/http";
import {IItemCategory} from "../../shared/models/base/item-category.model";
import Swal from "sweetalert2";
import {BoatsService} from "../../services/base/boats.service";
import {JhiDataUtils, JhiEventManager, JhiEventWithContent, JhiFileLoadError} from "ng-jhipster";

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss']
})
export class BoatComponent implements OnInit {

  public closeResult: string;
  public digital_categories = [];
  public Categories_DATA = [];
  category: any;
  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(3)]],
    description: [null, [Validators.required, Validators.minLength(3)]],
    image: [],
    imageContentType: [],
  });

  editFormSub = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(private modalService: NgbModal, private fb: FormBuilder, protected boatsService: BoatsService, private pipeTranslate: TranslationMyWayService, protected dataUtils: JhiDataUtils, protected elementRef: ElementRef, protected eventManager: JhiEventManager) {
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
    this.boatsService.query().subscribe(
      (res: HttpResponse<IItemCategory[]>) => this.onSuccess(res.body),
    );
  }


  private onSuccess(body: any[]) {

    this.Categories_DATA = body;

  }

  image: File;
  isEdit = false;

  setFileData(event, field: string, isImage: boolean): void {
    this.image = event.target.files[0];
    this.isEdit = true;
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<any>('gatewayApp.error', {...err, key: 'error.file.' + err.key}),
      );
    });
  }

  saveCategory() {
    const itemCategory = this.createFromForm();
    const formData = new FormData();
    if (this.image) {
      formData.append('files', this.image);
    }
    formData.append('bateau', JSON.stringify(itemCategory));
    this.boatsService.create(formData).subscribe(res => {
        this.boatsService.query().subscribe(
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
      description: this.editForm.get(['description'])!.value,
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
        this.boatsService.delete(id).subscribe(() => {

            this.boatsService
              .query()
              .subscribe((res: HttpResponse<any[]>) => this.onSuccess(res.body));

          }
        );
        Swal.fire(this.pipeTranslate.translate('deleted'), this.pipeTranslate.translate('alert_delete'), 'success');
      }
    });
  }


}
