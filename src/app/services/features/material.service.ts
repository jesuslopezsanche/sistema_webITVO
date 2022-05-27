import { AreaService } from './area.service';
import { Injectable } from '@angular/core';
import {
  addDoc, collection, CollectionReference,
  deleteDoc, doc, DocumentData, Firestore,
  getDoc, getDocs, query, QueryDocumentSnapshot,
  updateDoc, where
} from '@angular/fire/firestore';
import { from, of, Observable } from 'rxjs';

export interface Material {
  id?: string,
  Area?: string,
  serialNumber: string,
  name: string,
  quantity: number,
  brand: string,
  status: 'Excelente' | 'Bueno' | 'Regular' | 'Malo'
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  colRef: CollectionReference
  materials: Observable<QueryDocumentSnapshot<DocumentData> | null>

  constructor(private firestore: Firestore, private areaService: AreaService) {
    this.colRef = collection(firestore, 'materials')
    this.materials = of(null)
  }

create(data: Material) {
    let material = getDocs(query(this.colRef, where('Area', '==', this.areaService.selectedArea)))
    let area = this.areaService.getById(this.areaService.selectedArea)
    // if (material.size > area.capacity!) {
      // return
    // }
    let materialData = { Area: this.areaService.selectedArea, ...data }
    return from(addDoc(this.colRef, materialData).then(e => e))
  }
  update(id: string, material: Material) {
    // let updatedData =
    return from(updateDoc(doc(this.colRef, id), {
      name: material.name,
      brand: material.brand,
      quantity: material.quantity,
      serialNumber: material.serialNumber,
      status: material.status,
    }))
  }

  getAll() {
    console.log("getting inventory for", this.areaService.selectedArea);

    let materials = getDocs(query(this.colRef, where('Area', '==', this.areaService.selectedArea)))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Material
      }))

    return from(materials)
  }

  getById(id: string) {
    return getDoc(doc(this.colRef, id)).then(e => {
      return { id: e.id, ...e.data() } as unknown as Material
    }
    )
  }

  deleteById(id: string) {
    return from(deleteDoc(doc(this.colRef, id)))
  }
}
