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
    data = { Area: this.areaService.selectedArea, ...data }
    return from(addDoc(this.colRef, data).then(e => e))
  }
  update(id: string, material: Material) {
    return from(updateDoc(doc(this.colRef, id), {
      name: material.name,
      status: material.status,
    }))
  }

  getAll() {
    console.log("getting inventory for", this.areaService.selectedArea);

    let materials = getDocs(query(this.colRef, where('Area', '==', this.areaService.selectedArea)))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() }
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
