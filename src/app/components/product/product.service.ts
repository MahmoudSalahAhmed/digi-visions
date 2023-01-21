import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import { ProductCreateViewModel } from './view-models/product-create.model';
import { ProductSearchViewModel } from './view-models/product-search.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  controller: string = "products";
  constructor(private _apiService: ApiService) { }
  get() {
    return this._apiService.get(`${this.controller}?limit=200`);
  }
  postOrUpdate(body: ProductCreateViewModel) {
    if (body.id == 0) 
      return this._apiService.post(`${this.controller}`, body);
    else
      return this._apiService.update(`${this.controller}/${body.id}`, body);
  }
  getbyID(id) {
    return this._apiService.get(`${this.controller}/${id}`);

  }
  remove(id: number) {
    return this._apiService.remove(`${this.controller}/${id}`)
  }
 
}
