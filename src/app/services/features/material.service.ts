import { AreaService } from './area.service';
import { Injectable } from '@angular/core';
import {
  addDoc, collection, CollectionReference,
  deleteDoc, doc, DocumentData, Firestore,
  getDoc, getDocs, query, QueryDocumentSnapshot,
  updateDoc, where, Timestamp
} from '@angular/fire/firestore';
import { of, Observable, switchMap, zip, from } from 'rxjs';

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
  getAllActive() {
    console.log("getting active materials for", this.areaService.selectedArea);

    let materials = getDocs(query(this.colRef, where('Area', '==', this.areaService.selectedArea),where('status', '==', 'Disponible')))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Material
      }))

    return from(materials)
  }

  getTop(range: string) {
    let attRef = collection(this.firestore, 'attendance')
    return this.getAll().pipe(
      switchMap(
        e => zip(...e.map(e => getDocs(
          query(attRef, where('area.id', '==', this.areaService.selectedArea), where('materialIdList', 'array-contains', e.id))
        ).then( r => ({program: e, size: r.size}))
        )
        )

      ),
      // switchMap(e => e.map(r => ({ total: r.size, })))
    )
  }

  getTopFromDate(date1 : Date, date2:Date) {
    let attRef = collection(this.firestore, 'attendance')
    console.log('fromdate', date1);
    console.log('todate', date2);
    console.log('area', this.areaService.selectedArea);
    
    return this.getAll().pipe(
      switchMap(
        e => zip(...e.map(e => getDocs(
          query(attRef, where('area.id', '==', this.areaService.selectedArea), where('materialIdList', 'array-contains', e.id),where('startDateTime', '>', Timestamp.fromDate(date1)),where('startDateTime', '<', Timestamp.fromDate(date2)))
        ).then( r => ({program: e, size: r.size}))
        )
        )

      ),
      // switchMap(e => e.map(r => ({ total: r.size, })))
    )
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
