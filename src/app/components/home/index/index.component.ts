import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/service/shared.service';
import { CrudIndexBaseUtils } from 'src/app/components/shared/utils/crud-index.utils';
import { ProductService } from '../../product/product.service';
import { ProductViewModel } from '../../product/view-models/product.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent extends CrudIndexBaseUtils implements OnInit {
  items: ProductViewModel[] = [];
  selectedItem: ProductViewModel = new ProductViewModel();
  modalRef: BsModalRef;
  categoryList: string[] = []
  selectedCategory: string = "shared.all-categories"
  @ViewChild('deleteTemplate', { static: false }) deleteTemplate: any;

  constructor(
    private _pageService: ProductService,
    public _sharedService: SharedService,
  ) {
    super(_sharedService);
  }
  ngOnDestroy(): void {
    
  }
  ngOnInit() {
    this.initializePage();
  }
  initializePage() {
    this.search()
    
  }
  createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      // NameArabic: [this.searchViewModel.NameArabic],
      // NameEnglish: [this.searchViewModel.NameEnglish],
      // FromDate: [this.searchViewModel.FromDate],
      // ToDate: [this.searchViewModel.ToDate],
    });
  }
  search() {
    this.page.isSearching = true;
    this.items = [];
    this._pageService.get().subscribe(response => {
      this.page.isSearching = false;
      this.items = response as ProductViewModel[];
      this.categoryList = ["shared.all-categories",...new Set(this.items.map(i=>i.category))]
      this.page.isPageLoaded = true;
    });
  }
  getItems():ProductViewModel[]{
    return this.items.filter(i=> this.selectedCategory == "shared.all-categories" ? true :  i.category == this.selectedCategory)
  }
  showDetails(selectedItem: ProductViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.deleteTemplate, { class: 'modal-440', });
  }
}
