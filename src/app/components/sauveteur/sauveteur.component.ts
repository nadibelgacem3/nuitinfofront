import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SauveesService} from "../../services/base/sauvees.service";
import {TranslationMyWayService} from "../../services/translation-my-way.service";
import {JhiDataUtils, JhiEventManager, JhiEventWithContent, JhiFileLoadError} from "ng-jhipster";
import {digitalCategoryDB} from "../../shared/tables/digital-category";
import {HttpResponse} from "@angular/common/http";
import {IItemCategory} from "../../shared/models/base/item-category.model";
import Swal from "sweetalert2";
import {RescuerService} from "../../services/base/rescuer.service";

@Component({
  selector: 'app-sauveteur',
  templateUrl: './sauveteur.component.html',
  styleUrls: ['./sauveteur.component.scss']
})
export class SauveteurComponent implements OnInit {

  public closeResult: string;
  public digital_categories = [];
  public Categories_DATA = [];
  category: any;
  editForm = this.fb.group({
    firstName: ['', [Validators.minLength(3), Validators.pattern]],
    lastName: ['', [Validators.minLength(3), Validators.pattern]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    description: [null, [Validators.required, Validators.minLength(3)]],
    address: [],
    image: [],
    imageContentType: [],
  });



  constructor(private modalService: NgbModal, private fb: FormBuilder, protected sauveteurService: RescuerService, private pipeTranslate: TranslationMyWayService, protected dataUtils: JhiDataUtils, protected elementRef: ElementRef, protected eventManager: JhiEventManager) {
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
    this.sauveteurService.query().subscribe(
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
    formData.append('sauveteur', JSON.stringify(itemCategory));
    this.sauveteurService.create(formData).subscribe(res => {
        this.sauveteurService.query().subscribe(
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
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      email: this.editForm.get(['email'])!.value,
      description: this.editForm.get(['description'])!.value,
      address: this.editForm.get(['address'])!.value,
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
        this.sauveteurService.delete(id).subscribe(() => {

            this.sauveteurService
              .query()
              .subscribe((res: HttpResponse<any[]>) => this.onSuccess(res.body));

          }
        );
        Swal.fire(this.pipeTranslate.translate('deleted'), this.pipeTranslate.translate('alert_delete'), 'success');
      }
    });
  }



}
